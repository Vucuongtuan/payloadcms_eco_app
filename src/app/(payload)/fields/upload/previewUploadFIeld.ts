import { Field } from "payload";

interface PreviewImageProps {
  readonly name: string;
}

export const PreviewCustomField = ({ name }: PreviewImageProps): Field => {
  const previewImageFieldName = "preview-" + name;

  const previewImageField: Field = {
    name: previewImageFieldName,
    type: "ui",
    admin: {
      components: {
        Field: "@/app/(payload)/fields/upload/previewUploadUi#MediaPreview",
      },
    },
  };
  return previewImageField;
};
