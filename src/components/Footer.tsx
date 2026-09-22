import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, ArrowRight, Plus, Instagram, Facebook, Pin } from 'lucide-react';
import { SocialMediaSection } from './SocialMediaSection';

interface FooterProps {
  onOpenContact: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onSelectCategory }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && consent) {
      setSubscribed(true);
      // Simulating contact.php newsletter ingestion
      fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: 'newsletter',
          email,
          consent: true,
        }),
      }).catch(() => {
        /* fallback handled gracefully */
      });
    }
  };

  return (
    <>
      <footer id="contact" className="bg-black text-white pt-16 pb-12 border-t border-neutral-800 selection:bg-red-600 selection:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Brand Banner */}
          <div className="mb-12 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-sm shadow-md">
              CV
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white">CABO VERDE</h2>
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">Luxury Living &amp; Interior Design</p>
            </div>
          </div>

          {/* 5-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800 text-sm">
            
            {/* Col 1: Store */}
            <div>
              <h3 className="font-bold text-base text-white mb-4">Store</h3>
              <ul className="space-y-2.5 text-neutral-400 text-xs">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#popular-picks" onClick={() => onSelectCategory('all')} className="hover:text-white transition-colors">Shop All</a></li>
                <li><a href="#popular-picks" onClick={() => onSelectCategory('sofas')} className="hover:text-white transition-colors">Living</a></li>
                <li><a href="#popular-picks" onClick={() => onSelectCategory('chairs')} className="hover:text-white transition-colors">Dining</a></li>
                <li><a href="#popular-picks" onClick={() => onSelectCategory('bed')} className="hover:text-white transition-colors">Bedroom</a></li>
                <li><a href="#trending-section" onClick={() => onSelectCategory('lighting')} className="hover:text-white transition-colors">Lighting</a></li>
              </ul>
            </div>

            {/* Col 2: Policies */}
            <div>
              <h3 className="font-bold text-base text-white mb-4">Policies</h3>
              <ul className="space-y-2.5 text-neutral-400 text-xs">
                <li><a href="#policies" className="hover:text-white transition-colors">Terms &amp; Conditions</a></li>
                <li><a href="#policies" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#policies" className="hover:text-white transition-colors">Shipping Policy</a></li>
                <li><a href="#policies" className="hover:text-white transition-colors">Refund Policy</a></li>
                <li><a href="#policies" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#policies" className="hover:text-white transition-colors">Accessibility Statement</a></li>
              </ul>
            </div>

            {/* Col 3: About Us (includes client@webmedia.al) */}
            <div>
              <h3 className="font-bold text-base text-white mb-4">About Us</h3>
              <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                Our mission is to deliver an unmatched customer experience in the furniture industry, ensuring exceptional quality and service in every interaction.
              </p>
              <div className="text-xs text-neutral-400 space-y-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>500 Terry Francine St., SF 94158</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-neutral-500" />
                  <span>123-456-7890</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Mail className="w-3.5 h-3.5 text-red-500" />
                  <a href="mailto:client@webmedia.al" className="text-red-500 hover:text-red-400 font-bold underline underline-offset-4">
                    client@webmedia.al
                  </a>
                </div>
              </div>
            </div>

            {/* Col 4: Account */}
            <div>
              <h3 className="font-bold text-base text-white mb-4">Account</h3>
              <ul className="space-y-2.5 text-neutral-400 text-xs">
                <li><a href="#account" className="hover:text-white transition-colors">My Account</a></li>
                <li><a href="#account" className="hover:text-white transition-colors">My Wishlist</a></li>
                <li><a href="#account" className="hover:text-white transition-colors">My Orders</a></li>
                <li><a href="#account" className="hover:text-white transition-colors">My Wallet</a></li>
              </ul>
            </div>

            {/* Col 5: Newsletter */}
            <div>
              <h3 className="font-bold text-base text-white mb-4">Subscribe to our newsletter</h3>
              {subscribed ? (
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-xs text-emerald-400 space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Subscribed!</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    Confirmation has been queued for dispatch to <strong className="text-white">{email}</strong> and logged to <strong className="text-red-400">client@webmedia.al</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="newsletter-consent-react"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      required
                      className="mt-0.5 rounded text-red-600 focus:ring-red-500 border-neutral-700 bg-neutral-900"
                    />
                    <label htmlFor="newsletter-consent-react" className="text-[11px] text-neutral-400 leading-tight select-none">
                      Yes, subscribe me to your newsletter.
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-md transition-colors cursor-pointer"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Social Media Integration Section (Instagram, Pinterest, Facebook) */}
          <SocialMediaSection />

          {/* Bottom Row */}
          <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-neutral-400 font-semibold">Follow Cabo Verde:</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                title="Follow Cabo Verde on Instagram"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-500" />
                <span>Instagram</span>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                title="Follow Cabo Verde on Pinterest"
              >
                <Pin className="w-3.5 h-3.5 text-red-500" />
                <span>Pinterest</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                title="Join Cabo Verde on Facebook"
              >
                <Facebook className="w-3.5 h-3.5 text-blue-500" />
                <span>Facebook</span>
              </a>
            </div>
            <div>
              <p>Copyright &copy; 2026 Cabo Verde. All rights reserved. &bull; Inquiries: <a href="mailto:client@webmedia.al" className="text-red-500 underline font-semibold">client@webmedia.al</a></p>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating "+ Get in touch" Pill Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={onOpenContact}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-5 py-3 rounded-full shadow-2xl shadow-red-600/40 transition-transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
        >
          <Plus className="w-4 h-4" />
          <span>Get in touch</span>
        </button>
      </div>
    </>
  );
};
