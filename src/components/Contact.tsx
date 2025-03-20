import React from 'react';
import { Mail, MessageSquare, Send, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Let's Connect</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <a 
                href="mailto:ashehab.biomedeng@gmail.com"
                className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                ashehab.biomedeng@gmail.com
              </a>
              <a 
                href="tel:+201274316669"
                className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
                +201274316669
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5" />
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
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/AhmedShehab1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href="https://leetcode.com/u/Ahmed_Abdelghafar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  LeetCode
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <form className="space-y-6" name="contact" method="POST" netlify>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="What's on your mind?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;