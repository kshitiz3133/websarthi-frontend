import { ReactNode } from "react";

export default function BrowserMockup({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-2xl bg-card">
      <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-4 h-5 rounded bg-background border border-border flex items-center px-2">
          <span className="text-[10px] text-muted-foreground truncate">
            https://your-site.websarthi.com
          </span>
        </div>
      </div>
      <div className="h-80 overflow-hidden relative bg-background p-3">
        {children}
      </div>
    </div>
  );
}
