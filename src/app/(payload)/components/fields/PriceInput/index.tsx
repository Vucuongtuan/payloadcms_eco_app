"use client";
import React, { useEffect, useState } from "react";

import { TextField, useField } from "@payloadcms/ui";

const formatNumber = (num: number | string): string => {
  if (num === null || num === undefined) return "";
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const parseNumber = (str: string): number => {
  if (str === null || str === undefined) return 0;
  return Number(String(str).replace(/,/g, ""));
};

export const PriceInput = (props: any) => {
  const { path, label, required, description, readOnly } = props;
  const { value, setValue } = useField<number>({ path });

  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    setDisplayValue(formatNumber(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = parseNumber(inputValue);

    if (!isNaN(numericValue)) {
      setValue(numericValue);
      setDisplayValue(formatNumber(inputValue.replace(/,/g, "")));
    }
  };
  //   console.log(value, displayValue);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <TextField {...props} />
    </div>
  );
};
