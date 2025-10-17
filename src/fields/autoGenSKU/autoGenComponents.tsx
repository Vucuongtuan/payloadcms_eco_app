"use client";

import { FieldLabel, TextInput, useField, useForm } from "@payloadcms/ui";
import { TextFieldClientProps } from "payload";
import { useCallback } from "react";

type AutoGenComponentProps = TextFieldClientProps & {
  fieldToUse: string;
};

export const AutoGenComponent = ({
  path,
  field,
  fieldToUse,
}: AutoGenComponentProps) => {
  const { value, setValue } = useField<string>({
    path: path || field.name,
  });
  const { dispatchFields, getDataByPath } = useForm();
  const handleGenerate = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault();

      const title = getDataByPath(fieldToUse) as string;
      const color = getDataByPath("color") as string;
      const size = getDataByPath("name") as string;
      if (title) {
        const clean = (str: string) =>
          str ? str.replace(/[^a-zA-Z0-9]/g, "").toUpperCase() : "";

        const abbreviation = title
          .split(/\s+/)
          .map((w) => clean(w).charAt(0))
          .join("");

        const colorCode = clean(color);

        const timestamp = new Date()
          .toISOString()
          .replace(/[-:T.Z]/g, "")
          .slice(2, 12);

        const parts = [abbreviation];
        if (colorCode) parts.push(colorCode);
        if (size) parts.push(size);
        parts.push(timestamp);

        const sku = parts.join("-");

        if (value !== sku) setValue(sku);
      } else {
        if (value !== "") setValue("");
      }
    },
    [setValue, value, fieldToUse, getDataByPath]
  );

  return (
    <div
      style={
        {
          "--field-width": "100%",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        } as React.CSSProperties
      }
    >
      <FieldLabel
        htmlFor={`field-${path}`}
        required={field.required}
        label={field.label as string}
      />

      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <button
          style={{
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            height: "100%",
          }}
          onClick={handleGenerate}
        >
          GEN
        </button>

        <TextInput
          path={path || field.name}
          value={value || ""}
          onChange={setValue}
          style={{ flex: 1 }}
        />
      </div>
    </div>
  );
};
