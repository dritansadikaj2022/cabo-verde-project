import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('summary');
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const files = [
    {
      id: 'part1',
      name: 'part1_header.html',
      type: 'HTML Part 1 of 5',
      desc: 'Top announcement bar, logo, desktop navigation with dropdowns, mobile hamburger trigger.',
      path: '/part1_header.html',
    },
    {
      id: 'part2',
      name: 'part2_hero_categories.html',
      type: 'HTML Part 2 of 5',
      desc: 'Hero slider with high-res photography, "Designed To Work With You", 7-category slider, 3 promo cards.',
      path: '/part2_hero_categories.html',
    },
    {
      id: 'part3',
      name: 'part3_popular_products.html',
      type: 'HTML Part 3 of 5',
      desc: "Today's Popular Picks with category tab switcher, product cards with badges & Quick View triggers.",
      path: '/part3_popular_products.html',
    },
    {
      id: 'part4',
      name: 'part4_rooms_reviews_blog.html',
      type: 'HTML Part 4 of 5',
      desc: 'Shop by Room bento grid, 15% Off Holiday banner, Welcome to Cabo Verde stats, and blog articles.',
      path: '/part4_rooms_reviews_blog.html',
    },
    {
      id: 'part5',
      name: 'part5_footer.html',
      type: 'HTML Part 5 of 5',
      desc: 'Dark luxury 5-column footer, newsletter with consent, client@webmedia.al, floating action, and Product Zoom modal markup.',
      path: '/part5_footer.html',
    },
    {
      id: 'main',
      name: 'main.html',
      type: 'Full Unified HTML',
      desc: 'All 5 parts compiled into a standalone production HTML file with responsive Tailwind CSS & full JS zoom engine.',
      path: '/main.html',
    },
    {
      id: 'php',
      name: 'contact.php',
      type: 'Backend Mailer Script',
      desc: 'PHP script configured for Cabo Verde with recipient client@webmedia.al, sanitization, JSON/POST handler, and audit logging.',
      path: '/contact.php',
    },
  ];

  const handleCopyPath = (path: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(path);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden my-auto relative border border-neutral-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold text-sm">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">5-Part HTML &amp; PHP Code Structure</h2>
              <p className="text-xs text-neutral-400">
                Business: <strong>Cabo Verde</strong> &bull; Contact: <strong className="text-red-400">client@webmedia.al</strong>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* File Cards List */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4">
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 text-xs text-neutral-700 leading-relaxed mb-6">
            <p className="font-semibold text-neutral-900 mb-1">
              Architecture Delivery Summary:
            </p>
            <p>
              As requested, the entire website has been structured into <strong>main.html in 5 parts</strong> and <strong>one .php file</strong> dedicated to <strong>Cabo Verde</strong> (routing all inquiries and newsletter subscriptions to <strong>client@webmedia.al</strong>). All files are saved both in the project root and in <code>/public/parts/</code> for instant availability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-2xl border border-neutral-200 p-5 hover:border-red-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      {file.type}
                    </span>
                    <span className="font-mono text-[11px] text-neutral-400">{file.path}</span>
                  </div>
                  <h3 className="font-bold text-sm text-neutral-900 mb-1">{file.name}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{file.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleCopyPath(file.path, file.id)}
                    className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-red-600 font-semibold cursor-pointer"
                  >
                    {copied === file.id ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied Path!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Path</span>
                      </>
                    )}
                  </button>

                  <a
                    href={file.path}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-bold"
                  >
                    <span>View File</span> &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50 text-right">
          <button
            onClick={onClose}
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
