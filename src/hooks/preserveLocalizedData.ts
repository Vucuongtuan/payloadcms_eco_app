import { FieldHook } from 'payload'

export const preserveLocalizedData: FieldHook = async ({ 
  value, 
  originalDoc, 
  req 
}) => {
  // Nếu không có value mới và có originalDoc, giữ lại data cũ
  if (!value && originalDoc) {
    return originalDoc
  }
  
  return value
}
