import { describe, it } from "node:test";
export { expect } from "expect";

describe.skipIf = (cond) => {
  return (desc, fn) => describe(desc, {skip: cond}, fn);
};

export { describe, it };
