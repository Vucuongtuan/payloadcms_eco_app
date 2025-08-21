import { Field, Row, RowField } from "payload";

import { PreviewCustomField } from "./previewUploadFIeld";

interface ImageWithPreviewProps {
  name: string;
  label?: { en?: string; vi?: string } | string;
  admin?: Field["admin"];
  required?: boolean;
}
type UploadCustomFieldProps = (props: ImageWithPreviewProps) => RowField;

export const uploadCustomField: UploadCustomFieldProps = ({
  name,
  label,
  admin,
  ...props
}) => {
  return {
    type: "row",
    fields: [
      {
        name,
        type: "upload",
        relationTo: "media",
        label: label || "Upload",
        displayPreview: false,
        ...props,
      },
      PreviewCustomField({
        name,
      }),
    ],
    admin: {
      position: "sidebar",
      ...admin,
    },
  } as RowField;
};
