import * as React from "react"
import { cn } from "@/lib/utils"

export interface ToastProps {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

interface ToastContextValue {
  toasts: ToastProps[]
  toast: (props: Omit<ToastProps, 'id'>) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const toast = React.useCallback((props: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...props, id }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

const Toaster = () => {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex items-start gap-3 rounded-lg border p-4 shadow-lg min-w-[300px]",
            toast.variant === 'destructive'
              ? "border-destructive bg-destructive text-destructive-foreground"
              : "border bg-background"
          )}
        >
          <div className="flex-1">
            {toast.title && (
              <div className="font-semibold">{toast.title}</div>
            )}
            {toast.description && (
              <div className="text-sm opacity-90 mt-1">{toast.description}</div>
            )}
          </div>
          <button
            onClick={() => dismiss(toast.id)}
            className="text-foreground/50 hover:text-foreground"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export { Toaster }
