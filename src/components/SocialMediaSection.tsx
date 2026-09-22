import React, { useState } from 'react';
import { 
  Instagram, 
  Facebook, 
  Pin, 
  ExternalLink, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Sparkles, 
  Share2, 
  Users, 
  Check, 
  Copy, 
  X, 
  Eye 
} from 'lucide-react';

interface SocialPost {
  id: string;
  platform: 'instagram' | 'pinterest' | 'facebook';
  imageUrl: string;
  title: string;
  caption: string;
  likesOrPins: string;
  commentsOrSaves: string;
  tags: string[];
  externalUrl: string;
}

const INSTAGRAM_POSTS: SocialPost[] = [
  {
    id: 'ig-1',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    title: 'The Organic Curve Sectional in Emerald Velvet',
    caption: 'Handcrafted in kiln-dried solid beech framing with multi-density bouclé upholstery. Designed to anchor expansive architectural living spaces.',
    likesOrPins: '2,480',
    commentsOrSaves: '142',
    tags: ['#CaboVerdeLiving', '#BespokeInteriors', '#ModularSectional', '#AtelierCraft'],
    externalUrl: 'https://instagram.com',
  },
  {
    id: 'ig-2',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1580481077194-43610996f874?auto=format&fit=crop&w=800&q=80',
    title: 'Natural White Oak Sculptural Lounge',
    caption: 'Continuous grain alignment across hand-shaped armrests. Sourced sustainably and hand-rubbed with organic beeswax.',
    likesOrPins: '1,930',
    commentsOrSaves: '89',
    tags: ['#HardwoodLounge', '#SlowFurniture', '#OrganicDesign', '#SolidOak'],
    externalUrl: 'https://instagram.com',
  },
  {
    id: 'ig-3',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    title: 'Monolithic Walnut Sideboard Joinery',
    caption: 'Dovetail joints and soft-close brass architectural pivots. Every grain pattern is hand-matched across consecutive drawer faces.',
    likesOrPins: '3,120',
    commentsOrSaves: '215',
    tags: ['#WalnutCredenza', '#MasterJoinery', '#ArchitecturalStorage', '#CaboVerde'],
    externalUrl: 'https://instagram.com',
  },
  {
    id: 'ig-4',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80',
    title: 'Quarter-Sawn Teak Dining Pavilion',
    caption: 'Custom 10-seater dining centerpiece styled with artisanal ceramic vessels and raw linen drape.',
    likesOrPins: '1,750',
    commentsOrSaves: '74',
    tags: ['#DiningArchitecture', '#TeakFurniture', '#AtelierSalone', '#HeirloomDesign'],
    externalUrl: 'https://instagram.com',
  },
];

const PINTEREST_BOARDS = [
  {
    id: 'pin-1',
    name: 'Solid American Hardwood Specs',
    pinsCount: '342 Pins',
    coverImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    category: 'Material Palettes',
  },
  {
    id: 'pin-2',
    name: 'Minimalist Architectural Salons',
    pinsCount: '518 Pins',
    coverImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    category: 'Spatial Design',
  },
  {
    id: 'pin-3',
    name: 'Curved Bouclé & Warm Travertine',
    pinsCount: '289 Pins',
    coverImage: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=800&q=80',
    category: 'Textural Curation',
  },
];

