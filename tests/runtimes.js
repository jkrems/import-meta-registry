import { describe } from "#test";
import { readdirSync } from "node:fs";

const runtimePaths = findFiles("runtimes");
const fixturePaths = findFiles("fixtures");

const runtimes = await Promise.all(
  runtimePaths.map(async (runtimePath) => {
    /** @type {import('./runtimes/bun.js')} */
    const runtime = await import(`./${runtimePath}`);
    const baseURL =
      (await runtime.init()) ?? import.meta.url.replace(/runtimes\.js$/, "");
    if (!baseURL.startsWith("file://")) {
      throw new Error(
        "Tests must run in an environment that uses file:// protocol."
      );
    }

    const fixtureEntries = await Promise.all(
      fixturePaths.map(async (fixturePath) => {
        const fixture = await runtime.loadFixture(
          import.meta.dirname,
          fixturePath
        );
        const key = getBasename(fixturePath).replace(/[^\w]+/g, "__");
        return [key, fixture];
      })
    );
    const fixtures = Object.fromEntries(fixtureEntries);

    return {
      name: getBasename(runtimePath),
      baseURL,
      fixtures,
    };
  })
);

function describeRuntimes(fn) {
  runtimes.forEach((runtime) => {
    describe(runtime.name, () => {
      fn(runtime);
    });
  });
}

export function describeMetaField(field, fn) {
  describeRuntimes((runtime) => {
    const defaultFixture = runtime.fixtures.reflect;

    describe.skipIf(!(field in defaultFixture.meta))(
      `import.meta.${field}`,
      () => {
        fn(runtime);
      }
    );
  });
}

function findFiles(type) {
  return readdirSync(`${import.meta.dirname}/${type}`)
    .filter((name) => name.endsWith(".js"))
    .map((name) => `${type}/${name}`);
}

function getBasename(filename) {
  return filename.match(/\/([^/]+)\.js$/)[1];
}
