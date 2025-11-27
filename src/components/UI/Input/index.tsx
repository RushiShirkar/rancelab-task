import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const errorId = error && id ? `${id}-error` : undefined
    const describedBy = [props['aria-describedby'], errorId]
      .filter(Boolean)
      .join(' ') || undefined
    const isAriaInvalid =
      props['aria-invalid'] !== undefined ? props['aria-invalid'] : Boolean(error)

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium mb-1.5 text-foreground">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          aria-describedby={describedBy}
          aria-invalid={isAriaInvalid}
          className={cn(
            'flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm',
            'ring-offset-background placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-destructive focus-visible:ring-destructive'
              : 'border-input',
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="mt-1.5 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input