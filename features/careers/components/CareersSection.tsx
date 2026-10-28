"use client";

import React, { useMemo, useState } from "react";
import { INITIAL_JOB_POSITIONS, CAREERS_TEXTS } from "../constants";
import { useCareersForm } from "../hooks/useCareersForm";
import JobCard from "./JobCard";
import JobSearch from "./JobSearch";
import CareersForm from "./CareersForm";

export default function CareersSection() {
  const formHook = useCareersForm();
  const [selectedDept, setSelectedDept] = useState<string>("Todas");
  const [searchQuery, setSearchQuery] = useState("");

  const departments = useMemo(() => {
    const list = Array.from(new Set(INITIAL_JOB_POSITIONS.map((j) => j.department)));
    return ["Todas", ...list];
  }, []);

  const filteredJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return INITIAL_JOB_POSITIONS.filter((job) => {
      const matchesDept =
        selectedDept === "Todas" || job.department === selectedDept;

      if (!matchesDept) return false;
      if (!query) return true;

      const haystack = [
        job.title,
        job.department,
        job.location,
        job.schedule,
        job.description,
        ...job.requirements,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [selectedDept, searchQuery]);

  return (
    <section
      id={CAREERS_TEXTS.sectionId}
      className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-white via-brand-cream/25 to-white overflow-hidden scroll-mt-20"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-lilian-orange/10 via-brand-cream/30 to-lilian-teal/15 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-lilian-beige/25 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-lilian-orange/10 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

      <div className="max-w-[1440px] mx-auto w-full px-8 sm:px-12 lg:px-20 xl:px-24 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lilian-orange/10 border border-lilian-orange/20 shadow-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lilian-orange opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lilian-orange" />
            </span>
            <span className="text-xs uppercase tracking-widest font-chronica font-bold text-lilian-orange">
              {CAREERS_TEXTS.badge}
            </span>
          </div>

          <h2 className="font-chronica text-3xl sm:text-4xl lg:text-5xl font-bold text-lilian-purple mb-4 leading-tight">
            <span>{CAREERS_TEXTS.titleBefore}</span>
            <span className="font-owl-cute text-lilian-teal text-4xl sm:text-5xl lg:text-6xl inline-block mx-1 drop-shadow-sm">
              {CAREERS_TEXTS.highlightedTitle}
            </span>
          </h2>

          <p className="font-gotham text-sm sm:text-base lg:text-lg text-lilian-purple/80 leading-relaxed">
            {CAREERS_TEXTS.subtitle}
          </p>
        </div>

        {/* Plazas Disponibles */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
            <div>
              <h3 className="font-chronica text-2xl sm:text-3xl font-bold text-lilian-purple">
                {CAREERS_TEXTS.jobsHeaderTitle}
              </h3>
              <p className="text-xs sm:text-sm font-gotham text-lilian-purple/70">
                {CAREERS_TEXTS.jobsHeaderSubtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <JobSearch value={searchQuery} onChange={setSearchQuery} />
              <div className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-full bg-lilian-purple/5 border border-lilian-purple/10 text-xs font-chronica font-semibold text-lilian-purple shrink-0">
                <span>
                  {filteredJobs.length}{" "}
                  {filteredJobs.length === 1 ? "plaza disponible" : "plazas disponibles"}
                </span>
              </div>
            </div>
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap mb-8">
            {departments.map((dept) => {
              const isActive = dept === selectedDept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`py-2 px-4 rounded-full text-xs font-chronica font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-lilian-purple text-white shadow-md scale-105"
                      : "bg-white/80 hover:bg-lilian-purple/10 text-lilian-purple/75 border border-lilian-purple/10 hover:text-lilian-purple"
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>

          {/* Cards Grid / Empty State */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={(title) => formHook.handleSelectPosition(title)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-14 px-6 rounded-3xl bg-lilian-purple/5 border border-lilian-purple/10 max-w-lg mx-auto">
              <p className="font-gotham text-sm text-lilian-purple/75 mb-4">
                {CAREERS_TEXTS.searchEmptyMessage}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDept("Todas");
                }}
                className="text-xs font-chronica font-bold text-lilian-orange hover:underline cursor-pointer"
              >
                Ver todas las plazas
              </button>
            </div>
          )}
        </div>

        {/* Application Form */}
        <CareersForm formHook={formHook} />
      </div>
    </section>
  );
}
