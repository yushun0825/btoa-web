'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function SelectRolePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSelect = async (role: 'STUDENT' | 'LAB' | 'COMPANY') => {
    setLoading(true)
    const res = await fetch('/api/set-role', {
      method: 'POST',
      body: JSON.stringify({ role }),
    })

    if (res.ok) {
      if (role === 'STUDENT') router.push('/dashboard/student')
      if (role === 'LAB') router.push('/dashboard/lab')
      if (role === 'COMPANY') router.push('/dashboard/company')
    } else {
      alert('エラーが発生しました')
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">あなたの役割を選んでください</h1>
      <div className="flex gap-4">
        <Button onClick={() => handleSelect('STUDENT')} disabled={loading}>
          🎓 学生
        </Button>
        <Button onClick={() => handleSelect('LAB')} disabled={loading}>
          🧪 研究室
        </Button>
        <Button onClick={() => handleSelect('COMPANY')} disabled={loading}>
          🏢 企業
        </Button>
      </div>
    </div>
  )
}
