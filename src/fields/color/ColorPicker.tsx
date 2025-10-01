"use client";

import { TextInput, useField } from "@payloadcms/ui";
import React, { useCallback, useRef, useState } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";
import "./styles.scss";
import { SwatchPicker } from "./SwatchPicker";

export const ColorPicker = ({
  field: { label, required = false, admin },
  path,
}: {
  field: { label: string; required?: boolean; admin?: { width?: string } };
  path: string;
}) => {
  const { value, setValue } = useField<string>({ path });
  const [isOpen, toggle] = useState(false);
  const popover = useRef<HTMLDivElement>(null);

  const closePicker = useCallback(() => toggle(false), []);
  useClickOutside(popover, closePicker);

  const presetColors = ["#016138", "#a37f2d", "#27272a", "#e4e4e7", "#f4f4f5"];

  return (
    <div
      className={"field-type text color-picker"}
      style={{ "--field-width": admin?.width ?? "100%" } as React.CSSProperties}
    >
      <label className={"field-label"}>
        {label} {required && <span className="required">*</span>}
      </label>
      <div className={"field-type__wrap"}>
        <div className="color-picker-row">
          <div className="picker">
            <div
              className="picker_currentColor"
              style={{
                backgroundColor: value ?? "#FFFFFF",
              }}
              onClick={() => toggle(true)}
            
            />
            {isOpen && (
              <div className="picker_popover" ref={popover}>
                <SwatchPicker
                  color={value}
                  onChange={(v) => setValue(v)}
                  presetColors={presetColors}
                />
              </div>
            )}
          </div>
          <TextInput
            label=""
            path={path}
            onChange={(e: { target: { value: string } }) =>
              setValue(e.target.value)
            }
            value={value ?? ""}
          />
        </div>
      </div>
    </div>
  );
};
