import { GET_USER } from "@/graphql/queries/users";
import { IGetUserQuery, IGetUserQueryVariables } from "@/graphql/types";
import { auth0 } from "@/lib/auth0";
import { getClient } from "@/lib/ssrApolloClient";
import { GetServerSidePropsContext } from "next";

export type WithUser<T = void> = T & IGetUserQuery;

export function withUser<P extends Record<string, any> = {}>(
  fn?: (context: GetServerSidePropsContext) => Promise<{ props: P }>
) {
  return async (context: GetServerSidePropsContext) => {
    const result = fn ? await fn(context) : { props: {} as P };

    try {
      const session = await auth0.getSession(context.req);

      if (!session) {
        console.error("No session found.");

        return { props: { ...result.props, user: null } };
      }

      if (!session.user.email) {
        console.error("User not found.");

        return { props: { ...result.props, user: null } };
      }

      const client = getClient();
      const { data } = await client.query<IGetUserQuery, IGetUserQueryVariables>({
        query: GET_USER,
        variables: { email: session.user.email },
      });

      return {
        props: {
          ...result.props,
          user: data.user,
        },
      };
    } catch (e) {
      console.error("SESSION ERROR:", e);

      return {
        props: {
          ...result.props,
          user: null,
        },
      };
    }
  };
}
