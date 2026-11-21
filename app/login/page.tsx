'use client'

import React, { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Header, Footer } from '@/components/shared'
import AuthFlow from '@/components/shared/AuthFlow'
import { useAuth } from '@/components/shared/AuthContext'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isLoggedIn, isAuthLoading } = useAuth()

  const redirectParam = searchParams.get('redirectTo') || searchParams.get('redirect')
  const safeRedirect =
    redirectParam && redirectParam.startsWith('/') && !redirectParam.startsWith('//')
      ? redirectParam
      : '/'

  useEffect(() => {
    if (isLoggedIn && !isAuthLoading) {
      router.replace(safeRedirect)
    }
  }, [isLoggedIn, isAuthLoading, router, safeRedirect])

  return <AuthFlow redirectTo={safeRedirect} />
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
