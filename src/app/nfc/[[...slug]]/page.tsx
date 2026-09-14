'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Smartphone,
  ShieldCheck,
  Zap,
  CreditCard,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function NfcLandingPage() {
  const params = useParams();
  const slug = params?.slug as string[] | undefined;
  const merchantUuid = slug && slug.length > 0 ? slug[0] : null;

  const [copied, setCopied] = useState(false);
  const [storeNotice, setStoreNotice] = useState<string | null>(null);

  const handleCopy = () => {
    if (merchantUuid) {
      navigator.clipboard.writeText(merchantUuid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenApp = () => {
    if (merchantUuid) {
      // Attempt custom scheme open
      window.location.href = `nfcpay://nfc/${merchantUuid}`;
      setTimeout(() => {
        setStoreNotice("Agar ilova ochilmasa, uni quyidagi do'konlardan yuklab oling.");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-b from-cyan-500/15 via-indigo-500/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] bg-purple-500/10 blur-[130px] rounded-full" />
      </div>

      {/* Top Navigation */}
      <header className="relative z-10 border-b border-zinc-800/80 backdrop-blur-md bg-zinc-950/40 sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                NFC Pay
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  App
                </span>
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1 py-1 px-3 rounded-lg hover:bg-zinc-800/50"
          >
            <span>portfoliodox.uz</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-20">
        {/* Merchant UUID Detected Notification */}
        {merchantUuid && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-cyan-500/30 shadow-xl shadow-cyan-950/30 backdrop-blur-xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5 sm:mt-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      NFC Teg aniqlandi • To&apos;lovga tayyor
                    </p>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">Savdogar terminal ID raqami:</p>
                  <p className="text-sm font-mono text-zinc-200 mt-1 break-all bg-zinc-950/60 px-2.5 py-1 rounded-md border border-zinc-800/80 inline-block">
                    {merchantUuid}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCopy}
                  type="button"
                  className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/70 hover:bg-zinc-800 border border-zinc-700 rounded-xl transition-all flex items-center gap-1.5"
                  title="UUID nusxalash"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Nusxalandi' : 'Nusxa olish'}</span>
                </button>
                <button
                  onClick={handleOpenApp}
                  type="button"
                  className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-zinc-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-400/20 flex items-center justify-center gap-1.5"
                >
                  <span>Ilovada ochish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {storeNotice && (
              <p className="text-xs text-amber-400/90 mt-3 pt-3 border-t border-zinc-800/80">
                {storeNotice}
              </p>
            )}
          </motion.div>
        )}

        {/* Hero Section */}
        <section className="text-center pt-2 sm:pt-6 pb-12">
          {/* Animated Contactless Pulse Icon */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <span className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-cyan-500/15 animate-ping opacity-60 pointer-events-none" />
            <span className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-indigo-500/20 animate-pulse pointer-events-none" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1.5px] shadow-2xl shadow-cyan-500/30">
              <div className="w-full h-full bg-[#0d0d10] rounded-[22px] flex items-center justify-center">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 8.32a7.43 7.43 0 0 1 0 7.36" />
                  <path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58" />
                  <path d="M12.91 4.1a15.91 15.91 0 0 1 0 15.8" />
                  <path d="M16.37 2a20.16 20.16 0 0 1 0 20" />
                </svg>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Yangi avlod kontaktsiz to&apos;lov tizimi</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-[1.15]">
            Bir teginishda{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              tezkor va xavfsiz
            </span>{' '}
            to&apos;lovlar
          </h1>

          <p className="text-zinc-400 text-sm sm:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
            Telefoningizni savdogarning NFC tegiga yoki terminaliga tekkizing va bir soniyada to&apos;lovni amalga oshiring. QR-kod skanerlash shart emas.
          </p>

          {/* ========================================================= */}
          {/* TWO MAIN STORE BUTTONS: PLAY MARKET & APP STORE            */}
          {/* ========================================================= */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            {/* Google Play Store Button */}
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-56 h-16 px-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-700/80 hover:border-cyan-500/50 shadow-xl shadow-black/40 flex items-center gap-4 transition-all duration-200 group"
            >
              {/* Google Play Icon */}
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                <svg className="w-7 h-7" viewBox="0 0 24 24">
                  <path
                    d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-.715 2.454 2.454 0 0 1-.226-1.127V3.656c0-.41.08-.8.226-1.127.127-.29.336-.537.609-.715z"
                    fill="#00E676"
                  />
                  <path
                    d="M17.18 8.614l-3.388 3.386L3.61 1.814c.26-.17.568-.27.9-.27.42 0 .82.16 1.13.43l11.54 6.64z"
                    fill="#FFD600"
                  />
                  <path
                    d="M13.792 12l3.388 3.386-11.54 6.64a1.85 1.85 0 0 1-1.13.43c-.332 0-.64-.1-.9-.27L13.792 12z"
                    fill="#FF1744"
                  />
                  <path
                    d="M20.57 10.567l-3.39-1.953-3.388 3.386 3.388 3.386 3.39-1.953a1.64 1.64 0 0 0 .83-1.433c0-.62-.33-1.19-.83-1.433z"
                    fill="#00B0FF"
                  />
                </svg>
              </div>
              <div className="text-left leading-tight">
                <span className="block text-[10px] uppercase font-medium text-zinc-400 tracking-wider">
                  Yuklab oling
                </span>
                <span className="block text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Google Play
                </span>
              </div>
            </a>

            {/* Apple App Store Button */}
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-56 h-16 px-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-700/80 hover:border-cyan-500/50 shadow-xl shadow-black/40 flex items-center gap-4 transition-all duration-200 group"
            >
              {/* Apple Icon */}
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                <svg className="w-7 h-7 fill-white group-hover:fill-cyan-300 transition-colors" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.03-7.6-7.79-11.71-14.28-5.99-9.44-10.74-20.09-14.25-31.95-3.51-11.86-5.27-23.08-5.27-33.67 0-14.34 3.73-26.31 11.19-35.91 7.46-9.6 16.79-14.53 27.97-14.78 4.67 0 9.87 1.25 15.6 3.76 5.73 2.51 9.45 3.82 11.16 3.93 1.94-.22 5.92-1.63 11.94-4.22 6.02-2.6 11.22-3.8 15.6-3.6 11.5.76 21.05 4.88 28.64 12.37-10.22 6.2-15.22 14.78-15 25.75.22 8.48 3.51 15.66 9.87 21.52 6.36 5.86 13.91 9.13 22.65 9.81-2.28 6.96-5.06 14.13-8.33 21.52zM119.22 31.84c0-7.39 2.66-14.18 7.98-20.37 5.33-6.2 11.79-10.11 19.38-11.74.87 7.07-1.41 13.8-6.85 20.2-5.43 6.41-11.95 10.38-19.56 11.91-.21-.87-.95-1.2-.95-2.07z" />
                </svg>
              </div>
              <div className="text-left leading-tight">
                <span className="block text-[10px] uppercase font-medium text-zinc-400 tracking-wider">
                  Yuklab oling
                </span>
                <span className="block text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  App Store
                </span>
              </div>
            </a>
          </div>

          <p className="text-xs text-zinc-500 mt-4">
            Android (NFC qo&apos;llab-quvvatlovchi) va iOS (iPhone XS va undan yangi) qurilmalarida ishlaydi.
          </p>
        </section>

        {/* Feature Bento Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 hover:border-cyan-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1 Soniyada To&apos;lov</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Hech qanday kamerani yoqib QR-kod qidirish shart emas. Shunchaki telefonni teggizsangiz kifoya.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 hover:border-indigo-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Biometrik Xavfsizlik</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Mablag&apos;ingiz qat&apos;iy himoyalangan. Har bir tranzaksiya Face ID yoki barmoq izi orqali tasdiqlanadi.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 hover:border-purple-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Barcha Bank Kartalari</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Humo, Uzcard, Visa va Mastercard kartalaringizni ulab, istalgan biridan qulay to&apos;lang.
            </p>
          </div>
        </section>

        {/* 3 Step Instruction */}
        <section className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-zinc-800">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Qanday ishlaydi?</h2>
            <p className="text-sm text-zinc-400 mt-2">
              NFC orqali xarid qilish uchun bor-yo&apos;g&apos;i 3 ta oddiy qadam:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-extrabold text-lg flex items-center justify-center mb-4">
                1
              </div>
              <h4 className="text-base font-semibold text-white mb-1.5">Ilovani yuklab oling</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Google Play yoki App Store dan ilovani o&apos;rnating va bank kartangizni biriktiring.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-extrabold text-lg flex items-center justify-center mb-4">
                2
              </div>
              <h4 className="text-base font-semibold text-white mb-1.5">NFC tegga tekkizing</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Telefoningizni savdogarning kassa stolida turgan NFC tegga tekkizing.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-extrabold text-lg flex items-center justify-center mb-4">
                3
              </div>
              <h4 className="text-base font-semibold text-white mb-1.5">Tasdiqlang va to&apos;lang</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Ekranda summani tekshiring va Face ID / barmoq izi bilan bir zumda to&apos;lang.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} NFC Pay. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-bit SSL Shifrlangan</span>
            </span>
            <span>•</span>
            <Link href="/" className="hover:text-zinc-300 transition-colors">
              portfoliodox.uz
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
