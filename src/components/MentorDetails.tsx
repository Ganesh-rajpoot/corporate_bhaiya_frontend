import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { MentorData } from "./TiltCard";

type Slot = {
  date: string;
  times: { time: string; seats: number }[];
};

const MentorDetail = () => {
  const { mentorSlug: paramIdOrSlug } = useParams();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState<MentorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // helper: turn name into a URL slug
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        let actualId = paramIdOrSlug;

        // Step 1: Check if param is NOT numeric/UUID -> treat it as a slug
        if (isNaN(Number(paramIdOrSlug))) {
          const resAll = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/mentors/public`
          );
          if (!resAll.ok) throw new Error("Failed to fetch mentors list");
          const allMentors: MentorData[] = await resAll.json();

          const matched = allMentors.find(
            (m) => slugify(m.name) === paramIdOrSlug
          );
          if (!matched) throw new Error("Mentor not found from slug");
          actualId = String(matched.id);
        }

        // Step 2: Now fetch detail using the real ID

        // console.log(`${actualId} is mentorId`);

        const resDetail = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/mentor/${actualId}`
        );
        if (!resDetail.ok) throw new Error("Mentor not found");

        const data = await resDetail.json();
        setMentor(data);

        // Step 3: Generate dummy slots (same as before)
        const today = new Date();
        const generatedSlots: Slot[] = Array.from({ length: 7 }).map((_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const dateStr = date.toISOString().split("T")[0];
          return {
            date: dateStr,
            times: ["10:00 AM", "2:00 PM", "6:00 PM"]
              .filter(() => Math.random() > 0.3)
              .map((time) => ({
                time,
                seats: Math.floor(Math.random() * 10) + 1,
              })),
          };
        });

        setSlots(generatedSlots);
        setSelectedDate(generatedSlots[0]?.date || "");
      } catch (err) {
        console.error("Error fetching mentor:", err);
        setMentor(null);
      } finally {
        setLoading(false);
      }
    };
    console.log(`Async called data ${paramIdOrSlug}`);

    if (paramIdOrSlug) {
      fetchMentor();
    }
  }, [paramIdOrSlug]);

  const handleBookSlot = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time slot first!");
      return;
    }
    alert(
      `Slot booked with ${mentor?.name} on ${selectedDate} at ${selectedTime}`
    );
  };

  if (!mentor && !loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center text-red-600">
        <h2 className="text-3xl font-bold mb-4">Mentor Not Found 😵‍💫</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6 bg-[var(--brand-bg)] text-[var(--brand-text)]">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-orange-500 hover:underline flex items-center gap-1"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {!loading && mentor && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Mentor Image */}
          <div className="max-w-md w-full mx-auto">
            <img
              src={mentor?.image}
              alt={mentor?.name}
              className="rounded-2xl shadow-lg border-2 border-orange-500"
            />
          </div>

          {/* Right: Mentor Details */}
          <div>
            <h1 className="text-4xl font-bold text-orange-500 mb-2">
              {mentor.name}
            </h1>
            <h2 className="text-xl mb-2">{mentor.role}</h2>
            <p className="text-sm mb-4">
              {mentor.experience} at {mentor.company}
            </p>
            <p className="text-md mb-6">{mentor.bio}</p>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                🧠 Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {mentor?.skills?.map((skill, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1 rounded-full text-sm cursor-pointer bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Courses */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">📚 Courses Offered</h3>
              <ul className="list-disc list-inside space-y-1">
                {mentor?.courses?.map((course, idx) => (
                  <li key={idx}>{course}</li>
                ))}
              </ul>
            </div>

            {/* Availability & Booking */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">📅 Book a Slot</h3>

              {/* Date Selector */}
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {slots.map((slot) => (
                  <button
                    key={slot.date}
                    onClick={() => {
                      setSelectedDate(slot.date);
                      setSelectedTime("");
                    }}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedDate === slot.date
                        ? "bg-orange-500 text-white"
                        : "bg-white dark:bg-slate-800"
                    }`}
                  >
                    {new Date(slot.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </button>
                ))}
              </div>

              {/* Time Slots */}
              <div className="flex flex-wrap gap-2">
                {slots
                  .find((s) => s.date === selectedDate)
                  ?.times.map(({ time, seats }) => {
                    const isLowSeats = seats <= 3;
                    return (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-2 rounded-lg border flex flex-col items-center ${
                          selectedTime === time
                            ? "bg-orange-500 text-white"
                            : "bg-white dark:bg-slate-800"
                        }`}
                      >
                        <span>{time}</span>
                        <span
                          className={`text-xs mt-1 ${
                            isLowSeats
                              ? "text-red-500 font-bold"
                              : "text-gray-500"
                          }`}
                        >
                          {seats} seats
                          {isLowSeats ? " 🔥 Hurry!" : ""}
                        </span>
                      </button>
                    );
                  })}
              </div>

              <button
                onClick={handleBookSlot}
                className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Book Selected Slot
              </button>
            </div>

            {/* LinkedIn */}
            <a
              href={mentor?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4"
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                Connect on LinkedIn
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDetail;
