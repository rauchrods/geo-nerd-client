import { useState } from "react";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import Button from "../../components/ui/Button/Button";
import "./FeedbackPage.css";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

function FeedbackPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "Geo Nerd — Feedback / Suggestion",
          from_name: form.name || "Anonymous",
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <FaPaperPlane className="feedback-icon" />
        <h1 className="feedback-title">Feedback & Suggestions</h1>
        <p className="feedback-subtitle">
          Found a bug, have an idea, or just want to say hi? I&apos;d love to hear from you!
        </p>

        {status === "success" ? (
          <div className="feedback-success">
            <FaCheckCircle className="feedback-success__icon" />
            <p className="feedback-success__text">Thanks for your feedback!</p>
            <p className="feedback-success__sub">I&apos;ll get back to you if needed.</p>
            <Button variant="ghost" onClick={() => setStatus("idle")}>
              Send another
            </Button>
          </div>
        ) : (
          <form className="feedback-form" onSubmit={handleSubmit} noValidate>
            <div className="feedback-field">
              <label htmlFor="fb-name" className="feedback-label">Name <span className="feedback-optional">(optional)</span></label>
              <input
                id="fb-name"
                name="name"
                type="text"
                className="feedback-input"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            <div className="feedback-field">
              <label htmlFor="fb-email" className="feedback-label">Email <span className="feedback-optional">(optional)</span></label>
              <input
                id="fb-email"
                name="email"
                type="email"
                className="feedback-input"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="feedback-field">
              <label htmlFor="fb-message" className="feedback-label">Message <span className="feedback-required">*</span></label>
              <textarea
                id="fb-message"
                name="message"
                className="feedback-input feedback-textarea"
                placeholder="Your feedback or suggestion..."
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>

            {status === "error" && (
              <p className="feedback-error">Something went wrong. Please try again.</p>
            )}

            <Button
              variant="solid"
              type="submit"
              disabled={status === "loading" || !form.message.trim()}
              className="feedback-submit"
            >
              {status === "loading" ? "Sending…" : "Send Feedback"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default FeedbackPage;
