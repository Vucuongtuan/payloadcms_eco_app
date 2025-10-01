/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useTransition } from "react";

import { useFormFields } from "@payloadcms/ui";

export function MediaPreview(props: any) {
  const [mediaPreview, setMediaPreview] = useState<{
    url: string;
    mimeType?: string;
  }>({ url: "" });
  const [isPending,startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null);

  const previewFieldName = props.field.name;
  const path = props.path as string;

  const referenceFieldName = previewFieldName.split("-")[1];
  const referencePath = path.replace(previewFieldName, referenceFieldName);

  const image = useFormFields(([field]) => {
    return field[referencePath];
  });
  const imageID = image?.value;

  const handleGetMediaByID = async () => {
    startTransition(async ()=>{
    setError(null);
    try {
      const res = await fetch(`/api/media/${imageID}`);
      if (res.ok) {
        const result = await res.json();
        setMediaPreview({
          url: result.url,
          mimeType: result.mimeType
        });
      } else {
        setError("Failed to fetch media");
      }
    } catch (e) {
      setError("An error occurred while fetching media");
    } 
  })
  };

  useEffect(() => {
    if (!imageID) {
      setMediaPreview({ url: "" });
      return;
    }
    handleGetMediaByID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageID]);

  const isVideo = mediaPreview.mimeType?.startsWith("video/");

  if (isPending) {
    return <p className="w-full h-[500px] animate-pulse"></p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div style={{ marginTop: "9px" }}>
        {!!mediaPreview.url &&
          (isVideo ? (
            <video
              controls
              style={{
                objectFit: "contain",
                border: "1px solid #ccc",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px"
              }}
            >
              <source src={mediaPreview.url} type={mediaPreview.mimeType} />
              Your browser does not support the video tag.
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mediaPreview.url}
              alt="preview"
              style={{
                objectFit: "contain",
                border: "1px solid #ccc",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px"
              }}
            />
          ))}
      </div>
    </div>
  );
}
