import type { MetaFunction } from "@remix-run/node";
import Layout from "~/components/Layout/Layout";

export const meta: MetaFunction = () => {
  return [
    { title: "Zapp App" },
    { name: "description", content: "Welcome to Zapp Admin" },
  ];
};

export default function Index() {
  return <Layout>Welcome to Zapp Admin</Layout>;
}
