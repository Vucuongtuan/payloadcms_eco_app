"use client";
import { Announcement, AnnouncementSettings } from "@/types";
import { motion } from "framer-motion";
import { useState, useEffect, memo } from "react";
import AnnouncementTransition from "./AnnounceTransition";

function AnnounceClient(props: AnnouncementSettings) {
  const { announcement, interval = 5000, transition = "blur" } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (announcement.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcement.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, announcement.length]);

  return (
    <AnnouncementTransition
      messages={announcement}
      currentIndex={currentIndex}
      transition={transition}
    />
  );
}

export default memo(AnnounceClient);
