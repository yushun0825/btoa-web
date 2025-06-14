// src/app/login/page.tsx
'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">ログイン</h1>
      <Button onClick={() => signIn('google')}>
        Googleでログイン
      </Button>
    </div>
  )
}
