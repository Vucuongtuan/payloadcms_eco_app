"use client";

import { debounce } from "es-toolkit";
import { LoaderCircle } from "lucide-react";
import { TextFieldClientComponent } from "payload";
import { useCallback, useEffect, useState } from "react";

import { ShimmeringText } from "@/components/animate-ui/text/shimmering";
import { FieldLabel, TextField, useField, useFormFields } from "@payloadcms/ui";

export const SlugField: TextFieldClientComponent = props => {
  const { path, field } = props;
  const { value, setValue, formInitializing, formProcessing } =
    useField<string>();
  const title = useFormFields(([fields]) => fields.title.value) as string;
  const [isLoading, setIsLoading] = useState(false);
  console.log(props);

  const debouncedSetValue = useCallback(
    debounce((val: string) => {
      setValue(formatSlug(val));
      setIsLoading(false);
    }, 5000),
    [setValue]
  );

  useEffect(() => {
    if (title) {
      setIsLoading(true);
      debouncedSetValue(title);
    } else {
      debouncedSetValue.cancel();
      setIsLoading(false);
      setValue("");
    }

    return () => {
      debouncedSetValue.cancel();
    };
  }, [title, debouncedSetValue, setValue]);

  return (
    <div style={{ position: "relative" }}>
      <TextField {...props} value={value} />
      {!isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "-1.5%"
          }}
        >
          <LoaderCircle size={15} style={{}} />
        </div>
      )}
    </div>
  );
};

const formatSlug = (val: string): string => {
  if (!val) return "";
  return val
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[đĐ]/g, "d")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};
