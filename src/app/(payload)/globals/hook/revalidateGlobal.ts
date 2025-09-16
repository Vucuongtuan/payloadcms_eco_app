import { revalidateTag } from "next/cache";
import { getLogger } from "node_modules/payload/dist/utilities/logger";
import { GlobalAfterChangeHook } from "payload";

export const revalidateGlobal: GlobalAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
}) => {
  const locale = new URL((req as { url: string }).url).searchParams.get(
    "locale",
  );
  console.log("==============================================");
  getLogger("revalidateGlobal").info("Revalidating menu global...");
  console.log("==============================================");
  revalidateTag("announcement-" + locale);
};
