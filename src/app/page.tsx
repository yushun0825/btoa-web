'use client';

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const messages = [
  "研究に、ビジネスの風を。",
  "研究は投資先。未来の事業を先取りする。"
];

// Header Component
function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-80 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-white hover:text-gray-300 transition">BtoA</a>
        <nav className="space-x-6 text-sm text-gray-300 hidden md:block">
          <a href="#features" className="hover:text-white">機能紹介</a>
          <a href="#contact" className="hover:text-white">お問い合わせ</a>
        </nav>
      </div>
    </header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 text-center text-sm">
      <p>© {new Date().getFullYear()} BtoA. All rights reserved.</p>
    </footer>
  );
}

function AnimatedText({ text }: { text: string }) {
  return (
    <span className="inline-block">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function BackgroundParticles() {
  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return useMemo(
    () => (
      <Particles
        id="tsparticles"
        className="absolute inset-0 z-0"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "#000000" },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: true, color: "#ffffff", distance: 150 },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              outModes: { default: "out" },
            },
            number: { value: 300 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: 2 },
          },
          detectRetina: true,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 }
            }
          }
        }}
      />
    ),
    []
  );
}

export default function Home() {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <main className="bg-black text-white pt-20 relative overflow-hidden">
        <BackgroundParticles />

        <section className="relative z-10 flex flex-col items-center justify-center h-screen px-6 text-center">
          <div className="text-4xl md:text-6xl font-bold mb-6" style={{ perspective: 1000 }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={flipped ? "academic" : "simple"}
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: -90, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {flipped ? "Academic to Business" : "A to B"}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl">
            ビジネスとアカデミックをつなぐ、次世代のプラットフォーム。
          </p>
          <Link
            href="/login"
            className="bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-200 transition"
          >
            プラットフォームを見る
          </Link>
        </section>

        {/* Catchcopy Sections */}
        {messages.map((text, index) => (
          <section
            key={index}
            className="relative z-10 flex items-center justify-center min-h-screen px-6 overflow-hidden"
          >
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-3xl md:text-6xl font-semibold text-center max-w-7xl leading-tight whitespace-nowrap"
            >
              <AnimatedText text={text} />
            </motion.h2>
          </section>
        ))}

        {/* Features Section */}
        <section id="features" className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">BtoAでできること</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
            <div className="bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">🎓 研究室データベース</h3>
              <p className="text-gray-300">信頼できる研究室情報を一元化し、研究内容や連携実績を把握できます。</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">🤝 マッチング機能</h3>
              <p className="text-gray-300">学生・研究室・企業をつなぐマッチングで、最適な出会いを実現します。</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">🧑‍💼 就活支援オファー</h3>
              <p className="text-gray-300">企業と学生が双方向でオファーを送り合う、パーソナルな就活支援機能。</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">お問い合わせ</h2>
          <p className="text-md text-gray-700 mb-8 max-w-xl">
            企業連携・サービス利用に関するご質問やご相談はこちらから。
          </p>
          <form className="w-full max-w-md space-y-4">
            <input
              type="email"
              placeholder="メールアドレス"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="お問い合わせ内容"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              送信する
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
