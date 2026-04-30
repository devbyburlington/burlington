'use client'

import { useState, useMemo } from 'react'
import { FAQ_CATEGORIES, FAQ_ITEMS } from './data'
import { FilterSelect } from '../shared/FilterSelect'

function AccordionItem({ question, answer, isOpen, onToggle }: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className={`fq-item ${isOpen ? 'fq-item-open' : ''}`}>
      <button
        type="button"
        className="fq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className="fq-icon-wrap">
          <svg viewBox="0 0 24 24" className={`fq-icon ${isOpen ? 'rotate-45' : ''}`}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <div className={`fq-answer ${isOpen ? 'fq-answer-open' : ''}`}>
        <p className="fq-answer-text">{answer}</p>
      </div>
    </div>
  )
}

export function FaqAccordion() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return FAQ_ITEMS.filter(item => {
      const matchCategory = activeCategory === 'all' || item.categorySlug === activeCategory
      const matchSearch = !q || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
      return matchCategory && matchSearch
    })
  }, [activeCategory, search])

  const grouped = useMemo(() => {
    const groups: Record<string, typeof FAQ_ITEMS> = {}
    for (const item of filtered) {
      const key = item.categorySlug
      if (!groups[key]) groups[key] = []
      groups[key]!.push(item)
    }
    return groups
  }, [filtered])

  function handleToggle(globalIndex: number) {
    setOpenIndex(prev => prev === globalIndex ? null : globalIndex)
  }

  function handleCategoryChange(slug: string) {
    setActiveCategory(slug)
    setOpenIndex(null)
  }

  function handleSearch(value: string) {
    setSearch(value)
    setOpenIndex(null)
    if (value) setActiveCategory('all')
  }

  let globalIndex = -1

  return (
    <>
      <div className="fq-toolbar">
        <div className="fq-search">
          <svg viewBox="0 0 24 24" className="fq-search-icon">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search questions..."
            className="fq-search-input"
          />
          {search && (
            <button
              type="button"
              onClick={() => handleSearch('')}
              className="fq-search-clear"
              aria-label="Clear search"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current stroke-[2]">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <FilterSelect
          label="Topic"
          value={activeCategory}
          options={FAQ_CATEGORIES}
          onChange={handleCategoryChange}
          variant="dark"
        />
      </div>

      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <span className="text-[0.72rem] font-medium uppercase tracking-[.12em] text-white/30">
          {search ? 'Search results' : activeCategory === 'all' ? 'All questions' : FAQ_CATEGORIES.find(c => c.slug === activeCategory)?.label}
        </span>
        <span className="text-[0.72rem] text-white/25">
          {filtered.length} {filtered.length === 1 ? 'question' : 'questions'}
        </span>
      </div>

      {FAQ_CATEGORIES.filter(c => c.slug !== 'all').map(cat => {
        const items = grouped[cat.slug]
        if (!items?.length) return null

        return (
          <div key={cat.slug} className="fq-group">
            <h3 className="fq-group-title">{cat.label}</h3>
            <div className="fq-group-items">
              {items.map(item => {
                globalIndex++
                const idx = globalIndex
                return (
                  <AccordionItem
                    key={item.question}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIndex === idx}
                    onToggle={() => handleToggle(idx)}
                  />
                )
              })}
            </div>
          </div>
        )
      })}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center py-16">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[.04]">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white/30 stroke-[1.5]">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <p className="text-[0.86rem] text-white/35">No questions match your search.</p>
        </div>
      )}
    </>
  )
}
