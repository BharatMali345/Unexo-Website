export interface Job {
  jobId: string;
  jobTitle: string;
  companyName: string;
  expYears: string;
  salary: string;
  jobLocation: string;
  openings: string;
  appliedApplicants: string;
  maxApplicants: string;
  applicantResponsibilities: string;
  skillRequirements: string;
  role: string;
  industryType: string;
  functionalArea: string;
  employmentType: string;
  underGraduate: string;
  postGraduate: string;
  aboutCompany: string;
  websiteCompany: string;
  postedAt: string;
  updatedAt: string;
  isApplied: boolean;
  keySkills: skills[];
}
export interface skills {
  skills: string;
}

