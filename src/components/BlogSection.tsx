import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Clock, Calendar, ArrowRight, Eye } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { blogPosts, setSelectedBlogPost } = useApp();

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs uppercase tracking-wider font-bold text-[#1357A6]">
            Educational Insights & Guides
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Knowledge Hub & Documentation Guides
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            In-depth guides crafted by our documentation analysts to help Bangalore residents navigate
            overseas employment visa rules, university transcripts, and embassy legalization.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              <div className="p-6 space-y-3">
                {/* Clean unboxed category & reading time metadata */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="text-[#1357A6] font-bold">{post.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {post.readingTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1357A6] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {post.publishedDate}
                </span>
                <button
                  onClick={() => setSelectedBlogPost(post)}
                  className="text-xs font-bold text-[#1357A6] group-hover:text-[#1976D2] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
