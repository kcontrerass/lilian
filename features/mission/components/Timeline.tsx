import React from "react";
import { TIMELINE_MILESTONES, MISSION_TEXTS } from "../constants";

export default function Timeline() {
  return (
    <div className="w-full mt-16 sm:mt-24 pt-12 border-t border-lilian-purple/10">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
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

      {/* Timeline items grid */}
      <div className="relative">
        {/* Connecting horizontal line (visible on large screens) */}
        <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-lilian-orange/30 via-lilian-teal/40 to-lilian-orange/30 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
          {TIMELINE_MILESTONES.map((milestone) => (
            <div
              key={milestone.year}
              className={`group flex flex-col p-6 rounded-2xl transition-all duration-300 relative border ${
                milestone.highlight
                  ? "bg-gradient-to-b from-white to-lilian-teal-light/25 border-lilian-teal/30 shadow-sm hover:shadow-md"
                  : "bg-white/80 hover:bg-white border-lilian-purple/10 hover:shadow-md"
              }`}
            >
              {/* Dot indicator on desktop */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-chronica font-bold text-2xl sm:text-3xl text-lilian-orange group-hover:scale-105 transition-transform">
                  {milestone.year}
                </span>
                {milestone.badge && (
                  <span className="text-[11px] font-chronica font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-lilian-purple/10 text-lilian-purple">
                    {milestone.badge}
                  </span>
                )}
              </div>

              <h4 className="font-chronica font-bold text-base sm:text-lg text-lilian-purple mb-2">
                {milestone.title}
              </h4>

              <p className="font-gotham text-xs sm:text-sm text-lilian-purple/75 leading-relaxed">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
