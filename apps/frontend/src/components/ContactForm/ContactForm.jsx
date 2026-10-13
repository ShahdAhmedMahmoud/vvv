import { useState } from "react";
import { Send } from "lucide-react";
import { useMarketing } from "../../features/marketing/MarketingProvider";

export default function ContactForm() {
  const { addInquiry } = useMarketing();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addInquiry(form);
    setForm({ fullName: "", email: "", phone: "", subject: "", message: "" });
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col gap-5 rounded-2xl border border-black/10 p-6 sm:p-8"
    >
      <div>
        <h3 className="mb-1 text-lg font-semibold text-black">Send a message</h3>
        <p className="text-sm text-[#3A3A3C]/70">
          Fill out the form and we'll get back to you promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-[#3A3A3C]/60">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={form.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-sm text-black outline-none transition focus:border-[#283A85] focus:ring-2 focus:ring-[#283A85]/10"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-[#3A3A3C]/60">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-sm text-black outline-none transition focus:border-[#283A85] focus:ring-2 focus:ring-[#283A85]/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-[#3A3A3C]/60">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+20 1xx xxx xxxx"
            className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-sm text-black outline-none transition focus:border-[#283A85] focus:ring-2 focus:ring-[#283A85]/10"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-[#3A3A3C]/60">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="What is this about?"
            className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-sm text-black outline-none transition focus:border-[#283A85] focus:ring-2 focus:ring-[#283A85]/10"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-[#3A3A3C]/60">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Type your message here"
          className="w-full flex-1 resize-none rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm text-black outline-none transition focus:border-[#283A85] focus:ring-2 focus:ring-[#283A85]/10"
        />
      </div>

      {sent && <p className="text-sm font-medium text-[#283A85]">تم إرسال الرسالة.</p>}
      <button
        type="submit"
        className="group inline-flex w-fit items-center gap-2 rounded-lg bg-[#283A85] px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(40,58,133,0.3)]"
      >
        Submit
        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}