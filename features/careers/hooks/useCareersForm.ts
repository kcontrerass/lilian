"use client";

import { useState } from "react";
import { useUploadPdf } from "@/hooks/useUploadPdf";
import { submitCareerApplication } from "../lib/submitApplication";
import { CAREERS_TEXTS } from "../constants";
import { JobApplicationFormData } from "../types";
import {
  ApplicationField,
  validateApplicationField,
} from "../lib/validateApplication";

const INITIAL_FORM_DATA: JobApplicationFormData = {
  fullName: "",
  age: "",
  position: "",
  email: "",
  phone: "",
  cvFile: null,
  comments: "",
};

const MAX_CV_BYTES = 10 * 1024 * 1024;

export function useCareersForm() {
  const { upload, uploading } = useUploadPdf();
  const [formData, setFormData] = useState<JobApplicationFormData>(INITIAL_FORM_DATA);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<ApplicationField, string>>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "fullName" || name === "age" || name === "position" || name === "email" || name === "phone") {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name !== "fullName" && name !== "age" && name !== "position" && name !== "email" && name !== "phone") {
      return;
    }
    const message = validateApplicationField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: message ?? undefined }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    setSubmitError(null);
    const file = e.target.files?.[0] || null;
    if (!file) {
      setFormData((prev) => ({ ...prev, cvFile: null }));
      return;
    }

    const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (fileExtension !== ".pdf") {
      setFileError(CAREERS_TEXTS.cvInvalidType);
      setFormData((prev) => ({ ...prev, cvFile: null }));
      return;
    }

    if (file.size > MAX_CV_BYTES) {
      setFileError(CAREERS_TEXTS.cvTooLarge);
      setFormData((prev) => ({ ...prev, cvFile: null }));
      return;
    }

    setFormData((prev) => ({ ...prev, cvFile: file }));
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, cvFile: null }));
    setFileError(null);
  };

  const handleSelectPosition = (positionTitle: string) => {
    setFormData((prev) => ({ ...prev, position: positionTitle }));
    const formElement = document.getElementById("formulario-postulacion");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const nextErrors: Partial<Record<ApplicationField, string>> = {};
    (["fullName", "age", "position", "email", "phone"] as const).forEach((field) => {
      const message = validateApplicationField(field, formData[field]);
      if (message) nextErrors[field] = message;
    });
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitError(CAREERS_TEXTS.missingFieldsError);
      return;
    }

    if (!formData.cvFile) {
      setSubmitError(CAREERS_TEXTS.missingCvError);
      return;
    }

    setSubmitting(true);

    try {
      const uploaded = await upload(formData.cvFile, {
        title: formData.fullName,
        context: "careers",
      });

      if (!uploaded?.url) {
        setSubmitError(CAREERS_TEXTS.missingPdfUrlError);
        return;
      }

      const result = await submitCareerApplication({
        fullName: formData.fullName.trim(),
        age: formData.age.trim(),
        position: formData.position.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        comments: formData.comments,
        pdfUrl: uploaded.url,
      });

      if (!result.ok) {
        setSubmitError(result.message);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : CAREERS_TEXTS.submitFailedError;
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setSubmitted(false);
    setFileError(null);
    setSubmitError(null);
    setFieldErrors({});
  };

  return {
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
    handleSelectPosition,
    handleSubmit,
    handleReset,
  };
}
