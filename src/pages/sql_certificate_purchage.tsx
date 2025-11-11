import { motion } from "framer-motion";
import { useState } from "react";

export default function SQLCertificatePage() {
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [coupon, setCoupon] = useState("");
  const [price, setPrice] = useState(499); // base price
  const [discountApplied, setDiscountApplied] = useState(false);

  // Email verify button click
  const handleSendOTP = () => {
    if (!email) {
      alert("Please enter your email first!");
      return;
    }
    setOtpSent(true);
    alert(`OTP sent to ${email}`); // Yaha backend API call kar sakte ho
  };

  // Verify OTP button click
  const handleVerifyOTP = () => {
    if (otp === "1234") { // example OTP
      setIsEmailVerified(true);
      setOtpSent(false); // OTP field hide
      alert("Email verified successfully ✅");
    } else {
      alert("Invalid OTP ❌");
    }
  };

  // Coupon apply button
  const handleApplyCoupon = () => {
    if (!coupon) {
      alert("Please enter a coupon code!");
      return;
    }
    if (coupon.toLowerCase() === "sql50" && !discountApplied) {
      setPrice(price - 50);
      setDiscountApplied(true);
      alert("Coupon applied! ₹50 discount ✅");
    } else if (discountApplied) {
      alert("Coupon already applied!");
    } else {
      alert("Invalid coupon ❌");
    }
  };

  // const handlePayNow = () => {
  //   if (!isEmailVerified) {
  //     alert("Please verify your email before payment!");
  //     return;
  //   }
  //   alert(
  //     `Payment started for:\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nCoupon: ${coupon}\nFinal Price: ₹${price}`
  //   );
  // };
  const handlePayNow = async () => {
    if (!isEmailVerified) {
      alert("Please verify your email before payment!");
      return;
    }
  
    const orderData = { name, email, mobile, coupon, price };
  
    try {
      const response = await fetch("/api/certificate-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Payment page open (popup ya redirect)
        window.location.href = data.paymentUrl; // simple redirect
        // Agar payment gateway popup required:
        // window.open(data.paymentUrl, "_blank", "width=500,height=700");
      } else {
        alert("Something went wrong, try again!");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving data!");
    }
  };
  

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] flex flex-col md:flex-row items-center justify-center p-8">
      {/* Left side - Certificate Image */}
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <motion.img
          src="/src/assets/sql_certificate.jpeg"
          alt="SQL Certificate"
          className="rounded-2xl shadow-lg max-w-md w-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">
          Get Your SQL Certificate
        </h2>

        {/* Email field */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Enter Your Email Address:
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul@gmail.com"
              className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            />
            <button
              onClick={handleSendOTP}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Verify
            </button>
          </div>

          {/* OTP input appears only after clicking Verify */}
          {otpSent && (
            <div className="mt-3">
              <label className="block text-sm font-semibold mb-2">
                Enter OTP:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                />
                <button
                  onClick={handleVerifyOTP}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Field */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Enter Your Mobile Number:
          </label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="e.g. 976543210"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Name field */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Enter Name which you want to print on the certificate:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Coupon field */}
        <div>
          <label className="block text-sm font-semibold mb-2">Apply Coupon</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
            >
              Add
            </button>
          </div>
        </div>

        {/* Price display */}
        <div className="text-lg font-semibold text-center">
          Final Price: <span className="text-orange-500">₹{price}</span>
        </div>

        {/* Pay Now button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handlePayNow}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Pay Now
        </motion.button>
      </div>
    </div>
  );
}
