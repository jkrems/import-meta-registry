import { expect, it } from "#test";

import { describeMetaField } from "../runtimes.js";

describeMetaField("main", ({ fixtures: { reflect, indirect } }) => {
  it("is true for entry point", () => {
    expect(reflect.meta.main).toBe(true);
  });

  it("is false for non-entry point", () => {
    expect(indirect.meta.main).toBe(false);
  });
});
