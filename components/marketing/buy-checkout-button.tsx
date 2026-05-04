"use client";

import { useRouter } from "next/navigation";
import { useState, type ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BuyCheckoutButton({
  className,
  size = "lg",
  variant = "default",
  ...props
}: ComponentProps<typeof Button>) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-stretch gap-2">
      <Button
        type="button"
        size={size}
        variant={variant}
        disabled={busy}
        className={cn("text-base md:text-[0.95rem]", className)}
        onClick={() => {
          void (async () => {
            setMessage(null);
            setBusy(true);
            const response = await fetch("/api/checkout", { method: "POST" });
            const data = (await response.json()) as {
              url?: string;
              error?: { message?: string };
            };
            if (!response.ok) {
              setMessage(
                typeof data?.error?.message === "string"
                  ? data.error.message
                  : "Checkout unavailable",
              );
              setBusy(false);
              return;
            }
            const url = typeof data.url === "string" ? data.url : undefined;
            if (!url?.length) {
              setMessage("Checkout URL missing");
              setBusy(false);
              return;
            }
            router.push(url);
          })();
        }}
        {...props}
      >
        {busy ? "Opening checkout…" : "Buy GlanceGuard — $20"}
      </Button>
      {message ? (
        <p className="text-destructive text-center text-xs" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
