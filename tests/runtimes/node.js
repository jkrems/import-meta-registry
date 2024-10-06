import { runAndParse } from "./util/run-and-parse.js";

export async function init() {
  return null; // use default base URL (file-based)
}

export const loadFixture = runAndParse.bind(null, "node");
