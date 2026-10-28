import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Branch } from "../types";
import { BRANCHES_TEXTS } from "../constants";

interface BranchCardProps {
  branch: Branch;
}

export default function BranchCard({ branch }: BranchCardProps) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-lilian-purple/10 hover:border-lilian-orange/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Branch Image */}
      <div className="relative w-full h-52 sm:h-64 bg-brand-cream overflow-hidden">
        <Image
          src={branch.image}
          alt={branch.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1 rounded-full shadow-sm">
          <span className="font-chronica font-bold text-xs uppercase text-lilian-purple">
            {branch.department}
          </span>
        </div>
      </div>

      {/* Branch Info */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between gap-5">
        <div className="flex flex-col gap-3">
          <h4 className="font-chronica text-xl sm:text-2xl font-bold text-lilian-purple group-hover:text-lilian-orange transition-colors">
            {branch.name}
          </h4>

          {/* Address */}
          <div className="flex items-start gap-2.5 text-xs sm:text-sm text-lilian-purple/80 font-gotham">
            <svg
              className="w-4 h-4 text-lilian-orange shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{branch.address}</span>
          </div>

          {/* Description */}
          <p className="font-gotham text-xs sm:text-sm text-lilian-purple/70 leading-relaxed">
            {branch.description}
          </p>

          {/* Schedule */}
          <div className="flex items-start gap-2.5 text-xs text-lilian-purple/75 font-gotham pt-2 border-t border-lilian-purple/5">
            <svg
              className="w-4 h-4 text-lilian-teal shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <span className="font-semibold block">{BRANCHES_TEXTS.hoursLabel}</span>
              <span>{branch.schedule}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Phone & Google Maps */}
        <div className="pt-4 border-t border-lilian-purple/10 flex flex-col gap-2.5">
          {branch.phones.length > 1 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {branch.phones.map((phone) => (
                  <Link
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="py-3 px-3.5 rounded-full border border-lilian-teal/30 hover:border-lilian-teal bg-lilian-teal-light/20 text-lilian-purple hover:text-lilian-teal-dark font-chronica font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] whitespace-nowrap"
                  >
                    <svg className="w-4 h-4 text-lilian-teal shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{phone}</span>
                  </Link>
                ))}
              </div>

              <Link
                href={branch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-lilian-orange to-lilian-orange-dark text-white font-chronica font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow hover:scale-[1.01] transition-all whitespace-nowrap"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>{BRANCHES_TEXTS.mapsButtonLabel}</span>
              </Link>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {branch.phones.map((phone) => (
                <Link
                  key={phone}
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="py-3 px-3.5 rounded-full border border-lilian-teal/30 hover:border-lilian-teal bg-lilian-teal-light/20 text-lilian-purple hover:text-lilian-teal-dark font-chronica font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] whitespace-nowrap"
                >
                  <svg className="w-4 h-4 text-lilian-teal shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{phone}</span>
                </Link>
              ))}

              <Link
                href={branch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-full bg-gradient-to-r from-lilian-orange to-lilian-orange-dark text-white font-chronica font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow hover:scale-[1.01] transition-all whitespace-nowrap"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>{BRANCHES_TEXTS.mapsButtonLabel}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
