import React, { useState } from 'react';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      category: 'General',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-0 text-textPrimary">
      <SEO
        title="Contact Us"
        description="Get in touch with the 2026-27 College Union of Government Engineering College Palakkad. Reach office bearers, view location, or submit feedback."
      />

      {/* Hero Section */}
      <section className="bg-surface py-16 md:py-20 text-center select-none border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-navy tracking-tight leading-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-textSecondary font-body max-w-xl mx-auto">
            Have questions, feedback, or complaints? Reach out to the College Union office or get in touch directly with our officers.
          </p>
        </div>
      </section>

      {/* Two-Column Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column: Office Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-navy mb-6">
                  Office Location & Details
                </h2>
                <div className="bg-card border border-border p-6 rounded-card shadow-3xs space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-navy/5 text-navy rounded-button">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-body font-bold text-navy text-sm">College Union Office</h3>
                      <p className="text-textSecondary text-xs sm:text-sm mt-1 leading-relaxed">
                        Amenity Center, Government Engineering College, Palakkad<br />
                        Sreekrishnapuram, Palakkad District, Kerala, India - 678633
                      </p>
                    </div>
                  </div>

                  {/* Google Maps Link */}
                  <div className="pl-14">
                    <a
                      href="https://maps.google.com/?q=Government+Engineering+College,+Palakkad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs sm:text-sm font-semibold text-crimson hover:underline"
                    >
                      <span>View on Google Maps</span>
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>

                  <hr className="border-border" />

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-navy/5 text-navy rounded-button">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-body font-bold text-navy text-xs">Email</h4>
                        <a href="mailto:union@gecpalakkad.ac.in" className="text-textSecondary text-xs sm:text-sm hover:text-crimson transition-colors block mt-0.5">
                          union@gecpalakkad.ac.in
                        </a>
                      </div>
                    </div>

                    {/* Office Hours */}
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-navy/5 text-navy rounded-button">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-body font-bold text-navy text-xs">Office Hours</h4>
                        <p className="text-textSecondary text-xs sm:text-sm mt-0.5 leading-relaxed">
                          Monday – Friday<br />
                          9:00 AM – 5:00 PM
                        </p>
                      </div>
                    </div>
                  </div>

                  <hr className="border-border" />

                  {/* Social links */}
                  <div className="flex items-center space-x-4">
                    <span className="font-body text-navy text-xs font-semibold">Social Channels:</span>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-textSecondary hover:text-crimson transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-textSecondary hover:text-navy transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-navy mb-6">
                  Send a Message
                </h2>
                <div className="bg-card border border-border p-6 sm:p-8 rounded-card shadow-3xs">
                  {isSubmitted ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-200">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="font-body font-bold text-navy text-base">Message Sent Successfully</h3>
                      <p className="text-textSecondary text-sm max-w-sm mx-auto">
                        Message received. We'll respond within 2 working days.
                      </p>
                      <div className="pt-4">
                        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                          Send Another Message
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 font-body">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-navy mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-border bg-white rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-crimson focus:border-crimson"
                          placeholder="Your full name"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-navy mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-border bg-white rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-crimson focus:border-crimson"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label htmlFor="category" className="block text-xs font-semibold text-navy mb-1.5">
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-border bg-white rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-crimson focus:border-crimson"
                        >
                          <option value="General">General Query</option>
                          <option value="Complaint">Complaint</option>
                          <option value="Event Query">Event Query</option>
                          <option value="Media">Media Inquiry</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-xs font-semibold text-navy mb-1.5">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-4 py-2 border border-border bg-white rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-crimson focus:border-crimson resize-none"
                          placeholder="Write your message here..."
                        />
                      </div>

                      {/* Submit */}
                      <div>
                        <Button type="submit" variant="secondary" fullWidth={true}>
                          Submit Message
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section className="py-16 md:py-20 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-navy mb-8 text-center">
            Emergency & Quick Help Contacts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Contact 1 */}
            <div className="bg-white border border-border p-6 rounded-card flex flex-col justify-between items-center text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-crimson/5 text-crimson flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="font-body font-bold text-navy text-sm sm:text-base">Union Chairperson</h3>
                <p className="text-textSecondary text-xs">For general representations & core concerns</p>
              </div>
              <a href="tel:+919876543210" className="text-crimson font-body font-bold text-xs sm:text-sm hover:underline">
                +91 98765 43210
              </a>
            </div>

            {/* Contact 2 */}
            <div className="bg-white border border-border p-6 rounded-card flex flex-col justify-between items-center text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-navy/5 text-navy flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="font-body font-bold text-navy text-sm sm:text-base">College Office Help Desk</h3>
                <p className="text-textSecondary text-xs">For academic files & certificates</p>
              </div>
              <a href="tel:+914662260350" className="text-navy font-body font-bold text-xs sm:text-sm hover:underline">
                +91 466 2260350
              </a>
            </div>

            {/* Contact 3 */}
            <div className="bg-white border border-border p-6 rounded-card flex flex-col justify-between items-center text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-crimson/5 text-crimson flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="font-body font-bold text-navy text-sm sm:text-base">Student Grievance Cell</h3>
                <p className="text-textSecondary text-xs">For formal complaints & support cell</p>
              </div>
              <a href="tel:+919876543211" className="text-crimson font-body font-bold text-xs sm:text-sm hover:underline">
                +91 98765 43211
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
