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

    console.log("Headers:", context.req.headers);
    console.log("Cookies:", context.req.headers.cookie);

    try {
      const session = await auth0.getSession(context.req);

      if (!session) {
        console.error("No session found.");

        return { props: { ...result.props, user: null } };
      }

      const client = getClient();
      const { data } = await client.query<IGetUserQuery, IGetUserQueryVariables>({
        query: GET_USER,
        variables: { auth0Id: session?.user.sub },
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
