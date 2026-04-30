'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CATEGORIES, ARTICLES } from './data'
import type { Article } from './data'
import { FilterSelect } from '../shared/FilterSelect'

const THUMB_CONFIG: Record<string, { letter: string; gradient: string }> = {
  regulatory: { letter: 'R', gradient: 'linear-gradient(135deg, #0F172A, #1E293B)' },
  strategy:   { letter: 'S', gradient: 'linear-gradient(135deg, #0D3B32, #134E45)' },
  field:      { letter: 'E', gradient: 'linear-gradient(135deg, #1C1917, #292524)' },
  rfe:        { letter: 'A', gradient: 'linear-gradient(135deg, #172554, #1E3A5F)' },
  data:       { letter: 'D', gradient: 'linear-gradient(135deg, #312E81, #3730A3)' },
}

function CardThumb({ article }: { article: Article }) {
  const config = THUMB_CONFIG[article.categorySlug] ?? { letter: 'B', gradient: 'linear-gradient(135deg, #0F172A, #1E293B)' }

  return (
    <div className="kc-card-thumb" style={{ background: config.gradient }}>
      <div className="kc-card-thumb-glow" />
      <span className="kc-card-letter">{config.letter}</span>
      <span className="kc-card-badge">{article.category}</span>
    </div>
  )
}

function FeaturedCard({ article }: { article: Article }) {
  return (
    <Link href={`/knowledge-centre/${article.slug}`} className="kc-featured group">
      <div className="kc-featured-thumb">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_80%,rgba(13,148,136,.18),transparent)]" />
        <span className="absolute top-6 right-6 font-serif text-[6rem] font-bold leading-none text-white/[.04] transition-all duration-500 group-hover:text-white/[.06] sm:text-[8rem]">
          R
        </span>
        <div className="relative z-[1] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="kc-pin-badge">Pinned</span>
            <span className="kc-cat-badge">{article.category}</span>
          </div>
          <h2 className="max-w-[600px] font-serif text-[1.1rem] font-medium leading-snug text-white sm:text-[1.3rem]">
            {article.title}
          </h2>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <p className="mb-5 max-w-[640px] text-[0.84rem] leading-[1.8] text-burl-gray-400">
          {article.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[0.74rem] text-burl-gray-300">
            <strong className="font-medium text-burl-gray-500">{article.author}</strong>
            <span className="kc-card-dot" />
            <span>{article.date}</span>
            <span className="kc-card-dot" />
            <span>{article.readTime} read</span>
          </div>
          <span className="hidden items-center gap-1.5 text-[0.78rem] font-medium text-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex">
            Read article
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current stroke-[2.5] transition-transform group-hover:translate-x-0.5">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/knowledge-centre/${article.slug}`} className="kc-card group">
      <CardThumb article={article} />
      <div className="kc-card-body">
        <h3 className="kc-card-title group-hover:text-teal-dark">{article.title}</h3>
        <p className="kc-card-desc">{article.description}</p>
        <div className="kc-card-meta">
          <span className="font-medium text-burl-gray-400">{article.author}</span>
          <span className="kc-card-dot" />
          <span>{article.date}</span>
          <span className="kc-card-dot" />
          <span>{article.readTime}</span>
        </div>
      </div>
    </Link>
  )
}

export function ResourcesFilter() {
  const [active, setActive] = useState('all')

  const featured = ARTICLES.find(a => a.pinned)
  const filtered = active === 'all'
    ? ARTICLES.filter(a => !a.pinned)
    : ARTICLES.filter(a => a.categorySlug === active)

  const showFeatured = active === 'all' || (featured && featured.categorySlug === active)

  return (
    <>
      <div className="mb-10 sm:mb-12">
        <FilterSelect
          label="Category"
          value={active}
          options={CATEGORIES}
          onChange={setActive}
          variant="light"
        />
      </div>

      {showFeatured && featured && (
        <div className="mb-10 sm:mb-12">
          <FeaturedCard article={featured} />
        </div>
      )}

      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <h3 className="text-[0.72rem] font-medium uppercase tracking-[.12em] text-burl-gray-300">
          {active === 'all' ? 'Recent analysis' : CATEGORIES.find(c => c.slug === active)?.label}
        </h3>
        <span className="text-[0.72rem] text-burl-gray-200">
          {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(article => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center py-16">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-burl-gray-100 bg-burl-gray-100/30">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-burl-gray-300 stroke-[1.5]">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <p className="text-[0.86rem] text-burl-gray-300">No articles in this category yet.</p>
        </div>
      )}
    </>
  )
}
