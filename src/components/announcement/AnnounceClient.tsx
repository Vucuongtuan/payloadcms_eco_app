"use client";
import { Announcement, AnnouncementSettings } from "@/types";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AnnouncementTransition from "./AnnounceTransition";

export default function AnnounceClient(props: AnnouncementSettings) {
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
    <motion.div
      className={`relative bg-black text-white py-3 px-4 w-screen overflow-hidden`}
    >
      <AnnouncementTransition
        messages={announcement}
        currentIndex={currentIndex}
        transition={transition}
      />
    </motion.div>
  );
}
