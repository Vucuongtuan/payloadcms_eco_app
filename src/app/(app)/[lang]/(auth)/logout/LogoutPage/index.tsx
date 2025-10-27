"use client";

import { useAuth } from "@/providers/Auth";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";

export const LogoutPage: React.FC = (props) => {
  const { logout } = useAuth();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const t = useTranslations("auth");
  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        setSuccess(t("logout_success"));
      } catch (_) {
        setError(t("logout_failed"));
      }
    };

    void performLogout();
  }, [logout]);

  return (
    <Fragment>
      {(error || success) && (
        <div className="prose dark:prose-invert">
          <h1>{error || success}</h1>
          <p>
            {t("next_action.next")}
            <Fragment>
              {" "}
              <Link href="/">{t("next_action.home")}</Link>
            </Fragment>
            <Link href="/login">{t("next_action.login")}</Link>.
          </p>
          <p className={"text-red-500"}>{t("logout_rm_cart")}</p>
        </div>
      )}
    </Fragment>
  );
};
