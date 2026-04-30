import Image from 'next/image'
import Link from 'next/link'

const PILLS = [
  'Harvard Law School',
  'Harvard Business School',
  'Einstein Visa Holder',
  '100% Approval Rate',
]

export function TeamStrip() {
  return (
    <section className="bg-off-white px-5 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-[clamp(80px,10vw,140px)]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-20">
          {/* Left */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[.12em] text-teal before:h-px before:w-5 before:bg-teal before:content-['']">
              Who we are
            </div>
            <h2 className="mb-4 font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium leading-[1.15] text-burl-gray-700">
              Built by someone who did it — then built a team to do it for others.
            </h2>
            <p className="mb-6 text-[0.88rem] leading-[1.8] text-burl-gray-400 sm:text-[0.92rem]">
              The firm is led by a self-petitioned Einstein Visa (EB-1A) holder trained at Harvard Law School. The team spans Harvard, Cambridge, Microsoft, Meta, and PwC — across three continents.
            </p>
            <div className="mb-7 flex flex-wrap gap-2">
              {PILLS.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-teal/10 bg-teal/[.08] px-4 py-1.5 text-[0.74rem] font-medium text-teal"
                >
                  {pill}
                </span>
              ))}
            </div>
            <Link href="/about" className="inline-flex items-center gap-1.5 text-[0.84rem] font-medium text-teal transition-all hover:gap-3">
              Read more about the firm &rarr;
            </Link>
          </div>

          {/* Right — Photo */}
          <div className="flex justify-center md:justify-end">
            <div className="group relative w-[180px] overflow-hidden rounded-2xl border border-burl-gray-100 sm:w-[200px] lg:w-[220px]">
              <Image
                src="/ebuka.png"
                alt="Chris Ogbodo"
                width={400}
                height={533}
                className="aspect-[3/4] w-full object-cover grayscale-[80%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-base/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 z-[2]">
                <div className="font-serif text-[0.82rem] font-medium text-white">Chris Ogbodo</div>
                <div className="text-[0.65rem] text-white/60">Founder &amp; CEO</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
