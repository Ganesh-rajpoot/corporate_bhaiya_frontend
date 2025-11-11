// src/components/EditProfileForm.tsx
import { useState, useRef, ChangeEvent } from "react";
import { User } from "../types/User";
interface EditProfileFormProps {
  user: User;
  onCancel: () => void;
}
const EditProfileForm: React.FC<EditProfileFormProps> = ({
  user,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    fullName: user.name || "",
    email: user.email || "",
    phone: user.mobile || "",
    role: user.role || "student",
    experience: user.experience || "",
    techStack: (user.techStack || []).join(", "),
  });
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Next step: Dispatch Redux action or send to API
    console.log({ ...formData, profilePic });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        Edit Profile
      </h2>

      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24">
          <img
            src={preview || "/placeholder-avatar.png"}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-orange-500 text-white px-2 py-1 text-xs rounded-full shadow hover:bg-orange-600"
          >
            Change
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="input-fx"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input-fx"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="input-fx"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="input-fx"
        >
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
        </select>

        {formData.role === "mentor" && (
          <>
            <input
              type="text"
              name="experience"
              placeholder="Years of Experience"
              value={formData.experience}
              onChange={handleChange}
              className="input-fx"
            />
            <input
              type="text"
              name="techStack"
              placeholder="Tech Stack (comma separated)"
              value={formData.techStack}
              onChange={handleChange}
              className="input-fx"
            />
          </>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full transition"
      >
        Save Changes
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="w-full border border-orange-500 text-orange-500 font-semibold py-2 px-4 rounded-full hover:bg-orange-100 transition"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditProfileForm;

// src/components/EditProfileForm.tsx
// import { useState, useRef, ChangeEvent } from "react";
// import { User } from "../types/User";
// import axiosInstance from "../api/axiosInstance"; // ✅ use auto-refresh axios

// const mentorUrl = `api/mentor/full-profile/`;
// const studentUrl = `api/student/full-profile/`;

// interface EditProfileFormProps {
//   user: User;
//   onCancel: () => void;
// }

// const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, onCancel }) => {
//   const [formData, setFormData] = useState({
//     fullName: user.name || "",
//     email: user.email || "",
//     phone: user.mobile || "",
//     role: user.role || "student",

//     // Student-specific
//     college: user.college || "",
//     interests: user.interests || "",

//     // Mentor-specific
//     bio: user.bio || "",
//     experience: user.experience || "",
//     techStack: (user.techStack || []).join(", "),
//     availableDays: user.availableDays || "",
//   });

//   const [profilePic, setProfilePic] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(user.profilePic || null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setProfilePic(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setPreview(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const endpoint = formData.role === "mentor" ? mentorUrl : studentUrl;

//       // ✅ FormData for file + JSON
//       const payload = new FormData();

//       // Common user data
//       payload.append(
//         "user",
//         JSON.stringify({
//           name: formData.fullName,
//           email: formData.email,
//           mobile: formData.phone,
//         })
//       );

//       // Role-specific data
//       if (formData.role === "mentor") {
//         payload.append(
//           "profile",
//           JSON.stringify({
//             bio: formData.bio,
//             experience: formData.experience,
//             skills: formData.techStack,
//             available_days: formData.availableDays,
//           })
//         );
//       } else {
//         payload.append(
//           "profile",
//           JSON.stringify({
//             college: formData.college,
//             interests: formData.interests,
//           })
//         );
//       }

//       if (profilePic) {
//         payload.append("profile_pic", profilePic); // ✅ backend should accept this field
//       }

//       const res = await axiosInstance.put(endpoint, payload, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("Profile updated:", res.data);
//       // TODO: show success toast or redirect
//     } catch (error: any) {
//       console.error("Error updating profile:", error.response?.data || error);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-6 max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md"
//     >
//       <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
//         Edit Profile
//       </h2>

//       {/* Profile picture */}
//       <div className="flex items-center gap-6">
//         <div className="relative w-24 h-24">
//           <img
//             src={preview || "/placeholder-avatar.png"}
//             alt="Profile Preview"
//             className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
//           />
//           <button
//             type="button"
//             onClick={() => fileInputRef.current?.click()}
//             className="absolute bottom-0 right-0 bg-orange-500 text-white px-2 py-1 text-xs rounded-full shadow hover:bg-orange-600"
//           >
//             Change
//           </button>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             ref={fileInputRef}
//             className="hidden"
//           />
//         </div>
//       </div>

//       {/* Common fields */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Full Name"
//           value={formData.fullName}
//           onChange={handleChange}
//           className="input-fx"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="input-fx"
//         />
//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone"
//           value={formData.phone}
//           onChange={handleChange}
//           className="input-fx"
//         />

//         {/* Role dropdown (disabled) */}
//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           className="input-fx"
//           disabled
//         >
//           <option value="student">Student</option>
//           <option value="mentor">Mentor</option>
//         </select>
//       </div>

//       {/* Role-specific fields */}
//       {formData.role === "mentor" ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <textarea
//             name="bio"
//             placeholder="Bio"
//             value={formData.bio}
//             onChange={handleChange}
//             className="input-fx col-span-2"
//           />
//           <input
//             type="text"
//             name="experience"
//             placeholder="Years of Experience"
//             value={formData.experience}
//             onChange={handleChange}
//             className="input-fx"
//           />
//           <input
//             type="text"
//             name="techStack"
//             placeholder="Skills (comma separated)"
//             value={formData.techStack}
//             onChange={handleChange}
//             className="input-fx"
//           />
//           <input
//             type="text"
//             name="availableDays"
//             placeholder="Available Days (e.g., Mon-Fri)"
//             value={formData.availableDays}
//             onChange={handleChange}
//             className="input-fx"
//           />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="college"
//             placeholder="College"
//             value={formData.college}
//             onChange={handleChange}
//             className="input-fx"
//           />
//           <input
//             type="text"
//             name="interests"
//             placeholder="Interests"
//             value={formData.interests}
//             onChange={handleChange}
//             className="input-fx"
//           />
//         </div>
//       )}

//       {/* Buttons */}
//       <button
//         type="submit"
//         className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full transition"
//       >
//         Save Changes
//       </button>
//       <button
//         type="button"
//         onClick={onCancel}
//         className="w-full border border-orange-500 text-orange-500 font-semibold py-2 px-4 rounded-full hover:bg-orange-100 transition"
//       >
//         Cancel
//       </button>
//     </form>
//   );
// };

// export default EditProfileForm;
