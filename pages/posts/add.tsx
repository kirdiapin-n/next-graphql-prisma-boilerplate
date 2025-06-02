import Form from "@/components/posts/Form";
import { withPageAuthRequired } from "@/lib/withPageAuthRequired";
import { withUser } from "@/lib/withUser";
import Head from "next/head";
import React from "react";

export default function Add() {
  return (
    <>
      <Head>
        <title>Add Post | MyApp</title>
        <meta name="description" content="Add post page" />
      </Head>
      <Form />
    </>
  );
}

export const getServerSideProps = withPageAuthRequired(withUser());
