import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Mail, MessageSquare, Send, Phone, MapPin } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const popupRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // For Netlify forms
      const formData = new FormData(event.currentTarget);
      
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });
      
      // Show success popup
      setIsPopupVisible(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close popup
  const closePopup = (): void => {
    setIsPopupVisible(false);
  };

  // Handle escape key to close popup
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Escape') {
      closePopup();
    }
  };

  // Focus trap for popup
  useEffect(() => {
    if (isPopupVisible && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isPopupVisible]);

  // Event listener for Escape key
  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent): void => {
      if (e.key === 'Escape' && isPopupVisible) {
        closePopup();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isPopupVisible]);

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Let's Connect</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <a 
                href="mailto:info@ahmedshehab.tech"
                className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="Email me at info@ahmedshehab.tech"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                info@ahmedshehab.tech
              </a>
              <a 
                href="tel:+201274316669"
                className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="Call me at +201274316669"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                +201274316669
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5" aria-hidden="true" />
                Cairo, Egypt
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-medium">Connect with me</h4>
              <div className="flex gap-4">
                <a 
                  href="https://linkedin.com/in/ahmed-shehab-engineering"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                  aria-label="Visit my LinkedIn profile"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/AhmedShehab1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                  aria-label="Visit my GitHub profile"
                >
                  GitHub
                </a>
                <a 
                  href="https://leetcode.com/u/Ahmed_Abdelghafar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                  aria-label="Visit my LeetCode profile"
                >
                  LeetCode
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <form className="space-y-6" name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-white/5 border ${
                    formErrors.name ? 'border-red-400' : 'border-gray-600'
                  } rounded-lg focus:outline-none focus:border-blue-500`}
                  placeholder="Your name"
                  aria-required="true"
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                />
                {formErrors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-400">
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-white/5 border ${
                    formErrors.email ? 'border-red-400' : 'border-gray-600'
                  } rounded-lg focus:outline-none focus:border-blue-500`}
                  placeholder="your@email.com"
                  aria-required="true"
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                />
                {formErrors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-400">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-2 bg-white/5 border ${
                    formErrors.message ? 'border-red-400' : 'border-gray-600'
                  } rounded-lg focus:outline-none focus:border-blue-500`}
                  placeholder="What's on your mind?"
                  aria-required="true"
                  aria-invalid={!!formErrors.message}
                  aria-describedby={formErrors.message ? "message-error" : undefined}
                ></textarea>
                {formErrors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-400">
                    {formErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
          onClick={(e) => e.target === e.currentTarget && closePopup()}
          onKeyDown={handleKeyDown}
          ref={popupRef}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg text-gray-900 max-w-md w-full">
            <h3 id="popup-title" className="text-2xl font-semibold mb-4">Thank you!</h3>
            <p className="mb-4">Your message has been sent successfully. I'll get back to you soon.</p>
            <button
              ref={closeButtonRef}
              onClick={closePopup}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;