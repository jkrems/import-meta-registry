import { expect, it } from "#test";

import { describeMetaField } from "../runtimes.js";

describeMetaField("url", ({ baseURL, fixtures: { reflect, url__char } }) => {
  it("correct URL for reflect.js", () => {
    expect(reflect.meta.url).toBe(new URL(reflect.filename, baseURL).href);
  });

  it("escapes URL characters", () => {
    expect(url__char.meta.url).toMatch(/\/url%20char\.js$/);
  });
});
