import { execFileSync } from "node:child_process";

export async function runAndParse(cliCommand, dirname, fixturePath) {
  const stdout = execFileSync(cliCommand, [fixturePath], {
    encoding: 'utf8',
    env: {
      PUBLIC_SOME_VAR: 'public-var-value',
      PATH: process.env.PATH,
    },
    cwd: dirname,
  });
  return {
    ...JSON.parse(stdout),
    filename: fixturePath,
  };
}
