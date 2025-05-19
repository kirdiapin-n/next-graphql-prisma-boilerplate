import Form from "@/components/posts/Form";
import { withPageAuthRequired } from "@/lib/withPageAuthRequired";
import { withUser } from "@/lib/withUser";

export default function Add() {
  return <Form />;
}

export const getServerSideProps = withPageAuthRequired(withUser());
