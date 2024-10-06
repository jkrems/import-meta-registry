export function printImportMeta(metaObj) {
  // Not all runtimes set meta properties has plain own properties.
  const plainObject = {};
  for (const key in metaObj) {
    plainObject[key] = metaObj[key];
  }

  console.log(
    JSON.stringify({
      meta: plainObject,
      ownMeta: { ...metaObj },
    })
  );
}
