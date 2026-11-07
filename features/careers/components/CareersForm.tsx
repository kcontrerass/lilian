"use client";

import React, { useRef } from "react";
import { CAREERS_TEXTS, HR_EMAIL } from "../constants";
import { JobPosition } from "../types";
import { useCareersForm } from "../hooks/useCareersForm";

interface CareersFormProps {
  formHook: ReturnType<typeof useCareersForm>;
  positions: JobPosition[];
}

export default function CareersForm({ formHook, positions }: CareersFormProps) {
  const {
    formData,
    fileError,
    submitError,
    submitting,
    uploading,
    submitted,
    fieldErrors,
    handleInputChange,
    handleBlur,
    handleFileChange,
    handleRemoveFile,
    handleSubmit,
    handleReset,
  } = formHook;

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (submitted) {
    return (
      <div
        id="formulario-postulacion"
        className="bg-gradient-to-br from-white via-brand-cream/40 to-lilian-teal-light/25 rounded-3xl p-8 sm:p-12 border border-lilian-teal/30 shadow-xl text-center max-w-2xl mx-auto scroll-mt-24 transition-all duration-300"
      >
        <div className="w-16 h-16 rounded-full bg-lilian-teal/20 text-lilian-teal flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm animate-pulse">
          ✓
        </div>

        <h3 className="font-chronica text-2xl sm:text-3xl font-bold text-lilian-purple mb-2">
          {CAREERS_TEXTS.successTitle}
        </h3>

        <p className="font-gotham text-sm sm:text-base text-lilian-purple/80 leading-relaxed mb-6">
          {CAREERS_TEXTS.successSubtitle}
        </p>

        {/* Application Summary Box */}
        <div className="bg-white/85 rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm font-gotham text-lilian-purple mb-6 border border-lilian-purple/10 shadow-sm">
          <p className="font-bold text-lilian-purple mb-1 font-chronica">Resumen de postulación:</p>
          <p><span className="text-lilian-purple/70">Candidato:</span> {formData.fullName}</p>
          <p><span className="text-lilian-purple/70">Edad:</span> {formData.age} años</p>
          <p><span className="text-lilian-purple/70">Puesto:</span> {formData.position}</p>
          <p><span className="text-lilian-purple/70">Teléfono:</span> {formData.phone}</p>
          <p><span className="text-lilian-purple/70">Correo:</span> {formData.email}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="py-3.5 px-6 rounded-full bg-[#9a3412] text-white font-chronica font-bold text-sm shadow-md hover:shadow-lg hover:brightness-105 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {CAREERS_TEXTS.sendAnotherLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="formulario-postulacion"
      className="bg-white rounded-3xl p-6 sm:p-10 border border-lilian-purple/10 shadow-lg hover:shadow-xl transition-shadow duration-300 scroll-mt-24 max-w-3xl mx-auto"
    >
      <div className="mb-8 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest font-chronica font-bold text-lilian-orange block mb-1">
          Formulario Oficial
        </span>
        <h3 className="font-chronica text-2xl sm:text-3xl font-bold text-lilian-purple mb-2">
          {CAREERS_TEXTS.formTitle}
        </h3>
        <p className="font-gotham text-xs sm:text-sm text-lilian-purple/75">
          {CAREERS_TEXTS.formSubtitle}{" "}
          <strong className="text-lilian-purple">{HR_EMAIL}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-sm:scroll-mb-28">
        {/* Name and Age Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label htmlFor="career-name" className="block text-xs font-chronica font-bold text-lilian-purple mb-1.5">
              {CAREERS_TEXTS.fullNameLabel} <span className="text-lilian-pink">*</span>
            </label>
            <input
              id="career-name"
              type="text"
              name="fullName"
              required
              autoComplete="name"
              value={formData.fullName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldErrors.fullName)}
              aria-describedby={fieldErrors.fullName ? "career-name-error" : undefined}
              placeholder={CAREERS_TEXTS.fullNamePlaceholder}
              className="w-full px-4 py-3 rounded-2xl bg-lilian-purple/5 border border-lilian-purple/10 hover:border-lilian-purple/20 focus:border-lilian-orange focus:bg-white focus:ring-4 focus:ring-lilian-orange/15 outline-none text-lilian-purple text-sm font-gotham transition-all duration-200"
            />
            {fieldErrors.fullName ? (
              <p id="career-name-error" className="mt-1 text-xs text-red-600">{fieldErrors.fullName}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="career-age" className="block text-xs font-chronica font-bold text-lilian-purple mb-1.5">
              {CAREERS_TEXTS.ageLabel} <span className="text-lilian-pink">*</span>
            </label>
            <input
              id="career-age"
              type="number"
              name="age"
              required
              min="16"
              max="70"
              value={formData.age}
              onChange={handleInputChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldErrors.age)}
              aria-describedby={fieldErrors.age ? "career-age-error" : undefined}
              placeholder={CAREERS_TEXTS.agePlaceholder}
              className="w-full px-4 py-3 rounded-2xl bg-lilian-purple/5 border border-lilian-purple/10 hover:border-lilian-purple/20 focus:border-lilian-orange focus:bg-white focus:ring-4 focus:ring-lilian-orange/15 outline-none text-lilian-purple text-sm font-gotham transition-all duration-200"
            />
            {fieldErrors.age ? (
              <p id="career-age-error" className="mt-1 text-xs text-red-600">{fieldErrors.age}</p>
            ) : null}
          </div>
        </div>

        {/* Position Select */}
        <div>
          <label htmlFor="career-position" className="block text-xs font-chronica font-bold text-lilian-purple mb-1.5">
            {CAREERS_TEXTS.positionLabel} <span className="text-lilian-pink">*</span>
          </label>
          <select
            id="career-position"
            name="position"
            required
            value={formData.position}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoComplete="organization-title"
            aria-invalid={Boolean(fieldErrors.position)}
            className="w-full px-4 py-3 rounded-2xl bg-lilian-purple/5 border border-lilian-purple/10 hover:border-lilian-purple/20 focus:border-lilian-orange focus:bg-white focus:ring-4 focus:ring-lilian-orange/15 outline-none text-lilian-purple text-sm font-gotham transition-all duration-200 cursor-pointer"
          >
            <option value="" disabled>
              {CAREERS_TEXTS.positionPlaceholder}
            </option>
            {positions.map((p) => (
              <option key={p.id} value={p.title}>
                {p.title}
                {p.department ? ` (${p.department})` : ""}
              </option>
            ))}
            <option value={CAREERS_TEXTS.spontaneousApplicationLabel}>
              {CAREERS_TEXTS.spontaneousApplicationLabel}
            </option>
          </select>
          {fieldErrors.position ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.position}</p>
          ) : null}
        </div>

        {/* Contact Row: Email and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="career-email" className="block text-xs font-chronica font-bold text-lilian-purple mb-1.5">
              {CAREERS_TEXTS.emailLabel} <span className="text-lilian-pink">*</span>
            </label>
            <input
              id="career-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "career-email-error" : undefined}
              placeholder={CAREERS_TEXTS.emailPlaceholder}
              className="w-full px-4 py-3 rounded-2xl bg-lilian-purple/5 border border-lilian-purple/10 hover:border-lilian-purple/20 focus:border-lilian-orange focus:bg-white focus:ring-4 focus:ring-lilian-orange/15 outline-none text-lilian-purple text-sm font-gotham transition-all duration-200"
            />
            {fieldErrors.email ? (
              <p id="career-email-error" className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="career-phone" className="block text-xs font-chronica font-bold text-lilian-purple mb-1.5">
              {CAREERS_TEXTS.phoneLabel} <span className="text-lilian-pink">*</span>
            </label>
            <input
              id="career-phone"
              type="tel"
              name="phone"
              required
              autoComplete="tel"
              inputMode="tel"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? "career-phone-error" : undefined}
              placeholder={CAREERS_TEXTS.phonePlaceholder}
              className="w-full px-4 py-3 rounded-2xl bg-lilian-purple/5 border border-lilian-purple/10 hover:border-lilian-purple/20 focus:border-lilian-orange focus:bg-white focus:ring-4 focus:ring-lilian-orange/15 outline-none text-lilian-purple text-sm font-gotham transition-all duration-200"
            />
            {fieldErrors.phone ? (
              <p id="career-phone-error" className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
            ) : null}
          </div>
        </div>

        {/* CV File Upload */}
        <div>
          <label htmlFor="career-cv" className="block text-xs font-chronica font-bold text-lilian-purple mb-1.5">
            {CAREERS_TEXTS.cvLabel}
          </label>

          <input
            id="career-cv"
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="sr-only"
          />

          {formData.cvFile ? (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-lilian-teal-light/30 border border-lilian-teal/40 transition-all duration-200">
              <div className="flex items-center gap-3 overflow-hidden">
                <svg className="w-6 h-6 text-lilian-teal shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="truncate">
                  <p className="text-xs sm:text-sm font-bold text-lilian-purple truncate">
                    {formData.cvFile.name}
                  </p>
                  <p className="text-[11px] text-lilian-purple/60">
                    {(formData.cvFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleRemoveFile();
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                disabled={submitting || uploading}
                className="text-xs font-chronica font-semibold text-lilian-pink hover:underline shrink-0 ml-3 cursor-pointer disabled:opacity-60"
              >
                Quitar archivo
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group/drop border-2 border-dashed border-lilian-purple/20 hover:border-lilian-orange rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 bg-lilian-purple/5 hover:bg-lilian-orange/5"
            >
              <svg
                className="w-8 h-8 text-lilian-orange mx-auto mb-2 transform group-hover/drop:-translate-y-1 group-hover/drop:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-xs sm:text-sm font-chronica font-bold text-lilian-purple mb-1 group-hover/drop:text-lilian-orange transition-colors">
                Haz clic para subir tu CV
              </p>
              <p className="text-[11px] text-lilian-purple/60 font-gotham">
                {CAREERS_TEXTS.cvHelpText}
              </p>
            </div>
          )}

          {fileError && (
            <p className="text-xs text-lilian-pink font-gotham mt-1.5">{fileError}</p>
          )}
        </div>

        {/* Comments textarea */}
        <div>
          <label htmlFor="career-comments" className="block text-xs font-chronica font-bold text-lilian-purple mb-1.5">
            {CAREERS_TEXTS.commentsLabel}
          </label>
          <textarea
            id="career-comments"
            name="comments"
            rows={3}
            value={formData.comments}
            onChange={handleInputChange}
            placeholder={CAREERS_TEXTS.commentsPlaceholder}
            className="w-full px-4 py-3 rounded-2xl bg-lilian-purple/5 border border-lilian-purple/10 hover:border-lilian-purple/20 focus:border-lilian-orange focus:bg-white focus:ring-4 focus:ring-lilian-orange/15 outline-none text-lilian-purple text-sm font-gotham transition-all duration-200 resize-none"
          />
        </div>

        {/* Submit Button */}
        {submitError ? (
          <p className="text-xs text-lilian-pink font-gotham" role="alert">
            {submitError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting || uploading}
          className="w-full py-4 px-6 rounded-full bg-[#9a3412] hover:brightness-110 text-white font-chronica font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-lilian-orange/30 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-60 group"
        >
          {submitting || uploading ? (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {uploading ? CAREERS_TEXTS.uploadingLabel : CAREERS_TEXTS.submittingLabel}
            </span>
          ) : (
            <>
              <span>{CAREERS_TEXTS.submitButtonLabel}</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
