'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@burlington/shared/src/supabase/client'

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    await fetch('/api/set-persist', { method: 'DELETE' })
    router.replace('/login')
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="text-[0.8125rem] font-medium text-burl-gray-400 transition-colors hover:text-burl-gray-700"
    >
      Sign out
    </button>
  )
}
