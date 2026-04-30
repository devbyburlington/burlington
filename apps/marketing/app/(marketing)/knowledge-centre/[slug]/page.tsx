import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SectionLabel } from '@burlington/ui'
import { ARTICLES, getArticleBySlug } from '../../../../components/resources/data'
import { Button } from '../../../../components/shared/Button'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  return (
    <>
      <section className="ar-hero">
        <div className="ar-hero-texture" />
        <div className="ar-hero-glow" />
        <div className="relative z-[1] mx-auto max-w-[720px]">
          <Link
            href="/knowledge-centre"
            className="mb-6 inline-flex items-center gap-2 text-[0.78rem] text-white/40 transition-colors hover:text-teal-light"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current stroke-[2]">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Knowledge Centre
          </Link>
          <div className="mb-5">
            <SectionLabel variant="dark">{article.category}</SectionLabel>
          </div>
          <h1 className="section-heading-dark mb-6 text-[clamp(1.6rem,3vw,2.2rem)]">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-[0.78rem] text-white/35">
            <strong className="font-medium text-white/55">{article.author}</strong>
            <span className="h-0.5 w-0.5 rounded-full bg-white/20" />
            <span>{article.date}</span>
            <span className="h-0.5 w-0.5 rounded-full bg-white/20" />
            <span>{article.readTime} read</span>
          </div>
        </div>
      </section>

      <section className="ar-body">
        <div
          className="ar-content"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </section>

      <section className="kc-nl">
        <div className="kc-nl-texture" />
        <div className="kc-nl-glow" />
        <div className="relative z-[1] mx-auto max-w-[680px] text-center">
          <h2 className="section-heading-dark mb-4">Ready to file?</h2>
          <p className="section-body-dark mx-auto mb-10 max-w-[440px]">
            Start with a profile assessment. Burlington Consult reviews your record and
            advises on the strongest available pathway.
          </p>
          <div className="flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center sm:gap-4">
            <Button href="/assess" className="w-full max-w-[320px] sm:w-auto">
              Take Free Assessment &rarr;
            </Button>
            <Button href="/pricing" variant="ghost" className="w-full max-w-[320px] sm:w-auto">
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
