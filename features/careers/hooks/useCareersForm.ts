"use client";

import { useState } from "react";
import { JobApplicationFormData } from "../types";
import { HR_EMAIL } from "../constants";

const INITIAL_FORM_DATA: JobApplicationFormData = {
  fullName: "",
  age: "",
  position: "",
  email: "",
  phone: "",
  cvFile: null,
  comments: "",
};

export function useCareersForm() {
  const [formData, setFormData] = useState<JobApplicationFormData>(INITIAL_FORM_DATA);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0] || null;
    if (!file) {
      setFormData((prev) => ({ ...prev, cvFile: null }));
      return;
    }

    const validExtensions = [".pdf", ".doc", ".docx"];
    const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setFileError("Por favor selecciona un archivo PDF o Word (.pdf, .doc, .docx).");
      setFormData((prev) => ({ ...prev, cvFile: null }));
      return;
    }

    const maxSizeBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeBytes) {
      setFileError("El archivo supera el límite de 10MB.");
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
    if (!formData.fullName || !formData.age || !formData.position || !formData.email || !formData.phone) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }

    setSubmitting(true);

    // Build mailto link with encoded subject and body for HR email
    const subject = encodeURIComponent(
      `Postulación Laboral: ${formData.position} - ${formData.fullName}`
    );
    const body = encodeURIComponent(
      `Hola equipo de Recursos Humanos de Pastelería Lilian,\n\n` +
        `Deseo postularme a la plaza vacante de "${formData.position}". A continuación comparto mis datos:\n\n` +
        `• Nombre Completo: ${formData.fullName}\n` +
        `• Edad: ${formData.age} años\n` +
        `• Puesto al que aplico: ${formData.position}\n` +
        `• Teléfono / WhatsApp: ${formData.phone}\n` +
        `• Correo Electrónico: ${formData.email}\n` +
        (formData.comments ? `• Mensaje / Experiencia previa: ${formData.comments}\n` : "") +
        (formData.cvFile ? `• Archivo de CV adjunto: ${formData.cvFile.name}\n` : "") +
        `\n(Nota: Adjunto mi documento de Hoja de Vida/CV a este mensaje).\n\n` +
        `Saludos cordiales,\n${formData.fullName}`
    );

    const generatedMailto = `mailto:${HR_EMAIL}?subject=${subject}&body=${body}`;
    setMailtoUrl(generatedMailto);

    // Small delay to simulate processing feedback
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setSubmitted(false);
    setFileError(null);
    setMailtoUrl("");
  };

  return {
    formData,
    fileError,
    submitting,
    submitted,
    mailtoUrl,
    handleInputChange,
    handleFileChange,
    handleRemoveFile,
    handleSelectPosition,
    handleSubmit,
    handleReset,
  };
}
