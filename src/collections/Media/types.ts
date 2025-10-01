export interface MediaDoc {
  id: string;
  alt: string | null;
  prefix: string | null;
  updatedAt: string;
  createdAt: string;
  url: string | null;
  thumbnailURL: string | null;
  filename: string | null;
  mimeType: string | null;
  filesize: number | null;
  width: number | null;
  height: number | null;
  focalX: number | null;
  focalY: number | null;
  sizes: {
    thumbnail: {
      url: string | null;
      width: number | null;
      height: number | null;
      mimeType: string | null;
      filesize: number | null;
      filename: string | null;
    };
    small: {
      url: string | null;
      width: number | null;
      height: number | null;
      mimeType: string | null;
      filesize: number | null;
      filename: string | null;
    };
    large: {
      url: string | null;
      width: number | null;
      height: number | null;
      mimeType: string | null;
      filesize: number | null;
      filename: string | null;
    };
  };
}
