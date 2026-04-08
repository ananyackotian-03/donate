"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DropdownContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const DropdownContext = React.createContext<DropdownContextType | undefined>(undefined)

const useDropdown = () => {
  const context = React.useContext(DropdownContext)
  if (!context) {
    throw new Error("Dropdown components must be used within <DropdownMenu>")
  }
  return context
}

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  )
}

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const { setIsOpen } = useDropdown()

  return (
    <button
      ref={ref}
      onClick={(e) => {
        setIsOpen(true)
        onClick?.(e)
      }}
      className={cn(
        "inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600",
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
})

DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen, setIsOpen } = useDropdown()

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={() => setIsOpen(false)}
      />
      <div
        ref={ref}
        className={cn(
          "absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-50",
          className
        )}
        {...props}
      />
    </>
  )
})

DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { onClick?: () => void }
>(({ className, onClick, ...props }, ref) => {
  const { setIsOpen } = useDropdown()

  return (
    <div
      ref={ref}
      className={cn(
        "cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors",
        className
      )}
      role="menuitem"
      tabIndex={0}
      onClick={() => {
        onClick?.()
        setIsOpen(false)
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.()
          setIsOpen(false)
        }
      }}
      {...props}
    />
  )
})

DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
  <div
    ref={ref}
    className="my-1 h-px bg-gray-200"
    {...props}
  />
))

DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
}
