"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FieldLabel,
  TextInput,
  useDebounce,
  useField,
  useForm,
  useFormFields,
} from "@payloadcms/ui";
import type { TextFieldClientProps } from "payload";
import { Product } from "@/payload-types";
import { isNumber } from "payload/shared";

const formatPrice = (value: number | undefined | null): string => {
  if (value === null || typeof value === "undefined") return "";
  return new Intl.NumberFormat("vi-VN").format(value);
};

export const TotalFinalPrice: React.FC<TextFieldClientProps> = (props) => {
  const { path, field } = props;

  const { value: vTotal, setValue: setVTotal } = useField<Product>({
    path: path || field.name,
  });
  const { price, discount } = useFormFields(([fields]) => {
    return {
      price: fields["pricing.price"],
      discount: fields["pricing.discount"],
    };
  });
  const calcFinalPrice = useDebounce((p?: number, d?: number) => {
    if (p === undefined) return;

    let finalPrice = p;
    if (d && d !== 0) {
      finalPrice = p - (p * d) / 100;
    }

    const formatVND = formatPrice(finalPrice || 0);
    setVTotal(formatVND);
  }, 500);

  useEffect(() => {
    const p = price?.value as number | undefined;
    const d = discount?.value as number | undefined;
    if (!p) return;

    calcFinalPrice(p, d);
  }, [price, discount]);

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel
          htmlFor={`field-${path}`}
          label={field?.label || field?.name}
          required={field?.required}
        />
      </div>
      <TextInput
        {...props}
        value={`${vTotal || 0} VND`}
        readOnly
        className="animate-pulse"
      />
    </div>
  );
};
