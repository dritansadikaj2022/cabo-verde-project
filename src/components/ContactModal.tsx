import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSku?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, defaultSku }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(defaultSku ? `Inquiry regarding SKU: ${defaultSku}` : 'General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Call /contact.php or handle gracefully
    fetch('/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: 'contact',
        name,
        email,
        phone,
        product_sku: defaultSku || 'General Inquiry',
        subject,
        message,
      }),
    })
      .catch(() => {})
      .finally(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden my-auto relative border border-neutral-100">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-black text-sm">
              CV
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight">Contact Cabo Verde</h2>
              <p className="text-xs text-neutral-400 font-mono">Routing to: client@webmedia.al</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-neutral-900">Message Forwarded!</h3>
              <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Your inquiry has been sent to our client service inbox at <strong className="text-red-600">client@webmedia.al</strong>. A design specialist will review your request and reply shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-red-500 text-neutral-900 bg-neutral-50/50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-red-500 text-neutral-900 bg-neutral-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="123-456-7890"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-red-500 text-neutral-900 bg-neutral-50/50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-red-500 text-neutral-900 bg-neutral-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-800 mb-1">Message / Consultation Details *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about custom fabric upholstery, dimensions, trade discounts, or delivery timelines..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-red-500 text-neutral-900 bg-neutral-50/50"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message to client@webmedia.al'}</span>
                </button>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                <span>Direct email: <strong>client@webmedia.al</strong></span>
                <span>Flagship: 500 Terry Francine St.</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
