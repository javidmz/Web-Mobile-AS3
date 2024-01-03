import { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [userEmail, setUserEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isMessageAcceptable, setIsMessageAcceptable] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = { userEmail, subject, message };

    if (isMessageAcceptable) {
      try {
        await fetch("http://localhost:5200/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage),
        });
      } catch (Err) {
        console.log("Try again");
      }
      setUserEmail('');
      setSubject('');
      setMessage('');
      setIsMessageAcceptable(false);
      toast.success("Message is sent!");
    }
  };

  const handleBlur = (e) => {
    setIsMessageAcceptable(e.target.value.length >= 8);
  };

  const inputBaseStyle = "w-full p-2 mt-2 border-b-2 outline-none";
  const focusStyle = "focus:border-blue-500";
  const normalStyle = "border-gray-300";

  return (
    <div className="h-screen bg-gradient-to-r from-red-900 to-black flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[425px] p-6 bg-white shadow-lg rounded"
      >
        <h2 className="text-2xl font-semibold mb-4">Contact me</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="abcde@xyz.com"
            value={userEmail}
            autoComplete="off"
            onChange={(e) => setUserEmail(e.target.value)}
            className={`${inputBaseStyle} ${normalStyle} ${focusStyle}`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Your Subject"
            value={subject}
            autoComplete="off"
            onChange={(e) => setSubject(e.target.value)}
            className={`${inputBaseStyle} ${normalStyle} ${focusStyle}`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700">
            Message
          </label>
          <textarea
            id="content"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={handleBlur}
            className={`w-full mt-2 h-16 p-2 outline-none border-2 border-gray-300 rounded focus:border-blue-500`}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
