import { GET_USER } from "@/graphql/queries/users";
import { IGetUserQuery, IGetUserQueryVariables } from "@/graphql/types";
import { auth0 } from "@/lib/auth0";
import { getClient } from "@/lib/ssrApolloClient";

export const getUserFromServer = async () => {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user?.email || !session.tokenSet.idToken) {
      return null;
    }

    const client = getClient({
      Authorization: `Bearer ${session.tokenSet.idToken}`,
    });

    const { data } = await client.query<IGetUserQuery, IGetUserQueryVariables>({
      query: GET_USER,
      variables: { email: session.user.email },
    });

    return data.user;
  } catch (error) {
    return null;
  }
};
