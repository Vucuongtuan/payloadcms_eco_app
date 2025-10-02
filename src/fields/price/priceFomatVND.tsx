"use client"

import { FieldLabel, TextInput, useField, useForm } from "@payloadcms/ui"
import { TextFieldClientProps } from "payload"
import React from "react"
import './style.scss'

export const PriceFormatVND = ({ path, field }: TextFieldClientProps) => {
  const { value, setValue } = useField<string>({
    path: path || field.name,
  })

  const { dispatchFields } = useForm()

  const formatNumber = (val: string) => {
    if (!val) return ""
    const num = parseInt(val, 10)
    if (isNaN(num)) return ""
    return num.toLocaleString("vi-VN")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "")
    const formatted = formatNumber(raw)

    setValue(formatted)
    dispatchFields({
      type: "UPDATE",
      path: path || field.name,
      value: formatted,
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9]/.test(e.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
    ) {
      e.preventDefault()
    }
  }

  return (
    <div
    style={{ "--field-width":  "100%" } as React.CSSProperties}
  >
    <FieldLabel htmlFor={`field-${path}`} required={field.required} label={field.label as string} />
  
    <div className="price-input-wrapper">
      <div className="price-prefix">
        <span>VND</span>
      </div>
      <TextInput
        path={path || field.name}
        value={value || ""}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  </div>
  
  )
}
