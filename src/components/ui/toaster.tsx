import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Toast, 
  ToastClose, 
  ToastDescription, 
  ToastProvider, 
  ToastTitle, 
  ToastViewport 
} from "@/components/ui/toast";

// FIXED: Define the shape of a Toast to stop 'implicit any' errors
interface ToastNotification {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
  [key: string]: unknown; 
}

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {/* FIXED: Explicitly typing the map parameters */}
      {toasts?.map(({ id, title, description, action, ...props }: ToastNotification) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}