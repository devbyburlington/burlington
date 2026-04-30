import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { BackToTop } from '../../components/layout/BackToTop'
import { CookieBanner } from '../../components/layout/CookieBanner'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <BackToTop />
      <CookieBanner />
    </div>
  )
}
