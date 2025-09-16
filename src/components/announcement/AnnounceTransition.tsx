import { Announcement, AnnouncementSettings } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface AnnouncementTransitionProps {
  messages: Announcement[];
  currentIndex: number;
  transition: "blur" | "slide-horizontal" | "slide-vertical";
}

export default function AnnouncementTransition(
  props: AnnouncementTransitionProps,
) {
  const { messages, currentIndex, transition } = props;

  const motionTransition: Record<string, any> = {
    blur: {
      initial: { opacity: 0, filter: "blur(10px)", scale: 0.95 },
      animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
      exit: { opacity: 0, filter: "blur(10px)", scale: 1.05 },
      transition: { duration: 0.6, ease: "easeInOut" },
      className: "text-center px-4",
    },
    "slide-horizontal": {
      initial: { x: 100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -100, opacity: 0 },
      transition: { duration: 0.5, ease: "easeInOut" },
      className: "text-center px-4",
    },
    "slide-vertical": {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
      transition: { duration: 0.4, ease: "easeInOut" },
      className: "absolute inset-0 flex items-center justify-center px-4",
    },
  };

  // verticle
  // initial={{ y: 20, opacity: 0 }}
  // //           animate={{ y: 0, opacity: 1 }}
  // //           exit={{ y: -20, opacity: 0 }}
  // //           transition={{ duration: 0.4, ease: "easeInOut" }}
  // //           className="absolute inset-0 flex items-center justify-center px-4"
  // horizontal
  // initial={{ x: 100, opacity: 0 }}
  // //           animate={{ x: 0, opacity: 1 }}
  // //           exit={{ x: -100, opacity: 0 }}
  // //           transition={{ duration: 0.5, ease: "easeInOut" }}
  // //           className="text-center px-4"
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          {...motionTransition[transition]}
          className="text-center px-4"
        >
          <p className="text-sm font-medium text-balance">
            {messages[currentIndex].content}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
