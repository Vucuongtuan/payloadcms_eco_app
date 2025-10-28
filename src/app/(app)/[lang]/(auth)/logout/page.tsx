import type { Metadata } from "next";

import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";

import { LogoutPage } from "./LogoutPage";

export default async function Logout() {
  return (
    <section className="container max-w-lg flex justify-center items-center">
      <LogoutPage />
    </section>
  );
}

export const metadata: Metadata = {
  description: "You have been logged out.",
  openGraph: mergeOpenGraph({
    title: "Logout",
    url: "/logout",
  }),
  title: "Logout",
};
