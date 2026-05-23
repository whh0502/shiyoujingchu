import { useState, useRef, useEffect, useCallback } from 'react';
import Background from './components/Background';
import FloatingPoetry from './components/FloatingPoetry';
import LiBaiAvatar from './components/LiBaiAvatar';
import MessageBubble from './components/MessageBubble';
import RecommendedQuestions from './components/RecommendedQuestions';
import FeatureCards from './components/FeatureCards';
import FeatureModal from './components/FeatureModal';
import InputBox from './components/InputBox';

const ERROR_MSG = '本诗仙暂时醉倒了，请稍后再问。';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [scene, setScene] = useState('home');
  const [activeFeature, setActiveFeature] = useState(null);
  const chatEndRef = useRef(null);
  const lastMessageIdRef = useRef(0);
  const audioRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const sourceIndexRef = useRef(0);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const clearMusicFade = useCallback(() => {
    if (fadeTimerRef.current) {
      window.clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const prepareAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/bg.mp3');
      audioRef.current.loop = true;
      audioRef.current.preload = 'auto';
      audioRef.current.playsInline = true;
      audioRef.current.volume = 0;
      audioRef.current.load();
    }
    return audioRef.current;
  }, []);

  const fadeInMusic = useCallback(() => {
    const audio = prepareAudio();
    clearMusicFade();
    audio.volume = 0;
    fadeTimerRef.current = window.setInterval(() => {
      audio.volume = Math.min(0.2, audio.volume + 0.025);
      if (audio.volume >= 0.2) clearMusicFade();
    }, 120);
  }, [clearMusicFade, prepareAudio]);

  const playMusic = useCallback(() => {
    const sources = ['/audio/bg.mp3', '/audio/bg.flac'];
    const audio = prepareAudio();
    audio.muted = false;
    audio.volume = 0;

    const tryPlay = () => {
      audio.play()
        .then(fadeInMusic)
        .catch(() => {
          if (sourceIndexRef.current < sources.length - 1) {
            sourceIndexRef.current += 1;
            audio.src = sources[sourceIndexRef.current];
            audio.load();
            tryPlay();
          }
        });
    };

    tryPlay();
  }, [fadeInMusic, prepareAudio]);

  const pauseMusic = useCallback(() => {
    clearMusicFade();
    audioRef.current?.pause();
  }, [clearMusicFade]);

  const handleSend = useCallback(async (text) => {
    setScene('chat');
    const userMsg = { id: ++lastMessageIdRef.current, text, isUser: true, isNew: false };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text }),
      });
      if (!response.ok) throw new Error('Request failed');
      const data = await response.json();
      const aiMsg = {
        id: ++lastMessageIdRef.current,
        text: data.answer || ERROR_MSG,
        isUser: false,
        isNew: true,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: ++lastMessageIdRef.current, text: ERROR_MSG, isUser: false, isNew: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-[#f5f2eb] text-ink-800">
      <Background />
      <FloatingPoetry />
      <WelcomeIntro
        visible={showIntro}
        onEnterWithMusic={() => {
          playMusic();
          setMusicOn(true);
          setShowIntro(false);
        }}
        onEnterMuted={() => setShowIntro(false)}
      />
      <MusicToggle
        enabled={musicOn}
        onToggle={() => {
          if (musicOn) {
            pauseMusic();
            setMusicOn(false);
          } else {
            playMusic();
            setMusicOn(true);
          }
        }}
      />

      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 h-48"
        style={{
          zIndex: 3,
          background: 'linear-gradient(0deg, rgba(240,235,224,0.94), rgba(240,235,224,0.38) 58%, transparent)',
        }}
      />

      <main className="relative grid min-h-screen grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]" style={{ zIndex: 5 }}>
        <LiBaiAvatar />

        <section className="relative flex min-h-screen flex-col px-5 pb-8 pt-8 md:px-10 lg:px-10">
          {scene === 'home' ? (
            <div key="home" className="flex flex-1 flex-col items-center justify-start pt-2 animate-fade-in lg:justify-center lg:pt-0">
              <div className="relative w-full max-w-4xl text-center">
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(255,252,238,0.76), rgba(235,231,210,0.35) 38%, transparent 70%)',
                    filter: 'blur(4px)',
                  }}
                />
                <p
                  className="relative mb-3 animate-fade-in text-xs text-[#16243A]/70"
                  style={{ letterSpacing: '0.62em' }}
                >
                  东方山水中的 AI 诗仙空间
                </p>
                <h1
                  className="relative animate-fade-in font-calligraphy text-ink-800"
                  style={{
                    fontSize: 'clamp(42px, 6.4vw, 72px)',
                    letterSpacing: '12px',
                    fontWeight: 900,
                    color: '#16243A',
                    textShadow:
                      '0 16px 44px rgba(58,84,72,0.16), 0 2px 0 rgba(255,255,255,0.9), 0 0 46px rgba(201,168,106,0.12)',
                  }}
                >
                  诗游荆楚
                </h1>
                <p
                  className="relative mt-3 animate-fade-in font-serif text-sm text-[#16243A]/70 md:text-base"
                  style={{ animationDelay: '0.12s', letterSpacing: '0.42em' }}
                >
                  - 李白带你看湖北 -
                </p>
                <div className="relative mx-auto mt-5 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <InputBox onSend={handleSend} disabled={isLoading} />
                </div>
                <div className="relative mt-4 flex items-center justify-center gap-4">
                  <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold-500/35" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-500/40" />
                  <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold-500/35" />
                </div>
              </div>

              <div className="mt-7 w-full max-w-5xl animate-fade-in" style={{ animationDelay: '0.32s' }}>
                <FeatureCards onSelect={setActiveFeature} variant="scroll" />
              </div>

              <div className="mt-5 w-full max-w-xl">
                <RecommendedQuestions onSelect={handleSend} />
              </div>
            </div>
          ) : (
            <div key="chat" className="flex min-h-0 flex-1 flex-col animate-fade-in">
              <header className="relative shrink-0 pb-5 text-center">
                <button
                  type="button"
                  onClick={() => setScene('home')}
                  className="absolute left-0 top-2 rounded-full border border-gold-500/20 bg-white/45 px-4 py-2 font-serif text-sm tracking-[0.12em] text-[#16243A]/75 shadow-[0_8px_24px_rgba(54,75,62,0.06)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/40 hover:bg-white/65"
                >
                  返回首页
                </button>
                <h1
                  role="button"
                  tabIndex={0}
                  onClick={() => setScene('home')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setScene('home');
                  }}
                  className="font-calligraphy text-[42px] text-[#16243A] md:text-[56px]"
                  style={{ letterSpacing: '12px', fontWeight: 900, textShadow: '0 8px 24px rgba(68,92,78,0.13)', cursor: 'pointer' }}
                >
                  诗游荆楚
                </h1>
                <p className="mt-2 text-sm text-[#16243A]/70 tracking-[0.32em]">- 李白带你看湖北 -</p>
              </header>

              <section className="min-h-0 flex-1 overflow-y-auto px-1 py-2">
                <div className="mx-auto max-w-3xl">
                  {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg.text} isUser={msg.isUser} isNew={msg.isNew} />
                  ))}

                  {isLoading && (
                    <div className="mb-4 flex justify-start animate-fade-in">
                      <div
                        className="relative overflow-hidden rounded-2xl rounded-bl-md px-5 py-4"
                        style={{
                          background: 'rgba(255,255,255,0.52)',
                          backdropFilter: 'blur(18px)',
                          border: '1px solid rgba(201,168,106,0.12)',
                          boxShadow: '0 8px 30px rgba(201,168,106,0.08)',
                          animation: 'goldShimmer 4s ease-in-out infinite',
                        }}
                      >
                        <div
                          className="absolute inset-0 opacity-40"
                          style={{
                            background: 'radial-gradient(ellipse at 25% 50%, rgba(238,241,230,0.7), transparent 58%)',
                            animation: 'foregroundMist 10s ease-in-out infinite',
                          }}
                        />
                        <div className="relative mb-2 text-xs text-[#16243A]/70 tracking-[0.2em]">
                          太白正在观江酝酿诗句……
                        </div>
                        <div className="relative flex gap-1.5">
                          {[0, 150, 300].map((delay) => (
                            <div
                              key={delay}
                              className="h-2 w-2 animate-bounce rounded-full bg-gold-500/55"
                              style={{ animationDelay: `${delay}ms` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>
              </section>

              <div className="shrink-0 px-1 pb-3 pt-4">
                <InputBox onSend={handleSend} disabled={isLoading} />
              </div>
            </div>
          )}
        </section>
      </main>

      {activeFeature && <FeatureModal feature={activeFeature} onClose={() => setActiveFeature(null)} />}

      <div
        className="fixed bottom-0 left-0 right-0 h-px"
        style={{
          zIndex: 5,
          background: 'linear-gradient(90deg, transparent, rgba(201,168,106,0.32), transparent)',
        }}
      />
    </div>
  );
}

function WelcomeIntro({ visible, onEnterWithMusic, onEnterMuted }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#f5f2eb]/86 backdrop-blur-sm" style={{ zIndex: 80 }}>
      <div
        className="absolute inset-x-0 top-1/2 h-40 -translate-y-1/2"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(238,241,230,0.72), rgba(216,226,210,0.22) 45%, transparent 72%)',
          filter: 'blur(18px)',
          animation: 'foregroundMist 9s ease-in-out infinite',
        }}
      />
      <div className="relative text-center">
        <p
          className="font-calligraphy text-[34px] leading-[1.9] text-[#16243A] md:text-[46px]"
          style={{
            letterSpacing: '0.18em',
            textShadow: '0 14px 40px rgba(58,84,72,0.18), 0 1px 0 rgba(255,255,255,0.9)',
            animation: 'inkWelcomeHold 1.8s ease-out forwards',
          }}
        >
          仰天大笑出门去，<br />
          且随太白游荆楚。
        </p>
        <div className="mx-auto mt-6 h-px w-56 bg-gradient-to-r from-transparent via-gold-500/35 to-transparent" />
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onEnterWithMusic}
            className="rounded-full border border-gold-500/30 bg-white/55 px-6 py-3 font-serif text-sm tracking-[0.14em] text-[#16243A]/85 shadow-[0_10px_34px_rgba(201,168,106,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/50 hover:bg-white/75"
          >
            开启山水雅乐，进入诗游荆楚
          </button>
          <button
            type="button"
            onClick={onEnterMuted}
            className="rounded-full border border-[#16243A]/10 bg-white/30 px-5 py-2.5 font-serif text-xs tracking-[0.14em] text-[#16243A]/65 backdrop-blur-md transition-all duration-300 hover:bg-white/55"
          >
            静音进入
          </button>
        </div>
      </div>
    </div>
  );
}

function MusicToggle({ enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed right-5 top-5 z-50 inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-white/45 px-3.5 py-2 font-serif text-xs tracking-[0.12em] text-[#16243A]/75 shadow-[0_8px_24px_rgba(54,75,62,0.06)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/45 hover:bg-white/65 hover:shadow-[0_0_28px_rgba(201,168,106,0.16)]"
      aria-pressed={enabled}
    >
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full border border-gold-500/20 bg-gold-200/20 text-sm text-gold-700/80"
        style={{ animation: enabled ? 'goldShimmer 2.4s ease-in-out infinite' : undefined }}
      >
        乐
      </span>
      <span>山水雅乐</span>
      <span className="text-gold-700/70">{enabled ? '开' : '关'}</span>
    </button>
  );
}
