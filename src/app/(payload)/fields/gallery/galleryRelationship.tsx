// @ts-nocheck
"use client";
import React from "react";
import { useField } from "@payloadcms/ui";
import { Media } from "@/payload-types";
import { Thumbnail } from "@payloadcms/ui";
import Image from "next/image";

export const GalleryRelationship = (props) => {
  const { path } = props;
  const { value } = useField({ path: "gallery" });
  const [media, setMedia] = React.useState<Media[] | null>(null);

  React.useEffect(() => {
    if (value) {
      const fetchMedia = async () => {
        const mediaPromises = value.map(async (item) => {
          const res = await fetch(`/api/media/${item}`);
          return res.json();
        });
        const mediaData = await Promise.all(mediaPromises);
        setMedia(mediaData);
      };
      fetchMedia();
    }
    setMedia(null);
  }, [value]);

  if (!media) {
    return (
      <div className="w-full animate-pulse duration-100 min-h-20 border-[1px] border-gray-700 p-4 text-center">
        ...
      </div>
    );
  }
  return (
    <div className="flex flex-wrap justify-around gap-4">
      {media.map((item, idx) => (
        <figure key={item.id} className="relative h-[200px] ">
          <Image
            src={item.url}
            alt={item.alt}
            width={500}
            height={500}
            className="w-full h-full object-cover max-w-full rounded-lg"
          />
          <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white p-2">
            {idx + 1} - {item.alt}
          </div>
        </figure>
      ))}
    </div>
  );
};
