"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            top: -20,
            scale: 0.3,
            opacity: 0,
          }}
          animate={{
            top: 50,
            scale: [0.3, 1.2, 0.95, 1.05, 1],
            opacity: 1,
          }}
          exit={{
            scale: 0.8,
            opacity: 0,
            transition: { duration: 0.2 },
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 22,
            duration: 0.7,
            scale: {
              times: [0, 0.4, 0.6, 0.8, 1],
              duration: 0.7,
            },
          }}
          className="fixed right-6 z-50"
        >
          <motion.div
            initial={{ width: 60, height: 60, borderRadius: "50%" }}
            animate={{
              width: "auto",
              height: "auto",
              borderRadius: "1rem",
              transition: {
                delay: 0.35,
                duration: 0.4,
                ease: [0.34, 1.56, 0.64, 1],
              },
            }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  delay: 0.55,
                  duration: 0.35,
                  ease: "easeOut",
                },
              }}
              className="flex items-center gap-3 px-5 py-4 min-w-[280px]"
            >
              <div className="flex-1">
                <p className="text-white font-medium text-sm">{message}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
