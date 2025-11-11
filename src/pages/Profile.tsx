// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "../components/ProfileCard";

// const UserProfile = () => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const [role, setRole] = useState<"student" | "mentor" | null>(null);

//   useEffect(() => {
//     if (user?.role) {
//       setRole(user.role);
//     }
//   }, [user]);

//   if (!user) {
//     return <div className="text-center text-lg">User not logged in.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto py-12 px-4">
//       <motion.h2
//         className="text-3xl font-bold mb-8 text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         Welcome, {user.name || "User"}!
//       </motion.h2>

//       <Card className="shadow-md">
//         <CardContent className="grid md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="text-xl font-semibold mb-2">Basic Info</h3>
//             <p>
//               <strong>Email:</strong> {user.email}
//             </p>
//             <p>
//               <strong>Phone:</strong> {user.phone || "N/A"}
//             </p>
//             <p>
//               <strong>Role:</strong> {user.role}
//             </p>
//             {role === "mentor" && (
//               <>
//                 <p>
//                   <strong>Experience:</strong> {user.experience || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Tech Stack:</strong>{" "}
//                   {user.techStack?.join(", ") || "N/A"}
//                 </p>
//               </>
//             )}
//             {role === "student" && (
//               <>
//                 <p>
//                   <strong>College:</strong> {user.college || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Degree:</strong> {user.degree || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Year:</strong> {user.year || "N/A"}
//                 </p>
//               </>
//             )}
//           </div>

//           <div>
//             {role === "mentor" ? (
//               <>
//                 <h3 className="text-xl font-semibold mb-2">Schedules</h3>
//                 {user.schedules?.length ? (
//                   <ul className="list-disc list-inside">
//                     {user.schedules.map((s: any, i: number) => (
//                       <li key={i}>
//                         {s.course} - {s.time}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No active schedules.</p>
//                 )}
//               </>
//             ) : (
//               <>
//                 <h3 className="text-xl font-semibold mb-2">Courses Enrolled</h3>
//                 {user.courses?.length ? (
//                   <ul className="list-disc list-inside">
//                     {user.courses.map((course: string, i: number) => (
//                       <li key={i}>{course}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>Not enrolled in any course yet.</p>
//                 )}
//               </>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default UserProfile;

// src/pages/UserProfile.tsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import placeholder from "../assets/mentor2.jpg";
import { motion } from "framer-motion";
import EditProfileForm from "./EditProfile";
import toast from "react-hot-toast";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  if (!user)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        Loading profile...
      </p>
    );

  const {
    name,
    email,
    mobile,
    profilePic,
    role, // "student" | "mentor"
    experience,
    techStack,
    schedules,
    coursesEnrolled,
  } = user;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={profilePic || placeholder}
          alt={name}
          className="w-24 h-24 rounded-full object-cover border-2 border-orange-500 shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {role?.toUpperCase() || "69"}
          </p>
        </div>
        <button
          onClick={() => {
            dispatch(logout());
            localStorage.clear();
            toast.success("Logged out 👋");
            navigate("/");
          }}
          className="ml-auto px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
        >
          Logout
        </button>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="ml-auto px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {!isEditing ? (
        <motion.div
          className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Mobile:</strong> {mobile}
          </p>

          {role === "student" && (
            <div>
              <h3 className="text-lg font-semibold mt-4">Courses Enrolled</h3>
              <ul className="list-disc ml-6 mt-2">
                {Array.isArray(coursesEnrolled) &&
                coursesEnrolled.length > 0 ? (
                  coursesEnrolled.map((course: string, idx: number) => (
                    <li key={idx}>{course}</li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No courses enrolled yet.
                  </p>
                )}
              </ul>
            </div>
          )}

          {role === "mentor" && (
            <>
              <p>
                <strong>Experience:</strong> {experience} years
              </p>
              <p>
                <strong>Tech Stack:</strong> {techStack?.join(", ")}
              </p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Upcoming Schedules</h3>
                <ul className="list-disc ml-6 mt-2">
                  {Array.isArray(schedules) && schedules?.length > 0 ? (
                    schedules.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No upcoming sessions.
                    </p>
                  )}
                </ul>
              </div>
            </>
          )}
        </motion.div>
      ) : (
        <EditProfileForm user={user} onCancel={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default UserProfile;
