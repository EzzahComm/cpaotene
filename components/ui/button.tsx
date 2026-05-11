import * as React from "react"

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: "sm" | "md" | "lg"
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost"
  }
>(({ className, size = "md", variant = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-8",
  }

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${className || ""}`}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
