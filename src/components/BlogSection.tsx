import React from 'react';
import { ArrowRight, Calendar, User, Clock, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/products';
import { useDevice } from '../context/DeviceContext';

export const BlogSection: React.FC = () => {
  const { isMobileView } = useDevice();

  return (
    <section className="py-16 sm:py-24 bg-neutral-50/70 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full mb-2 border border-red-100">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Interior Insights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight">
              Design Trends &amp; Inspirations
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-1">
              Architectural guides, styling advice, and material spotlights from Cabo Verde editors.
            </p>
          </div>
          <a
            href="#faq"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-800 hover:text-red-600 transition-colors mt-3 sm:mt-0 group"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-red-600" />
          </a>
        </div>

        {/* Blog Cards Grid - 1 column on mobile, 3 columns on desktop */}
        <div className={`grid gap-6 sm:gap-8 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover-3d hover-sheen transition-all duration-300 flex flex-col group"
            >
              {/* Image Stage with 3D Pop */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-neutral-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {post.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-[11px] text-neutral-400 mb-3 flex-wrap">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-red-500" />
                      <span>{post.author}</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-neutral-900 group-hover:text-red-600 transition-colors leading-snug mb-2.5">
                    {post.title}
                  </h3>

                  <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900 group-hover:text-red-600 transition-colors">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
