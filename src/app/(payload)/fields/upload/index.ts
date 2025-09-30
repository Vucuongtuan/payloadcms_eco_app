import { Field, RowField } from "payload";

import { PreviewCustomField } from "./previewUploadFIeld";

interface ImageWithPreviewProps {
  name: string;
  label?: { en?: string; vi?: string } | string;
  admin?: Field["admin"];
  required?: boolean;
  hasMany?:boolean;
  localized?:boolean
}
type UploadCustomFieldProps = (props: ImageWithPreviewProps) => RowField;

export const uploadCustomField: UploadCustomFieldProps = ({
  name,
  label,
  admin,
  hasMany = false,
  localized = false,
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
        hasMany,
        localized,
        ...props,
      },
      PreviewCustomField({
        name
      }),
    ],
    admin: {
      position: "sidebar",
      ...admin,
    },
  } as RowField;
};
