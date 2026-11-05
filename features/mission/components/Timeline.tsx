import dynamic from "next/dynamic";
import { MISSION_TEXTS } from "../constants";

const TimelineMapViewer = dynamic(() => import("./TimelineMapViewer"), {
  loading: () => (
    <div
      className="h-32 sm:h-40 w-full animate-pulse rounded-2xl bg-lilian-purple/10"
      aria-hidden
    />
  ),
});

export default function Timeline() {
  return (
    <div className="w-full mt-16 sm:mt-24 pt-12 border-t border-lilian-purple/10">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <span className="inline-block text-xs uppercase tracking-widest font-chronica font-bold text-lilian-orange bg-lilian-orange/10 px-4 py-1.5 rounded-full mb-3">
          1979 - Presente
        </span>
        <h3 className="font-chronica text-2xl sm:text-3xl lg:text-4xl font-bold text-lilian-purple mb-3">
          {MISSION_TEXTS.timelineTitle}
        </h3>
        <p className="text-lilian-purple/80 text-sm sm:text-base font-gotham">
          {MISSION_TEXTS.timelineSubtitle}
        </p>
      </div>

      <TimelineMapViewer />
    </div>
  );
}
