import { IGetUserQuery } from "@/graphql/types";
import { withUser } from "@/lib/withUser";
import { GetServerSideProps } from "next";
import React from "react";

export default function Profile({ user }: IGetUserQuery) {
  return (
    <>
      {user && (
        <div style={{ textAlign: "center" }}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </>
  );
}

export const getServerSideProps = withUser();
