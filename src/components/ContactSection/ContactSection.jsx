import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    console.log("Form Data:", formData); // Debugging

    // Update emailjs to include the new fields
    emailjs
      .send(
        "service_i21yhf3", // Replace with your Service ID
        "template_8drbwsk", // Replace with your Template ID
        {
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`, // Combine first and last name for compatibility
        },
        "Vj-41okr5iEf2JbN5" // Replace with your public key
      )
      .then(
        (response) => {
          console.log("EmailJS Response:", response); // Debugging
          alert("Message sent successfully!");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
          });
        },
        (error) => {
          console.error("EmailJS Error:", error); // Debugging
          alert("Failed to send message. Please try again later.");
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="pt-[96px] max-sm:pt-[40px]">
      <div className="bg-black text-white py-16 max-sm:py-[30px]">
        <div className="custom-container mx-auto max-w-[1440px] px-[20px] text-center">
          <div className="text-center">
            <p className="hero-heading font-bold text-[40px] leading-[50px] max-md:text-[27px] max-md:leading-[37px]">
              Contact Me
            </p>
            <p className="parallex-desc max-w-[670px] mx-auto py-[21px] max-md:py-[15px] font-medium font-normal text-[18px] leading-[27px] text-[#ffffff] max-xxsm:text-[16px]">
              If you'd like to get in touch, send me your details via email, and
              I'll connect with you. Thank you for reaching out!
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-[770px] mx-auto"
          >
            {/* First row: First Name, Last Name, Phone */}
            <div className="flex max-sm:flex-col flex-row gap-4 justify-center items-center">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="max-sm:w-full flex-1 w-[250px] font-medium text-[18px] leading-[30px] px-[24px] py-[10px] border border-[#777777] rounded-[8px] bg-white text-black outline-none"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="max-sm:w-full flex-1 w-[250px] font-medium text-[18px] leading-[30px] px-[24px] py-[10px] border border-[#777777] rounded-[8px] bg-white text-black outline-none"
                required
              />
            </div>

            <div className="flex max-sm:flex-col flex-row gap-4 justify-center items-center">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="max-sm:w-full flex-1 w-[250px] font-medium text-[18px] leading-[30px] px-[24px] py-[10px] border border-[#777777] rounded-[8px] bg-white text-black outline-none"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="max-sm:w-full flex-1 w-[250px] font-medium text-[18px] leading-[30px] px-[24px] py-[10px] border border-[#777777] rounded-[8px] bg-white text-black outline-none"
                required
              />
            </div>

            {/* Third row: Message */}
            <div className="flex max-sm:flex-col flex-row gap-4 justify-center items-center">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full font-medium text-[18px] leading-[30px] px-[24px] py-[10px] border border-[#777777] rounded-[8px] bg-white text-black outline-none"
                rows="4"
                required
              />
            </div>

            {/* Fourth row: Submit Button */}
            <div className="flex justify-center mt-2">
              <button
                type="submit"
                disabled={isSending}
                className="w-full max-w-[250px] cursor-pointer rounded-[8px] bg-transparent border border-[#ffffff] text-white font-medium text-[18px] leading-[30px] px-[24px] py-[10px]"
              >
                <p className="btn-default-txt">
                  {isSending ? "Sending..." : "Send"}
                </p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
