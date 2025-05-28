import { graphqlApiUrl } from "./constants/api";
import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: graphqlApiUrl,
  documents: ["graphql/**/*.ts"],
  generates: {
    "graphql/types.ts": {
      config: {
        skipTypename: true,
        typesPrefix: "I",
        namingConvention: {
          enumValues: "keep",
        },
        declarationKind: "interface",
        withHooks: false,
      },
      plugins: ["typescript", "typescript-operations"],
      hooks: {
        afterOneFileWrite: ["prettier --write"],
      },
    },
  },
};

export default config;
