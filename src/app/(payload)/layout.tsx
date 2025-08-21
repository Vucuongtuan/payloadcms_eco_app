/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import "@payloadcms/next/css";
import "./custom.scss";
import "./payloadStyles.scss"; // Import Payload styles

// ---- End Css Import ---- //
// import "@/app/globals.css";
import React from "react";

/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";

// feature experimental
import { unstable_ViewTransition as ViewTransition } from "react";
//---
import { importMap } from "./admin/importMap.js";

import type { ServerFunctionClient } from "payload";
type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = ({ children }: Args) => (
  <RootLayout
    config={config}
    importMap={importMap}
    serverFunction={serverFunction}
  >
    <ViewTransition>{children}</ViewTransition>
  </RootLayout>
);

export default Layout;
