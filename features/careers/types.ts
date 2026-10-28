export interface JobPosition {
  id: string;
  title: string;
  department: string;
  ageRange: string;
  schedule: string;
  location: string;
  description: string;
  requirements: string[];
}

export interface JobApplicationFormData {
  fullName: string;
  age: string;
  position: string;
  email: string;
  phone: string;
  cvFile: File | null;
  comments: string;
}
