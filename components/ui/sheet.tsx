'use client'

import * as React from 'react'
import { cn } from './utils'

type SheetSide = 'left' | 'right'

type SheetContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextValue | null>(null)

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = typeof open === 'boolean'
  const actualOpen = isControlled ? (open as boolean) : uncontrolledOpen

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  return (
    <SheetContext.Provider value={{ open: actualOpen, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

export function SheetTrigger({
  asChild,
  children,
  className,
}: {
  asChild?: boolean
  children: React.ReactNode
  className?: string
}) {
  const ctx = React.useContext(SheetContext)
  if (!ctx) throw new Error('SheetTrigger must be used within <Sheet>')

  const onClick = () => ctx.setOpen(true)

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>
    return React.cloneElement(child, {
      onClick: (...args: any[]) => {
        child.props?.onClick?.(...args)
        onClick()
      },
      className: cn(child.props?.className, className),
    })
  }

  return (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  )
}

export function SheetContent({
  side = 'right',
  className,
  children,
}: {
  side?: SheetSide
  className?: string
  children: React.ReactNode
}) {
  const ctx = React.useContext(SheetContext)
  if (!ctx) throw new Error('SheetContent must be used within <Sheet>')
  if (!ctx.open) return null

  const panelSide =
    side === 'left'
      ? 'left-0 translate-x-0'
      : 'right-0 translate-x-0'

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => ctx.setOpen(false)}
      />
      <div
        className={cn(
          'absolute top-0 h-full w-[320px] max-w-[90vw] border-l border-border bg-background p-6 shadow-xl',
          panelSide,
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

