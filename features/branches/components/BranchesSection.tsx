"use client";

import React from "react";
import { useBranchesFilter } from "../hooks/useBranchesFilter";
import BranchCard from "./BranchCard";
import { BRANCHES_TEXTS } from "../constants";

export default function BranchesSection() {
  const {
    selectedDepartment,
    setSelectedDepartment,
    departments,
    filteredBranches,
  } = useBranchesFilter();

  return (
    <section
      id={BRANCHES_TEXTS.sectionId}
      className="relative w-full py-16 sm:py-24 bg-white overflow-hidden scroll-mt-20"
    >
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block text-xs uppercase tracking-widest font-chronica font-bold text-lilian-orange bg-lilian-orange/10 px-4 py-1.5 rounded-full mb-3">
            {BRANCHES_TEXTS.badge}
          </span>

          <h2 className="font-chronica text-3xl sm:text-4xl lg:text-5xl font-bold text-lilian-purple mb-4 leading-tight">
            <span>{BRANCHES_TEXTS.titleBefore}</span>
            <span className="font-owl-cute text-lilian-teal text-4xl sm:text-5xl lg:text-6xl inline-block mx-1">
              {BRANCHES_TEXTS.highlightedTitle}
            </span>
            <span>{BRANCHES_TEXTS.titleAfter}</span>
          </h2>

          <p className="font-gotham text-sm sm:text-base lg:text-lg text-lilian-purple/80 leading-relaxed">
            {BRANCHES_TEXTS.subtitle}
          </p>
        </div>

        {/* Department Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10 sm:mb-12">
          {departments.map((dept) => {
            const isActive = dept === selectedDepartment;
            return (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`py-2 px-4 sm:px-6 rounded-full text-xs sm:text-sm font-chronica font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-lilian-purple text-white shadow-md scale-105"
                    : "bg-lilian-purple/5 text-lilian-purple/75 hover:bg-lilian-purple/10 hover:text-lilian-purple"
                }`}
              >
                {dept}
              </button>
            );
          })}
        </div>

        {/* Branches Grid */}
        {filteredBranches.length > 0 ? (
          <div
            className={`grid gap-8 mx-auto ${
              filteredBranches.length === 1
                ? "grid-cols-1 max-w-2xl"
                : "grid-cols-1 lg:grid-cols-2 max-w-2xl lg:max-w-5xl"
            }`}
          >
            {filteredBranches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-lilian-purple/5 rounded-3xl max-w-lg mx-auto">
            <p className="font-gotham text-lilian-purple/70 text-sm">
              {BRANCHES_TEXTS.emptyMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
