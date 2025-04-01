import * as dotenv from "dotenv";

dotenv.config();

export const graphqlApiUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/graphql`
  : "/api/graphql";
