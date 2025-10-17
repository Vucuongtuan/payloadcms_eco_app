"use client";

import { useFormFields } from "@payloadcms/ui";
import { UIFieldClientProps } from "payload";
import { useEffect, useState, useTransition } from "react";

interface MediaPreviewData {
  url: string;
  mimeType?: string;
}

type MediaPreviewProps = {
  isGallery?: boolean;
} & UIFieldClientProps;

const LoadingSpinner = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      backdropFilter: "blur(4px)",
      borderRadius: "5px",
    }}
  >
    <div
      style={{
        width: "32px",
        height: "32px",
        border: "2px solid white",
        borderTop: "2px solid transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const MediaItem = ({
  media,
  isLoading,
}: {
  media: MediaPreviewData;
  isLoading: boolean;
}) => {
  const isVideo = media.mimeType?.startsWith("video/");
  const baseStyle = {
    objectFit: "contain" as const,
    border: "1px solid #ccc",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    width: "100%",
  };

  return (
    <div style={{ position: "relative" }}>
      {isVideo ? (
        <video controls style={baseStyle}>
          <source src={media.url} type={media.mimeType} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={media.url} alt="preview" style={baseStyle} />
      )}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export function MediaPreview({ isGallery, field, path }: MediaPreviewProps) {
  const [mediaPreview, setMediaPreview] = useState<MediaPreviewData[]>([]);
  const [previousMedia, setPreviousMedia] = useState<MediaPreviewData[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const referenceFieldName = field.name.split("-")[1];
  const referencePath = (path as string).replace(
    field.name,
    referenceFieldName
  );

  const image = useFormFields(([field]) => field[referencePath]);
  const imageID = image?.value as number[] | number | undefined;

  const fetchMedia = async () => {
    if (!imageID) {
      setMediaPreview([]);
      setPreviousMedia([]);
      return;
    }

    startTransition(async () => {
      setError(null);
      try {
        const ids = Array.isArray(imageID) ? imageID : [imageID];
        const results = await Promise.all(
          ids.map(async (id) => {
            const res = await fetch(`/api/media/${id}`);
            if (!res.ok) throw new Error("Failed to fetch media");
            const result = await res.json();
            return { url: result.url, mimeType: result.mimeType };
          })
        );

        setPreviousMedia(mediaPreview);
        setMediaPreview(results);
      } catch (e) {
        setError("Failed to load media");
      }
    });
  };

  useEffect(() => {
    fetchMedia();
  }, [imageID]);

  if (error) return <p style={{ color: "#ef4444" }}>{error}</p>;

  const displayMedia =
    isPending && previousMedia.length > 0 ? previousMedia : mediaPreview;

  if (!displayMedia.length) {
    return isPending ? (
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "#f3f4f6",
          borderRadius: "5px",
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      >
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    ) : null;
  }

  if (isGallery) {
    return (
      <div
        style={{
          display: "grid",
          gap: "12px",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          marginTop: "8px",
        }}
      >
        {displayMedia.map((media, idx) => (
          <MediaItem key={idx} media={media} isLoading={isPending} />
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginTop: "8px",
      }}
    >
      {displayMedia.map((media, idx) => (
        <MediaItem key={idx} media={media} isLoading={isPending} />
      ))}
    </div>
  );
}
