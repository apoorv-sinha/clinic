'use client'

import * as React from 'react'
import { cn } from './utils'

type SelectProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

type TriggerProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string
}

type SelectItemData = { value: string; label: React.ReactNode }

function collectSelectParts(children: React.ReactNode): {
  triggerProps: TriggerProps
  placeholder?: string
  items: SelectItemData[]
} {
  let triggerProps: TriggerProps = {}
  let placeholder: string | undefined
  const items: SelectItemData[] = []

  const walk = (node: React.ReactNode) => {
    React.Children.forEach(node, (child) => {
      if (!React.isValidElement(child)) return
      const el = child as React.ReactElement<any>

      const type = el.type as any

      if (type?.__ui === 'SelectTrigger') {
        triggerProps = { ...(el.props as TriggerProps) }
        // Look for <SelectValue placeholder="..."/>
        React.Children.forEach(el.props?.children, (grandChild) => {
          if (!React.isValidElement(grandChild)) return
          const gc = grandChild as React.ReactElement<any>
          const gt = gc.type as any
          if (gt?.__ui === 'SelectValue' && typeof gc.props?.placeholder === 'string') {
            placeholder = gc.props.placeholder
          }
        })
      } else if (type?.__ui === 'SelectContent') {
        walk(el.props?.children)
      } else if (type?.__ui === 'SelectItem') {
        items.push({ value: String(el.props?.value), label: el.props?.children })
      } else {
        walk(el.props?.children)
      }
    })
  }

  walk(children)
  return { triggerProps, placeholder, items }
}

export function Select({ value, defaultValue, onValueChange, children }: SelectProps) {
  const { triggerProps, placeholder, items } = collectSelectParts(children)
  const [internalValue, setInternalValue] = React.useState<string>(defaultValue ?? '')

  const isControlled = typeof value === 'string'
  const currentValue = isControlled ? (value as string) : internalValue

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const next = e.target.value
    if (!isControlled) setInternalValue(next)
    onValueChange?.(next)
    triggerProps.onChange?.(e)
  }

  return (
    <select
      {...triggerProps}
      value={currentValue}
      onChange={handleChange}
      className={cn(
        'flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        triggerProps.className,
      )}
    >
      {placeholder ? (
        <option value="" disabled>
          {placeholder}
        </option>
      ) : null}
      {items.map((it) => (
        <option key={it.value} value={it.value}>
          {typeof it.label === 'string' ? it.label : String(it.label)}
        </option>
      ))}
    </select>
  )
}

export function SelectTrigger(_props: TriggerProps) {
  return null
}
(SelectTrigger as any).__ui = 'SelectTrigger'

export function SelectValue(_props: { placeholder?: string }) {
  return null
}
(SelectValue as any).__ui = 'SelectValue'

export function SelectContent(_props: { children: React.ReactNode }) {
  return null
}
(SelectContent as any).__ui = 'SelectContent'

export function SelectItem(_props: { value: string; children: React.ReactNode }) {
  return null
}
(SelectItem as any).__ui = 'SelectItem'

