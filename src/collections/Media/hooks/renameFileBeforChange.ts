import { log } from "console";
import { CollectionBeforeChangeHook } from "payload";

export const renameFileBeforeChange: CollectionBeforeChangeHook = ({
  data,
  originalDoc,
  operation,
}) => {
  console.log("================");
  console.log({ data, originalDoc, operation });
  if (operation !== "create" || !data) return data;
  const now = Date.now();
  const newFileName = `${now}-${data.width}x${data.height}-${data.filename}`;
  data.filename = newFileName;
  return data;
};
