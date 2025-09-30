// @ts-nocheck
"use client";

import { PayloadComponent, TextFieldClientComponent } from "payload";
import { useCallback, useEffect } from "react";

import { TextField, useFormFields, withCondition } from "@payloadcms/ui";

const formatSlug = (val: string): string => {
  return val
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[đĐ]/g, "d")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const SlugField: TextFieldClientComponent = props => {
  const { path } = props;

  const { value: title } = useFormFields(([fields]) => fields.title) || {};
  const { setValue } = useFormFields();

  const generateSlug = useCallback(
    (val: string) => {
      if (typeof val === "string") {
        const newSlug = formatSlug(val);
        setValue(path, newSlug);
      }
    },
    [setValue, path]
  );

  useEffect(() => {
    generateSlug(title as string);
  }, [title, generateSlug]);

  return <TextField {...props} />;
};

export const SlugFields = withCondition(SlugField) as PayloadComponent;
