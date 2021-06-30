export interface EmployerData {
  industryName: string;
  functionalArea: string;
  itSkills: string;
  shift: string;
  salary: string;
  joiningDate: string;
  endDate: string;
  jobType: string;
  designation: string;
  role: string;
  experience: string;
  languages: string;
  status: string;
  skillAbilities: mainabilities[];
  otherAbilities: otherabilities[];
}
export interface mainabilities {
  mainabilities: string;
}
export interface otherabilities {
  otherabilities: string;
}
