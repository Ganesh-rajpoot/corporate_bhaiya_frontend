import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import GodHeader from "../components/GodHeader";
import toast from "react-hot-toast";

const registerUrl = `${import.meta.env.VITE_SERVER_URL}/api/register`;

function Signup() {
  const [role, setRole] = useState<"student" | "mentor">("student");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    bio: "",
    experience: "",
    goals: "",
    linkedin: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (newRole: "student" | "mentor") => {
    setRole(newRole);
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   await fetch(endpoint, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   });
  //   console.log("Submitted form data:", formData);
  //   // TODO: Hook into your API here
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!consentGiven) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    const registerEndpointServer =
      role === "mentor" ? `${registerUrl}/mentor/` : `${registerUrl}/student/`;

    const payload = {
      name: formData.name,
      email: formData.email,
      user_role: role,
      mobile: formData.mobile,
      password: formData.password,
      bio: formData.bio,
      experience: formData.experience,
      goals: formData.goals,
      linkdinUrl: formData.linkedin,
    };

    try {
      // 📝 Register the user
      const registerRes = await fetch(registerEndpointServer, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        throw new Error(registerData.message || "Registration failed");
      }

      toast.success("🎉 Registered successfully!");

      navigate("/login");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      console.error("❌ Error during registration/login:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white dark:bg-gray-900 transition-all">
      <GodHeader title="Create Account " />

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => handleRoleChange("student")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            role === "student"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          Student
        </button>
        <button
          onClick={() => handleRoleChange("mentor")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            role === "mentor"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          Mentor
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
            Contact Number
          </label>
          <input
            type="tel"
            maxLength={10}
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        

        <div className="relative">
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <span
            className="absolute top-[38px] right-3 cursor-pointer text-gray-600 dark:text-gray-300"
            onClick={togglePassword}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <div className="relative">
          <label className="block text-zinc-700 dark:text-zinc-300 mb-1">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white pr-10"
          />
          <span
            className="absolute top-[38px] right-3 cursor-pointer text-gray-600 dark:text-gray-300"
            onClick={toggleConfirmPassword}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {/* Role-specific fields */}
        {role === "mentor" ? (
          <>
            <div>
              <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
            LinkedIn Profile
          </label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/your-profile"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                Experience
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 5+ years in Data Science"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              {/* <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                Your Goals
              </label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                rows={3}
                placeholder="Why are you joining this platform?"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              /> */}
            </div>
          </>
        )}

        <div className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            id="consent"
            checked={consentGiven}
            onChange={() => setConsentGiven(!consentGiven)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
          <label
            htmlFor="consent"
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            I agree to the Terms and Conditions
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 px-6 mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
        >
          Register as {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
      </form>
    </div>
  );
}

export default Signup;
