// export interface User {
//   name?: string;
//   email?: string;
//   mobile?: string;
//   profilePic?: string;
//   role?: "student" | "mentor" | "admin";
//   experience?: string;
//   techStack?: string[]; // ✅ THIS IS THE CORRECT TYPE
//   schedules?: string[];
//   coursesEnrolled?: string[];
// }

// src/types/User.ts
export interface User {
  name?: string;
  email?: string;
  mobile?: string;
  profilePic?: string;
  role?: "student" | "mentor" | "admin";
  experience?: string;
  techStack?: string[]; // MUST be an array, not a string
  schedules?: string[];
  coursesEnrolled?: string[];
  token?: string;
}
