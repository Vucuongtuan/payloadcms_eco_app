"use client"


import { TextField, useField, useForm } from "@payloadcms/ui"
import { TextFieldClientProps } from "payload"


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

  return (
    <TextField
      path={path || field.name}
    //   label={field.label || "Price (VND)"}
      value={value || ""}
      onChange={handleChange}
      inputProps={{
        inputMode: "numeric", 
      }}
    />
  )
}
