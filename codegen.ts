import { graphqlApiUrl } from "./constants/api";
import { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
  schema: `${process.env.NEXT_PUBLIC_SITE_URL}/${graphqlApiUrl}`,
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
