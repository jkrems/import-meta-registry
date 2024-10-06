# `import.meta` Tests

These tests provide structured documentation on the expected behavior of different
`import.meta` properties and their availability across different runtimes and tools.

The code is organized as follows:

1. `fixtures/`: Each file is a test scenario.
1. `runtimes/`: How to run the scenarios in different runtimes/environments.
1. `features/`: Code to test for different `import.meta` fields, given loaded fixtures.

To run the tests in bun:

```sh
bun test
```

To run them in node.js:

```sh
npm install
# Then:
node --test **/*.spec.js
# or:
npm test
```

To write a summary of the current status, run `npm run test:report` which will
update [report.md](./report.md).
