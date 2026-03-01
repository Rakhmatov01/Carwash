import { Star } from "lucide-react";
import { useUiStore } from "../../store/uiStore";

export default function RatingBadge({ value = 0, carwashId = null }) {


  return (
      <div
        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-gray-50 px-2 py-1 shadow-sm"
      >
        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
        <span className="text-lg font-semibold text-gray-700">
          {Number(value).toFixed(1)}
        </span>
      </div>
  );
}
