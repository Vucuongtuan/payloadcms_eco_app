"use client";
import React, { useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useModal,
} from "@/components/ui/animated-modal";

interface ModalBlockProps {
  title?: string;
  content?: string;
}

const MODAL_SHOWN_KEY = "hasSeenIntroModal";

const ModalController = () => {
  const { setOpen } = useModal();

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem(MODAL_SHOWN_KEY);
    if (!hasSeenModal) {
      setOpen(true);
      sessionStorage.setItem(MODAL_SHOWN_KEY, "true");
    }
  }, [setOpen]);

  return null;
};

const ModalCloseButton = () => {
    const { setOpen } = useModal();
    return (
        <button
            onClick={() => setOpen(false)}
            className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
        >
            Close
        </button>
    );
}

export default function ModalBlock({ title, content }: ModalBlockProps) {
  return (
    <Modal>
      <ModalController />

      <ModalBody>
        <ModalContent>
          <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
            {title || "Welcome!"}
          </h3>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            {content || "Here is your welcome message."}
          </div>
        </ModalContent>
        <ModalFooter>
          <ModalCloseButton />
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}