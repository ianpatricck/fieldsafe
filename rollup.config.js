import resolve from "@rollup/plugin-node-resolve";

export default [
  {
    input: "index.js",
    output: {
      file: "dist/fieldsafe.esm.js",
      format: "esm",
    },
    plugins: [resolve()],
  },
  {
    input: "index.js",
    output: {
      file: "dist/fieldsafe.umd.js",
      format: "umd",
      name: "FieldSafe",
    },
    plugins: [resolve()],
  },
];
