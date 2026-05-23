import { useState, useEffect } from 'react';

const floatingPoems = [
  '仰天大笑出门去',
  '黄鹤楼中吹玉笛',
  '孤帆远影碧空尽',
  '长风破浪会有时',
];

function PoemLine({ text }) {
  const pos = useState(() => ({
    top: 28 + Math.random() * 36,
    left: 62 + Math.random() * 16,
    delay: Math.random() * 8,
    color: Math.random() > 0.5 ? '#1F2D2B' : '#B98A3A',
    size: 18 + Math.random() * 4,
  }))[0];

  return (
    <div
      className="absolute whitespace-nowrap font-serif"
      style={{
        top: `${pos.top}%`,
        left: `${pos.left}%`,
        color: pos.color,
        fontSize: `${pos.size}px`,
        letterSpacing: '0.12em',
        opacity: 0,
        textShadow: '0 8px 22px rgba(31,45,43,0.16), 0 1px 0 rgba(255,255,255,0.72)',
        animation: `poemEmergeFloat 7s ease-in-out ${pos.delay}s infinite`,
      }}
    >
      {text}
    </div>
  );
}

export default function LiBaiAvatar({ avatarImage }) {
  const [visiblePoems, setVisiblePoems] = useState([]);

  useEffect(() => {
    // Rotate through poems
    const update = () => {
      const idx = Math.floor(Math.random() * floatingPoems.length);
      const next = floatingPoems[idx];
      setVisiblePoems((prev) => {
        if (prev.includes(next)) return prev;
        const updated = [...prev, next];
        return updated.length > 3 ? updated.slice(-3) : updated;
      });
    };
    update();
    const interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="relative hidden min-h-0 flex-col items-center justify-center overflow-visible lg:flex"
      style={{ zIndex: 10 }}>
      {/* Dynamic poems floating around */}
      {visiblePoems.map((p, i) => (
        <PoemLine key={`${p}-${i}`} text={p} />
      ))}

      {/* Multi-layer mist clouds */}
      <div className="absolute top-1/2 left-1/2 h-[460px] w-[380px] -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: -1 }}>
        <div className="absolute inset-0 rounded-full" style={{
          background: 'radial-gradient(ellipse at 30% 35%, rgba(140,195,160,0.18), transparent 58%)',
          animation: 'mistDriftH 10s ease-in-out infinite',
          filter: 'blur(46px)',
        }} />
        <div className="absolute inset-0 rounded-full" style={{
          background: 'radial-gradient(ellipse at 65% 55%, rgba(130,185,155,0.14), transparent 55%)',
          animation: 'mistDriftV 13s ease-in-out infinite',
          filter: 'blur(50px)',
        }} />
        <div className="absolute inset-0 rounded-full" style={{
          background: 'radial-gradient(ellipse at 50% 45%, rgba(201,168,106,0.08), transparent 62%)',
          animation: 'mistDriftH 16s ease-in-out infinite',
          filter: 'blur(45px)',
          animationDelay: '-3s',
        }} />
      </div>

      {/* Celadon soft glow */}
      <div className="absolute h-80 w-64 rounded-full" style={{
        background: 'radial-gradient(circle, rgba(140,195,160,0.18) 0%, rgba(160,200,180,0.06) 42%, transparent 68%)',
        filter: 'blur(20px)',
        animation: 'softBreathe 5s ease-in-out infinite',
      }} />

      {/* Gold halo ring */}
      <div className="absolute h-64 w-64 rounded-full" style={{
        border: '1.5px solid rgba(201,168,106,0.26)',
        boxShadow: '0 0 54px rgba(201,168,106,0.1)',
        animation: 'softBreathe 4s ease-in-out infinite',
      }} />
      <div className="absolute h-[300px] w-[300px] rounded-full" style={{
        border: '0.5px solid rgba(201,168,106,0.16)',
        animation: 'softBreathe 6s ease-in-out infinite',
        animationDelay: '-2.5s',
      }} />

      {/* Avatar circle — 绢本 silk scroll style */}
      <div className="relative mb-5 overflow-hidden rounded-full"
        style={{
          width: '220px', height: '220px',
          border: '1.5px solid rgba(201,168,106,0.4)',
          boxShadow: '0 18px 70px rgba(73,95,79,0.16), 0 2px 18px rgba(0,0,0,0.05)',
        }}>
        <img
          src={avatarImage || '/images/libai-avatar.png'}
          alt="李白头像"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Name */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#16243A] tracking-[0.24em]"
          style={{ fontFamily: "'Ma Shan Zheng', 'Noto Serif SC', serif" }}>
          太白
        </h2>
        <p className="text-[#16243A]/70 text-base tracking-[0.35em] mt-1">
          李 白
        </p>

        {/* AI诗仙导游 badge */}
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full
          bg-gold-200/30 border border-gold-400/20"
          style={{ animation: 'goldShimmer 4s ease-in-out infinite' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500"
            style={{ animation: 'softBreathe 2.5s ease-in-out infinite' }} />
          <span className="text-[#16243A]/75 text-xs tracking-[0.22em]">AI诗仙导游</span>
        </div>

        <div className="mt-3 pt-3 border-t border-ink-200/50">
          <p className="text-[#16243A]/70 text-xs tracking-[0.28em]">
            诗游荆楚
          </p>
          <p className="text-[#16243A]/65 text-[11px] tracking-[0.38em] mt-1">
            带你看湖北
          </p>
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-20 left-10 right-10 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(201,168,106,0.25), transparent)',
        }}
      />
    </aside>
  );
}
