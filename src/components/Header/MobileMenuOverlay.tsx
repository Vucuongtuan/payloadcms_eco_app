"use client";

import { Header } from "@/payload-types";
import { resolveLink, resolveTitle } from "@/utilities/getLinkAndTitle";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  navData: Header['navItems'];
  onToggle: () => void;
}

const menuVariants = {
  hidden: {
    x: "100%",
    transition: {
      type: "tween",
      ease: "easeInOut",
    },
  },
  visible: {
    x: "0%",
    transition: {
      type: "tween",
      ease: "easeInOut",
    },
  },
};

export function MobileMenuOverlay({ isOpen, navData, onToggle }: MobileMenuOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={menuVariants}
          className="md:hidden fixed top-0 left-0 w-full h-screen bg-white pt-16"
        >
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            {navData?.map((link) => {
              if (!link) return null;
              return (
                <Link
                  key={link.id}
                  href={resolveLink(link)}
                  className="text-2xl text-gray-800 hover:text-black"
                  onClick={onToggle}
                >
                  {resolveTitle(link)}
                </Link>
              );
            })}
            <div className="flex flex-col space-y-4 w-full px-8 pt-8">
              <button className="w-full px-4 py-3 text-md font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100">
                Login
              </button>
              <button className="w-full px-4 py-3 text-md font-medium text-white bg-black rounded-md hover:bg-gray-800">
                Sign Up
              </button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
