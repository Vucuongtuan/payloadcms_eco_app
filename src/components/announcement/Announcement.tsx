import { findSettings } from "@/service/layout";
import {
  Announcement as AnnouncementType,
  AnnouncementSettings,
  Lang,
} from "@/types";
import AnnounceClient from "./AnnounceClient";
import { Setting } from "@/payload-types";

import { Suspense } from "react";

interface AnnouncementProps {
  lang: Lang;
}

export async function Announcement({ lang }: AnnouncementProps) {
  const q = await findSettings<AnnouncementSettings | Setting>(
    lang,
    "announcement",
  );
  if (
    !q ||
    !q.announcement ||
    (q.announcement as AnnouncementType[]).length === 0
  )
    return null;

  // Handle both types with type assertions
  const announcements = Array.isArray(q.announcement)
    ? q.announcement
    : (q.announcement as AnnouncementType[]);

  // Safely access properties with type narrowing
  const transition = "transition" in q ? q.transition : "blur";
  const interval = "interval" in q ? q.interval : 5000;

  return (
    <div
      className={`relative bg-black text-white py-3 px-4 w-full overflow-hidden`}
    >
      <Suspense>
        <AnnounceClient
          announcement={announcements}
          transition={transition}
          interval={interval}
        />
      </Suspense>
    </div>
  );
}
