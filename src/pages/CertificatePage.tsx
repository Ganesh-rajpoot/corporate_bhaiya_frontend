import { useState } from "react";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

type Certificate = {
  name:string;
  registration_number: string;
  certificate_name: string;
  issuing_organization: string;
  issue_date: string;
  certificate_url: string;
  is_verified: boolean;
  verified_at: string;
  remarks: string;
};

const certificateUrl = `${
  import.meta.env.VITE_SERVER_URL
}/api/verify-certificate/?registration_number=`;
const CertificateVerification = () => {
  const [regNumber, setRegNumber] = useState("");
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!regNumber.trim()) {
      toast.error("Enter a registration number first!");
      return;
    }

    setLoading(true);
    setCertificate(null);

    try {
      const response = await fetch(`${certificateUrl}${regNumber}`);

      if (!response.ok) {
        throw new Error("Certificate not found or error occurred.");
      }

      const data = await response.json();
      setCertificate(data);
      toast.success("Certificate found!");
    } catch (error: any) {
      toast.error("No certificate found!", error);
    } finally {
      setLoading(false);
    }
  };

  //   const handleDownload = async () => {
  //     if (!certificate?.certificate_url) {
  //       toast.error("Download link not available.");
  //       return;
  //     }

  //     try {
  //       const response = await fetch(certificate.certificate_url);
  //       const blob = await response.blob();

  //       const url = window.URL.createObjectURL(blob);
  //       console.log(url, "url");

  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = `${certificate.registration_number}.png`; // You could also use .pdf or .jpg based on filetype
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //       window.URL.revokeObjectURL(url);
  //     } catch (err) {
  //       toast.error("Download failed.");
  //     }
  //   };

  //   const handleView = () => {
  //     if (certificate?.certificate_url) {
  //       window.open(certificate.certificate_url, "_blank");
  //     } else {
  //       toast.error("View link not available.");
  //     }
  //   };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Certificate Verification
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          placeholder="Enter Registration Number"
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-black dark:text-white"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl transition-all duration-200 disabled:opacity-60"
        >
          <Search size={18} />
          {loading ? "Searching..." : "Verify"}
        </button>
      </div>

      {certificate && (
        <div className="mt-8 p-6 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-zinc-800 space-y-4">
          <p>
            <strong>Student Name:</strong> {certificate.name}
          </p>
          <p>
            <strong>Registration No:</strong> {certificate.registration_number}
          </p>
          <p>
            <strong>Certificate:</strong> {certificate.certificate_name}
          </p>
          <p>
            <strong>Issued By:</strong> {certificate.issuing_organization}
          </p>
          <p>
            <strong>Issue Date:</strong>{" "}
            {new Date(certificate.issue_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong>
            <span
              className={`ml-2 px-2 py-1 rounded-full text-sm font-semibold 
              ${
                certificate.is_verified
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {certificate.is_verified ? "Verified" : "Unverified"}
            </span>
          </p>
          <p>
            <strong>Remarks:</strong> {certificate.remarks}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            {/* <button
              onClick={handleView}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-semibold transition-all duration-200"
            >
              <Eye size={18} />
              View Certificate
            </button> */}

            {/* <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold transition-all duration-200"
            >
              <Download size={18} />
              Download Certificate
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateVerification;