export const SocialMediaSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);
  const [followedPlatforms, setFollowedPlatforms] = useState<Record<string, boolean>>({
    instagram: false,
    pinterest: false,
    facebook: false,
  });

  const handleCopyHandle = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHandle(label);
    setTimeout(() => {
      setCopiedHandle(null);
    }, 2500);
  };

  const toggleFollow = (platform: 'instagram' | 'pinterest' | 'facebook') => {
    setFollowedPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  return (
    <section id="social-integration-section" className="pt-12 pb-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono tracking-widest text-amber-400 uppercase mb-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Connect &amp; Engage</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Atelier Social &amp; Design Community
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mt-1">
            Immerse yourself in our daily curations of solid hardwood joinery, architectural styling, moodboards, and collector salons on Instagram, Pinterest, and Facebook.
          </p>
        </div>

        {/* Global Stats Tag */}
        <div className="flex items-center gap-3 text-xs text-neutral-400 bg-neutral-900/60 border border-neutral-800/80 px-4 py-2 rounded-2xl self-start md:self-auto">
          <Users className="w-4 h-4 text-red-500" />
          <span><strong className="text-white font-mono">180K+</strong> Global Architecture Community</span>
        </div>
      </div>

      {/* 3 Main Social Integration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* =================================================================
            1. INSTAGRAM PLACEHOLDER CARD
        ================================================================= */}
        <div
          id="social-instagram-card"
          className="bg-neutral-900/60 rounded-3xl border border-neutral-800/90 p-5 sm:p-6 flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 group shadow-lg shadow-black/40"
        >
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white tracking-tight">@caboverde.luxury</span>
                    <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" title="Verified Atelier" />
                  </div>
                  <span className="text-[11px] text-neutral-400">48.6K Followers &bull; 842 Posts</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopyHandle('@caboverde.luxury', 'Instagram')}
                className="text-[11px] text-neutral-400 hover:text-white px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors flex items-center gap-1 cursor-pointer"
                title="Copy Instagram handle"
              >
                {copiedHandle === 'Instagram' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              Daily visual diary of monolithic joinery, private residence installs, and tactile material studies directly from our master workshop.
            </p>

            {/* 4-Image Grid Placeholder */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {INSTAGRAM_POSTS.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="relative aspect-square rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 group/img cursor-pointer"
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2 text-white text-[11px] text-center backdrop-blur-xs">
                    <Eye className="w-4 h-4 text-amber-400 mb-0.5" />
                    <span className="font-semibold line-clamp-1">{post.title}</span>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-300">
                      <span className="flex items-center gap-0.5"><Heart className="w-3 h-3 text-red-500 fill-red-500" /> {post.likesOrPins}</span>
                      <span className="flex items-center gap-0.5"><MessageCircle className="w-3 h-3 text-blue-400" /> {post.commentsOrSaves}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card CTA Actions */}
          <div className="pt-2 border-t border-neutral-800/80 flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleFollow('instagram')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                followedPlatforms.instagram
                  ? 'bg-neutral-800 text-emerald-400 border border-emerald-500/30'
                  : 'bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white'
              }`}
            >
              {followedPlatforms.instagram ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Following on Instagram</span>
                </>
              ) : (
                <>
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Follow on Instagram</span>
                </>
              )}
            </button>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Open Instagram in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* =================================================================
            2. PINTEREST PLACEHOLDER CARD
        ================================================================= */}
        <div
          id="social-pinterest-card"
          className="bg-neutral-900/60 rounded-3xl border border-neutral-800/90 p-5 sm:p-6 flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 group shadow-lg shadow-black/40"
        >
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-700 flex items-center justify-center text-white shadow-md shadow-red-700/30 group-hover:scale-105 transition-transform">
                  <Pin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white tracking-tight">Cabo Verde Pinboards</span>
                    <span className="text-[10px] bg-red-950 text-red-400 px-1.5 py-0.2 rounded font-mono">MOODBOARDS</span>
                  </div>
                  <span className="text-[11px] text-neutral-400">120K Monthly Views &bull; 84 Boards</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopyHandle('pinterest.com/caboverdeluxury', 'Pinterest')}
                className="text-[11px] text-neutral-400 hover:text-white px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors flex items-center gap-1 cursor-pointer"
                title="Copy Pinterest URL"
              >
                {copiedHandle === 'Pinterest' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              Curated moodboards of raw timber species, Mediterranean limestone, custom architectural millwork, and lighting layouts for interior architects.
            </p>

            {/* 3 Pinboard Cards Stack */}
            <div className="space-y-2.5 mb-5">
              {PINTEREST_BOARDS.map((board) => (
                <a
                  key={board.id}
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-950 transition-all group/board cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-800 shrink-0 relative">
                    <img
                      src={board.coverImage}
                      alt={board.name}
                      className="w-full h-full object-cover group-hover/board:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-xs p-1 rounded-md">
                      <Pin className="w-2.5 h-2.5 text-red-500" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                      {board.category}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate group-hover/board:text-red-400 transition-colors">
                      {board.name}
                    </h4>
                    <span className="text-[11px] text-neutral-400 block">{board.pinsCount}</span>
                  </div>
                  <div className="pr-2">
                    <Bookmark className="w-3.5 h-3.5 text-neutral-500 group-hover/board:text-red-500 transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Card CTA Actions */}
          <div className="pt-2 border-t border-neutral-800/80 flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleFollow('pinterest')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                followedPlatforms.pinterest
                  ? 'bg-neutral-800 text-emerald-400 border border-emerald-500/30'
                  : 'bg-red-700 hover:bg-red-600 text-white'
              }`}
            >
              {followedPlatforms.pinterest ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Following Pinboards</span>
                </>
              ) : (
                <>
                  <Pin className="w-3.5 h-3.5" />
                  <span>Explore on Pinterest</span>
                </>
              )}
            </button>

            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Open Pinterest in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* =================================================================
            3. FACEBOOK PLACEHOLDER CARD
        ================================================================= */}
        <div
          id="social-facebook-card"
          className="bg-neutral-900/60 rounded-3xl border border-neutral-800/90 p-5 sm:p-6 flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 group shadow-lg shadow-black/40"
        >
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
                  <Facebook className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white tracking-tight">Cabo Verde Atelier Circle</span>
                    <span className="text-[10px] bg-blue-950 text-blue-400 px-1.5 py-0.2 rounded font-mono">PRIVATE SALON</span>
                  </div>
                  <span className="text-[11px] text-neutral-400">12.4K Members &bull; Active Discussions</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopyHandle('facebook.com/groups/caboverdeatelier', 'Facebook')}
                className="text-[11px] text-neutral-400 hover:text-white px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors flex items-center gap-1 cursor-pointer"
                title="Copy Facebook group URL"
              >
                {copiedHandle === 'Facebook' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              An exclusive architectural circle for collectors, interior designers, and architects. Discuss custom dimensions, sustainable timber, and attend VIP digital salons.
            </p>

            {/* Community Highlight Features */}
            <div className="space-y-3 mb-5">
              <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800/80">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Current Atelier Discussion
                  </span>
                  <span className="text-[10px] text-neutral-500">2h ago</span>
                </div>
                <h4 className="text-xs font-bold text-neutral-200 line-clamp-2">
                  &ldquo;Natural Hardwood Finishing: Organic Beeswax vs. Low-VOC Matte Lacquer in Coastal Island Air&rdquo;
                </h4>
                <div className="flex items-center gap-3 mt-2 text-[11px] text-neutral-400">
                  <span className="text-neutral-300 font-medium">96 Comments</span>
                  <span>&bull;</span>
                  <span className="text-amber-400 font-medium">Moderated by Lead Joiner</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">
                    Upcoming Collector Event
                  </span>
                  <span className="text-xs font-bold text-white block">
                    Virtual Atelier Walkthrough &bull; Fall 2026
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 bg-neutral-800 text-neutral-200 rounded-lg whitespace-nowrap">
                  RSVP Open
                </span>
              </div>
            </div>
          </div>

          {/* Card CTA Actions */}
          <div className="pt-2 border-t border-neutral-800/80 flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleFollow('facebook')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                followedPlatforms.facebook
                  ? 'bg-neutral-800 text-emerald-400 border border-emerald-500/30'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {followedPlatforms.facebook ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Joined Atelier Circle</span>
                </>
              ) : (
                <>
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Join Community on Facebook</span>
                </>
              )}
            </button>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Open Facebook in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* =================================================================
          INTERACTIVE POST DETAIL MODAL (Instagram / Pinterest / Facebook)
      ================================================================= */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video sm:aspect-16/10 bg-black overflow-hidden">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950/80 text-white text-[11px] font-bold backdrop-blur-xs">
                <Instagram className="w-3.5 h-3.5 text-pink-500" />
                <span>@caboverde.luxury &bull; Verified Atelier Post</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {selectedPost.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> {selectedPost.likesOrPins}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-blue-400" /> {selectedPost.commentsOrSaves}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                {selectedPost.caption}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedPost.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] text-amber-300/90 bg-neutral-800/80 px-2.5 py-1 rounded-lg font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-neutral-800">
                <span className="text-xs text-neutral-500">
                  Direct Inquiries: <strong className="text-neutral-300">client@webmedia.al</strong>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleCopyHandle(selectedPost.title, 'Caption');
                    }}
                    className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Piece</span>
                  </button>
                  <a
                    href={selectedPost.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
