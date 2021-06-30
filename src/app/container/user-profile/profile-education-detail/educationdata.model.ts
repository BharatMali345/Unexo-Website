export interface EducationData {
  highestQualification: string;
  course: string;
  school: string;
  specialization: string;
  passingYear: string;
  marks: string;

  academicAchievements: achievements[];
}
export interface achievements {
  achievements: string;
}
