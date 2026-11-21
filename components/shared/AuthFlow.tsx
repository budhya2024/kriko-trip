'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import brandLogo from '@/public/assets/images/brand-logo.png'
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldCheck,
  User,
} from 'lucide-react'
import { useAuth } from './AuthContext'
import CountryPhoneSelect from './CountryPhoneSelect'

interface AuthFlowProps {
  onSuccess?: () => void
  redirectTo?: string
  isModal?: boolean
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

export default function AuthFlow({ onSuccess, redirectTo = '/', isModal = false }: AuthFlowProps) {
  const router = useRouter()
  const {
    isLoggedIn,
    sendEmailOtp,
    verifyEmailOtp,
    signInWithGoogle,
    completeProfile,
  } = useAuth()

  const [activeTab, setActiveTab] = useState<'email' | 'mobile'>('email')
  const [step, setStep] = useState<'input' | 'otp' | 'profile'>('input')

  const [emailInput, setEmailInput] = useState('')
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(30)
  const [isResendActive, setIsResendActive] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [fullName, setFullName] = useState('')
  const [phoneCountryCode, setPhoneCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const safeRedirect =
    redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('//')
      ? redirectTo
      : '/'

  useEffect(() => {
    if (isLoggedIn && step !== 'profile') {
      if (onSuccess) {
        onSuccess()
      } else {
        router.push(safeRedirect)
      }
    }
  }, [isLoggedIn, step, onSuccess, router, safeRedirect])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsResendActive(true)
            return 0
          }
          return prev - 1
        });
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [step, timer])

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    const cleanEmail = emailInput.trim().toLowerCase()
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    const result = await sendEmailOtp(cleanEmail)
    setIsLoading(false)

    if (!result.success) {
      setErrorMessage(result.error || 'Failed to send verification code')
      return
    }

    setStep('otp')
    setTimer(30)
    setIsResendActive(false)
    setOtp(['', '', '', '', '', ''])
    setTimeout(() => {
      otpInputRefs.current[0]?.focus()
    }, 100)
  }

  const handleResendOtp = async () => {
    if (!isResendActive || isLoading) {
      return
    }
    setErrorMessage('')
    setIsLoading(true)
    const result = await sendEmailOtp(emailInput.trim().toLowerCase())
    setIsLoading(false)

    if (!result.success) {
      setErrorMessage(result.error || 'Failed to resend code')
      return
    }

    setTimer(30)
    setIsResendActive(false)
    setOtp(['', '', '', '', '', ''])
    otpInputRefs.current[0]?.focus()
  }

  const handleOtpChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, '').slice(-1)
    const newOtp = [...otp]
    newOtp[index] = cleanValue
    setOtp(newOtp)
    if (errorMessage) {
      setErrorMessage('')
    }

    if (cleanValue && index < 5) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) {
      return
    }
    const newOtp = [...otp]
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || ''
    }
    setOtp(newOtp)
    const nextIndex = Math.min(pasted.length, 5)
    otpInputRefs.current[nextIndex]?.focus()
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    const enteredOtp = otp.join('')
    if (enteredOtp.length !== 6) {
      setErrorMessage('Please enter the full 6-digit verification code')
      return
    }

    setErrorMessage('')
    setIsLoading(true)
    const result = await verifyEmailOtp(emailInput.trim().toLowerCase(), enteredOtp)
    setIsLoading(false)

    if (!result.success) {
      setErrorMessage(result.error || 'Invalid or expired code')
      return
    }

    if (result.profileComplete === false) {
      setStep('profile')
      return
    }

    if (onSuccess) {
      onSuccess()
    } else {
      router.push(safeRedirect)
    }
  }

  const handleCompleteProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name')
      return
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your mobile number')
      return
    }

    setErrorMessage('')
    setIsLoading(true)
    const result = await completeProfile({
      name: fullName.trim(),
      phoneCountryCode,
      phone: phone.trim(),
      location: location.trim(),
    })
    setIsLoading(false)

    if (!result.success) {
      setErrorMessage(result.error || 'Failed to complete profile')
      return
    }

    if (onSuccess) {
      onSuccess()
    } else {
      router.push(safeRedirect)
    }
  }

  const handleGoogleSignIn = async () => {
    setErrorMessage('')
    try {
      await signInWithGoogle(safeRedirect)
    } catch {
      setErrorMessage('Failed to initiate Google sign-in')
    }
  }

  return (
    <div className={`w-full ${isModal ? '' : 'max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8'}`}>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center mb-3">
          <Image
            src={brandLogo}
            alt="KrikoTrip"
            className="h-9 w-auto object-contain"
            priority
          />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {step === 'input' && 'Sign in to KrikoTrip'}
          {step === 'otp' && 'Verify your Email'}
          {step === 'profile' && 'Complete your Profile'}
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {step === 'input' && 'Explore handcrafted tours, track enquiries & earn rewards.'}
          {step === 'otp' && `Enter the 6-digit code sent to ${emailInput}`}
          {step === 'profile' && 'Tell us your name and phone number to finalize your account.'}
        </p>
      </div>

      {step === 'input' && (
        <div className="flex border-b border-gray-200 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'email'
                ? 'border-[#1877F2] text-[#1877F2]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Email
          </button>
          <button
            type="button"
            disabled
            className="flex-1 py-2 text-xs sm:text-sm font-semibold border-b-2 border-transparent text-gray-400 cursor-not-allowed inline-flex items-center justify-center gap-1.5"
            title="Mobile OTP sign-in coming soon"
          >
            <span>Mobile</span>
            <span className="text-[10px] font-normal uppercase px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
              Coming Soon
            </span>
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium animate-in fade-in duration-150">
          {errorMessage}
        </div>
      )}

      {step === 'input' && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                required
                autoFocus
                disabled={isLoading}
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value)
                  if (errorMessage) {
                    setErrorMessage('')
                  }
                }}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1877F2] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-[#1877F2] hover:bg-blue-600 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <span>{isLoading ? 'Sending Code...' : 'Continue with Email'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-400 font-medium">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs sm:text-sm font-semibold text-gray-700 transition-colors cursor-pointer flex items-center justify-center gap-2.5 shadow-2xs"
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div className="flex justify-center gap-2 sm:gap-2.5">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  otpInputRefs.current[idx] = el
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                disabled={isLoading}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                onPaste={handleOtpPaste}
                className="w-10 h-12 sm:w-12 sm:h-12 text-center text-lg font-bold border rounded-lg border-gray-300 focus:border-[#1877F2] focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Didn&apos;t receive code?</span>
            <button
              type="button"
              disabled={!isResendActive || isLoading}
              onClick={handleResendOtp}
              className="font-semibold text-[#1877F2] hover:underline disabled:text-gray-400 disabled:no-underline cursor-pointer inline-flex items-center gap-1"
            >
              {isResendActive ? (
                <>
                  <RotateCcw className="w-3 h-3" />
                  <span>Resend Code</span>
                </>
              ) : (
                <>
                  <Clock className="w-3 h-3" />
                  <span>Resend in {timer}s</span>
                </>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-[#1877F2] hover:bg-blue-600 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <span>{isLoading ? 'Verifying...' : 'Verify & Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setStep('input')}
            className="w-full text-center text-xs text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            Change email address
          </button>
        </form>
      )}

      {step === 'profile' && (
        <form onSubmit={handleCompleteProfileSubmit} className="space-y-4">
          <div className="flex items-center justify-between px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center gap-2 min-w-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-emerald-900 truncate">
                {emailInput}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Verified
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                required
                disabled={isLoading}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1877F2] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="flex rounded-lg border border-gray-300 focus-within:border-[#1877F2] focus-within:ring-2 focus-within:ring-blue-500/20 overflow-hidden bg-white">
              <CountryPhoneSelect
                value={phoneCountryCode}
                onChange={(code) => setPhoneCountryCode(code)}
              />
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Phone className="h-4 w-4" />
                </div>
                <input
                  type="tel"
                  required
                  disabled={isLoading}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm text-gray-900 bg-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              City / Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <MapPin className="h-4 w-4" />
              </div>
              <input
                type="text"
                disabled={isLoading}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Kolkata, West Bengal"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1877F2] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-[#1877F2] hover:bg-blue-600 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <span>{isLoading ? 'Saving...' : 'Complete Profile & Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  )
}
