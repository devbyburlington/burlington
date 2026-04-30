'use client'

import { useState } from 'react'
import { PATHWAY_FILTERS, FIELD_FILTERS, CASES } from './data'
import type { CaseProfile } from './data'
import { FilterSelect } from '../shared/FilterSelect'

const PATHWAY_COLORS: Record<string, string> = {
  eb1a: 'bg-teal/15 text-teal-light',
  niw: 'bg-indigo-500/15 text-indigo-300',
  dual: 'bg-amber-500/15 text-amber-300',
}

const FIELD_COLORS: Record<string, string> = {
  tech: 'bg-sky-500/10 text-sky-300',
  med: 'bg-rose-500/10 text-rose-300',
  law: 'bg-violet-500/10 text-violet-300',
  fin: 'bg-emerald-500/10 text-emerald-300',
  creative: 'bg-orange-500/10 text-orange-300',
  academia: 'bg-cyan-500/10 text-cyan-300',
}

function CaseCard({ profile }: { profile: CaseProfile }) {
  return (
    <div className="cs-card group">
      <div className="cs-card-header">
        <span className="cs-card-num">Profile {profile.num}</span>
        <div className="flex flex-wrap gap-1.5">
          <span className={`cs-tag ${PATHWAY_COLORS[profile.pathwaySlug] ?? 'bg-white/10 text-white/60'}`}>
            {profile.pathway}
          </span>
          <span className={`cs-tag ${FIELD_COLORS[profile.fieldSlug] ?? 'bg-white/10 text-white/60'}`}>
            {profile.field}
          </span>
        </div>
      </div>
      <div className="cs-card-body">
        <h3 className="cs-card-title">{profile.title}</h3>
        <p className="cs-card-meta">{profile.meta}</p>
        <span className="cs-criteria-label">{profile.criteriaLabel}</span>
        <ul className="cs-criteria-list">
          {profile.criteria.map((c, i) => (
            <li key={i} className="cs-criteria-item">
              <svg viewBox="0 0 24 24" className="cs-criteria-icon">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="cs-card-footer">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 fill-none stroke-teal-light stroke-[2]">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span>{profile.outcome}</span>
      </div>
    </div>
  )
}

export function CaseFilter() {
  const [activePathway, setActivePathway] = useState('all')
  const [activeField, setActiveField] = useState('all-fields')

  const filtered = CASES.filter(c => {
    const matchPathway = activePathway === 'all' || c.pathwaySlug === activePathway
    const matchField = activeField === 'all-fields' || c.fieldSlug === activeField
    return matchPathway && matchField
  })

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center gap-3 sm:mb-12">
        <FilterSelect
          label="Pathway"
          value={activePathway}
          options={PATHWAY_FILTERS}
          onChange={setActivePathway}
          variant="dark"
        />
        <FilterSelect
          label="Field"
          value={activeField}
          options={FIELD_FILTERS}
          onChange={setActiveField}
          variant="dark"
        />
      </div>

      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <span className="text-[0.72rem] font-medium uppercase tracking-[.12em] text-white/30">
          {activePathway === 'all' && activeField === 'all-fields'
            ? 'All profiles'
            : 'Filtered results'}
        </span>
        <span className="text-[0.72rem] text-white/25">
          {filtered.length} {filtered.length === 1 ? 'profile' : 'profiles'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {filtered.map(profile => (
          <CaseCard key={profile.id} profile={profile} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center py-16">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[.04]">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white/30 stroke-[1.5]">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <p className="text-[0.86rem] text-white/35">No profiles match these filters.</p>
        </div>
      )}
    </>
  )
}
