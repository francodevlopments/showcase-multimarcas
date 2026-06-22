import { CheckCircle2 } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Toast() {
  const { toast } = useStore();

  if (!toast) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 fade-in">
      <div className="flex items-center gap-3 rounded-sm border border-olive/20 bg-white px-4 py-3 text-sm font-medium text-ink shadow-lift">
        <CheckCircle2 className="shrink-0 text-olive" size={19} aria-hidden="true" />
        <span>{toast}</span>
      </div>
    </div>
  );
}
