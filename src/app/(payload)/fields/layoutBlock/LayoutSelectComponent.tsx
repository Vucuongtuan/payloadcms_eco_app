''''use client'

import React from 'react'
import { useField, FieldLabel } from '@payloadcms/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LayoutGrid, List, Rows3, LayoutDashboard } from 'lucide-react'
import type { SelectFieldClientProps } from 'payload'
import { cn } from '@/lib/utils'

const layoutOptions = [
  { label: 'Grid', value: 'grid', icon: <LayoutGrid className="h-5 w-5 text-muted-foreground" /> },
  { label: 'List', value: 'list', icon: <List className="h-5 w-5 text-muted-foreground" /> },
  { label: 'Carousel', value: 'carousel', icon: <Rows3 className="h-5 w-5 text-muted-foreground" /> },
  { label: 'Masonry', value: 'masonry', icon: <LayoutDashboard className="h-5 w-5 text-muted-foreground" /> },
]

export const LayoutSelectComponent: React.FC<SelectFieldClientProps> = (props) => {
  const { path, field } = props
  const { label, required } = field
  const { value, setValue } = useField<string>({ path })

  const handleValueChange = (newValue: string) => {
    setValue(newValue)
  }

  const selectedOption = layoutOptions.find(opt => opt.value === value)

  return (
    <div className="flex flex-col gap-2">
      <FieldLabel htmlFor={`field-${path.replace(/\./g, '__')}`} label={label} required={required} />
      <Select onValueChange={handleValueChange} value={value}>
        <SelectTrigger className={cn(!value && 'text-muted-foreground')}>
          <div className="flex items-center gap-2">
            {selectedOption ? selectedOption.icon : <LayoutGrid className="h-5 w-5 text-muted-foreground" />}
            <SelectValue placeholder="Select a layout" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {layoutOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                {option.icon}
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
'''