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
        withHooks: true,
      },
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
      hooks: {
        afterOneFileWrite: ["prettier --write"],
      },
    },
  },
};

export default config;
