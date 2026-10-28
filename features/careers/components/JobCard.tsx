import React from "react";
import { JobPosition } from "../types";
import { CAREERS_TEXTS } from "../constants";

interface JobCardProps {
  job: JobPosition;
  onApply: (title: string) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  return (
    <div className="relative overflow-hidden bg-white rounded-3xl p-6 sm:p-7 border border-lilian-purple/10 hover:border-lilian-orange/40 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col justify-between h-full group">
      {/* Top Animated Color Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-lilian-orange via-lilian-pink to-lilian-teal transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

      <div>
        {/* Top Badges & Live Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-chronica font-semibold px-3 py-1 rounded-full bg-lilian-purple/10 text-lilian-purple group-hover:bg-lilian-purple/15 transition-colors">
              {job.department}
            </span>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-chronica font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Activa</span>
            </div>
          </div>
          <span className="text-xs font-chronica font-bold px-3 py-1 rounded-full bg-lilian-orange/15 text-lilian-orange group-hover:bg-lilian-orange/25 transition-colors">
            Edad: {job.ageRange}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-chronica text-xl sm:text-2xl font-bold text-lilian-purple mb-2 group-hover:text-lilian-orange transition-colors">
          {job.title}
        </h4>

        {/* Location & Schedule */}
        <div className="flex flex-col gap-1.5 text-xs text-lilian-purple/75 font-gotham mb-4">
          <div className="flex items-center gap-1.5 group/loc">
            <svg className="w-3.5 h-3.5 text-lilian-teal shrink-0 group-hover/loc:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5 group/sch">
            <svg className="w-3.5 h-3.5 text-lilian-teal shrink-0 group-hover/sch:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{job.schedule}</span>
          </div>
        </div>

        {/* Description */}
        <p className="font-gotham text-xs sm:text-sm text-lilian-purple/80 leading-relaxed mb-4">
          {job.description}
        </p>

        {/* Requirements */}
        <div className="mb-6 pt-3 border-t border-lilian-purple/5">
          <span className="text-xs font-chronica font-bold text-lilian-purple block mb-2">
            Requisitos clave:
          </span>
          <ul className="space-y-1.5">
            {job.requirements.map((req, i) => (
              <li
                key={i}
                className="text-xs font-gotham text-lilian-purple/75 flex items-start gap-2 group/req hover:translate-x-1 transition-transform duration-200"
              >
                <span className="text-lilian-teal font-bold shrink-0 group-hover/req:text-lilian-orange group-hover/req:scale-125 transition-all">
                  ✓
                </span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={() => onApply(job.title)}
        className="w-full py-3.5 px-4 rounded-full bg-lilian-purple/5 hover:bg-lilian-orange text-lilian-purple hover:text-white font-chronica font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer group-hover:bg-lilian-orange group-hover:text-white shadow-sm hover:shadow-lg hover:shadow-lilian-orange/30 active:scale-[0.98] group/btn"
      >
        <span>{CAREERS_TEXTS.applyButtonLabel}</span>
        <svg
          className="w-4 h-4 transform group-hover:translate-x-1.5 group-hover/btn:translate-x-2 transition-transform duration-300 ease-out"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
}
