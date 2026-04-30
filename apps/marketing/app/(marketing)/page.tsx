import { Hero } from '../../components/home/Hero'
import { Pitch } from '../../components/home/Pitch'
import { CreditLadder } from '../../components/home/CreditLadder'
import { SocialProof } from '../../components/home/SocialProof'
import { FinalCta } from '../../components/home/FinalCta'
import { SectionBridge } from '../../components/shared/SectionBridge'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SectionBridge variant="dark-to-light" />
      <Pitch />
      <SectionBridge variant="light-to-dark" />
      <CreditLadder />
      <SectionBridge variant="dark-to-white" />
      <SocialProof />
      <SectionBridge variant="white-to-dark" />
      <FinalCta />
    </main>
  )
}
