import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, Mail, KeyRound, ShieldCheck, Clock, RefreshCw, ArrowRight, CheckCircle2, AlertCircle, Copy, Check, Zap, Inbox, Info } from 'lucide-react';
import { AdminUser } from '../types';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (admin: AdminUser) => void;
}

const AUTHORIZED_EMAIL = 'client@webmedia.al';
const AUTHORIZED_EMAIL_ALT = 'clinet@webmedia.al';
const GENERATED_MASTER_PASSWORD = 'CaboVerde2026!Admin';

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated,
}) => {
  // Step: 'credentials' -> 'otp'
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  
  // Credentials state
  const [email, setEmail] = useState<string>(AUTHORIZED_EMAIL);
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [copiedPass, setCopiedPass] = useState<boolean>(false);
  const [copiedOtp, setCopiedOtp] = useState<boolean>(false);

  // OTP state
  const [otpCode, setOtpCode] = useState<string[]>(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(30); // 30 seconds OTP requirement
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [otpNotification, setOtpNotification] = useState<string | null>(null);
  const [resending, setResending] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to generate 6-digit random code
  const createNewOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    return code;
  };

  // Start 30-second countdown timer
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(30);
    setIsExpired(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  // Handle Step 1: Submit Credentials
  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (password !== GENERATED_MASTER_PASSWORD) {
      setErrorMsg('Invalid password. Please use the generated master password provided below.');
      return;
    }

    // Credentials valid -> Generate OTP & dispatch email
    const code = createNewOtp();
    setStep('otp');
    setOtpCode(['', '', '', '', '', '']);
    startTimer();

    // Simulated email dispatch notification
    setOtpNotification(`Security Notice: 6-Digit One-Time Passcode (${code}) generated for ${normalizedEmail}`);

    // Focus first OTP input
    setTimeout(() => {
      otpInputRefs.current[0]?.focus();
    }, 100);
  };

  // Handle Resend OTP
  const handleResendOtp = () => {
    setResending(true);
    setErrorMsg('');
    const code = createNewOtp();
    setOtpCode(['', '', '', '', '', '']);
    startTimer();

    setOtpNotification(`New OTP code (${code}) sent to ${AUTHORIZED_EMAIL}`);
    setTimeout(() => {
      setResending(false);
      otpInputRefs.current[0]?.focus();
    }, 400);
  };

  // Handle OTP input digits
  const handleOtpChange = (index: number, value: string) => {
    if (isExpired) return;

    // Allow only single numeric digit
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = digit;
    setOtpCode(newOtp);

    // Auto-advance to next input
    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if all 6 digits are filled
    const fullCode = newOtp.join('');
    if (fullCode.length === 6 && !fullCode.includes('')) {
      verifyOtpCode(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handlePasteOtp = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newOtp = ['', '', '', '', '', ''];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtpCode(newOtp);

    if (pasted.length === 6) {
      verifyOtpCode(pasted);
    } else {
      otpInputRefs.current[pasted.length]?.focus();
    }
  };

  // Verify OTP
  const verifyOtpCode = (enteredCode: string) => {
    if (isExpired) {
      setErrorMsg('This OTP code has expired. Please click "Resend OTP Code via Email" below.');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsVerifying(false);
      if (enteredCode === generatedOtp) {
        // Success!
        if (timerRef.current) clearInterval(timerRef.current);
        const admin: AdminUser = {
          email: email.trim().toLowerCase() || AUTHORIZED_EMAIL,
          isAuthenticated: true,
          role: 'admin',
          loginTime: new Date().toISOString(),
        };
        onAuthenticated(admin);
        onClose();
      } else {
        setErrorMsg('Incorrect OTP code. Please enter the 6-digit code shown above or click "Auto-Fill".');
      }
    }, 450);
  };

  const handleAutoFillOtp = () => {
    if (isExpired || !generatedOtp) return;
    const digits = generatedOtp.split('');
    setOtpCode(digits);
    verifyOtpCode(generatedOtp);
  };

  const copyOtp = () => {
    if (!generatedOtp) return;
    navigator.clipboard.writeText(generatedOtp);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(GENERATED_MASTER_PASSWORD);
    setPassword(GENERATED_MASTER_PASSWORD);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2000);
  };

  const useDefaultCredentials = () => {
    setEmail(AUTHORIZED_EMAIL);
    setPassword(GENERATED_MASTER_PASSWORD);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase">
                CABO VERDE ARCHITECTURAL
              </span>
              <h2 className="text-xl font-black text-white tracking-tight">
                {step === 'credentials' ? 'Admin Portal Authentication' : 'Two-Factor OTP Verification'}
              </h2>
            </div>
          </div>
        </div>

        {/* STEP 1: CREDENTIALS (Email & Generated Password) */}
        {step === 'credentials' && (
          <form onSubmit={handleCredentialsSubmit} className="p-6 sm:p-7 space-y-5">
            
            {/* Security Notice */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900">
              <div className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Restricted Access &bull; Two-Factor Protected</p>
                  <p className="mt-0.5 text-amber-800 leading-relaxed">
                    Product catalog upload and showroom curation is strictly restricted to{' '}
                    <span className="font-mono font-bold text-amber-950">{AUTHORIZED_EMAIL}</span>. An OTP code with a 30s expiry is required.
                  </p>
                </div>
              </div>
            </div>

            {/* Generated Master Password Quick-Fill Helper */}
            <div className="bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200 flex items-center justify-between gap-3">
              <div className="truncate">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                  Generated Master Key
                </span>
                <span className="text-xs font-mono font-bold text-neutral-800 select-all">
                  {GENERATED_MASTER_PASSWORD}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={copyPassword}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300 hover:border-neutral-900 text-xs font-bold text-neutral-700 hover:text-neutral-900 transition-colors shadow-xs cursor-pointer"
                  title="Copy password"
                >
                  {copiedPass ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPass ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={useDefaultCredentials}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-red-600 text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
                >
                  Auto-Fill
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                Administrative Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@webmedia.al"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-neutral-900 focus:bg-white focus:outline-none focus:border-red-600 transition-all font-mono"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-neutral-700">
                  Master Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] font-semibold text-neutral-500 hover:text-red-600 cursor-pointer"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter generated master password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-neutral-900 focus:bg-white focus:outline-none focus:border-red-600 transition-all font-mono"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-neutral-900 hover:bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Verify &amp; Request OTP Code</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-neutral-400 text-center">
              Requires 2-Factor authentication via OTP sent to {AUTHORIZED_EMAIL}.
            </p>
          </form>
        )}

        {/* STEP 2: 30-SECOND OTP POPUP */}
        {step === 'otp' && (
          <div className="p-6 sm:p-7 space-y-5">
            
            {/* Live Virtual Dispatch Box with OTP code */}
            <div className="bg-neutral-900 text-white rounded-2xl p-4 border border-neutral-700 shadow-xl animate-in slide-in-from-top duration-300">
              <div className="flex items-center justify-between gap-2 border-b border-neutral-800 pb-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                    <Inbox className="w-3.5 h-3.5" />
                    <span>Virtual Mail Delivery</span>
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono truncate max-w-[170px]">
                  To: {email}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 text-[11px] text-amber-200">
                  <Info className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="leading-tight">
                    In this preview, emails are generated directly in this window. Use the code below:
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2.5 bg-black/50 rounded-xl p-2.5 border border-neutral-800">
                  <div className="flex items-center gap-1 select-all">
                    {generatedOtp.split('').map((digit, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center justify-center w-7 h-8.5 rounded-md bg-white text-neutral-950 font-mono font-black text-lg shadow-sm"
                      >
                        {digit}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={copyOtp}
                      className="px-2 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer border border-neutral-700"
                      title="Copy OTP code"
                    >
                      {copiedOtp ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedOtp ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleAutoFillOtp}
                      disabled={isExpired}
                      className="px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer shadow-md hover:scale-102 active:scale-98 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <Zap className="w-3 h-3 fill-current" />
                      <span>Auto-Fill</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 30-Second Countdown Timer Display */}
            <div className="flex items-center justify-between bg-neutral-50 rounded-2xl p-4 border border-neutral-200">
              <div className="flex items-center gap-2.5">
                <Clock className={`w-5 h-5 ${isExpired ? 'text-red-500' : 'text-amber-600 animate-pulse'}`} />
                <div>
                  <span className="text-xs font-bold text-neutral-800 block">
                    {isExpired ? 'Passcode Expired' : 'Passcode Valid For'}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Strict 30-second security window
                  </span>
                </div>
              </div>

              {/* Countdown Numbers */}
              <div className={`text-xl font-mono font-black px-3.5 py-1 rounded-xl border ${
                isExpired
                  ? 'bg-red-100 text-red-700 border-red-300'
                  : timeLeft <= 10
                  ? 'bg-amber-100 text-amber-900 border-amber-300 animate-bounce'
                  : 'bg-white text-neutral-900 border-neutral-300 shadow-xs'
              }`}>
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
              </div>
            </div>

            {/* 30s Progress Bar */}
            <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-linear ${
                  isExpired ? 'bg-red-500' : timeLeft <= 10 ? 'bg-amber-500' : 'bg-red-600'
                }`}
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              />
            </div>

            {/* 6-Digit OTP Inputs */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-3 text-center">
                Enter 6-Digit Passcode (or click &quot;Auto-Fill&quot; above):
              </label>

              <div className="flex justify-center gap-2 sm:gap-2.5" onPaste={handlePasteOtp}>
                {otpCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      otpInputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    disabled={isExpired || isVerifying}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-11 h-13 sm:w-12 sm:h-14 text-center font-mono text-xl font-black rounded-xl border-2 transition-all outline-none ${
                      isExpired
                        ? 'bg-neutral-100 border-neutral-200 text-neutral-400'
                        : digit
                        ? 'border-neutral-900 bg-white shadow-sm'
                        : 'border-neutral-300 bg-neutral-50 focus:border-red-600 focus:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Verify Button (if not auto-submitted) */}
            <button
              type="button"
              disabled={isExpired || isVerifying || otpCode.join('').length < 6}
              onClick={() => verifyOtpCode(otpCode.join(''))}
              className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                isExpired || isVerifying || otpCode.join('').length < 6
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-neutral-900 hover:bg-red-600 text-white shadow-md active:scale-98 cursor-pointer'
              }`}
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm OTP &amp; Enter Portal</span>
                </>
              )}
            </button>

            {/* Resend OTP Button with Email */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-neutral-100 text-xs">
              <button
                type="button"
                onClick={() => {
                  setStep('credentials');
                  setErrorMsg('');
                }}
                className="text-neutral-500 hover:text-neutral-900 font-semibold cursor-pointer"
              >
                &larr; Back to Login
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resending}
                className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-bold hover:underline cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
                <span>Resend OTP Code via Email</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
