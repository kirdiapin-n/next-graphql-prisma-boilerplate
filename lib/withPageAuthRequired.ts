import { auth0 } from "@/lib/auth0";
import { GetServerSidePropsContext } from "next";

export function withPageAuthRequired<P extends Record<string, any> = {}>(
  fn?: (context: GetServerSidePropsContext) => Promise<{ props: P }>
) {
  return async (context: GetServerSidePropsContext) => {
    const result = fn ? await fn(context) : { props: {} as P };

    const session = await auth0.getSession(context.req);

    if (!session)
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };

    return {
      props: {
        ...result.props,
      },
    };
  };
}
