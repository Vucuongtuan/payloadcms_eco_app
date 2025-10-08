import { Field } from "payload";

interface PreviewImageProps {
  readonly name: string;
  readonly isGallery?: boolean;
}

export const PreviewCustomField = ({
  name,
  isGallery,
}: PreviewImageProps): Field => {
  const previewImageFieldName = "preview-" + name;

  const previewImageField: Field = {
    name: previewImageFieldName,
    type: "ui",
    admin: {
      components: {
        Field: {
          path: "@/fields/upload/previewUploadUi#MediaPreview",
          clientProps: {
            isGallery,
          },
        },
      },
    },
  };
  return previewImageField;
};
