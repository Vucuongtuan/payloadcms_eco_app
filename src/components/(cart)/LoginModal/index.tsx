"use client";

import { Button } from "@/components/ui/button";
import { X, LogIn, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const t = useTranslations("cart");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{t("loginRequired.title")}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <LogIn className="h-8 w-8 text-gray-400" />
              </div>
              
              <p className="text-gray-600">
                {t("loginRequired.message")}
              </p>

              <div className="flex gap-3 pt-4">
                <Button asChild className="flex-1">
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    {t("loginRequired.login")}
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/signup">
                    <UserPlus className="h-4 w-4 mr-2" />
                    {t("loginRequired.signup")}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
