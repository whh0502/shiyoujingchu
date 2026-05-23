import { useMemo } from 'react';

const POEMS = ['黄鹤楼中吹玉笛', '唯见长江天际流', '长风破浪会有时'];

function FloatingMist({ index, layer }) {
  const style = useMemo(() => {
    const isFront = layer === 'front';
    const width = isFront ? 520 + Math.random() * 420 : 420 + Math.random() * 360;
    const left = Math.random() * 110 - 10;
    const top = isFront ? 58 + Math.random() * 30 : 12 + Math.random() * 56;
    const opacity = isFront ? 0.22 : 0.16;
    return {
      width,
      height: width * (0.24 + Math.random() * 0.16),
      left: `${left}%`,
      top: `${top}%`,
      opacity,
      filter: `blur(${isFront ? 24 : 34}px)`,
      animation: `${isFront ? 'foregroundMist' : 'mistDriftH'} ${18 + Math.random() * 18}s ease-in-out infinite`,
      animationDelay: `${Math.random() * -18}s`,
    };
  }, [index, layer]);

  return (
    <div
      className="absolute rounded-full"
      style={{
        ...style,
        background:
          'radial-gradient(ellipse at center, rgba(239,244,232,0.95), rgba(184,204,184,0.38) 48%, transparent 76%)',
      }}
    />
  );
}

function PoetryParticle({ index }) {
  const style = useMemo(() => {
    const left = 18 + Math.random() * 70;
    const top = 18 + Math.random() * 62;
    return {
      left: `${left}%`,
      top: `${top}%`,
      animation: `poemEmergeFloat ${9 + Math.random() * 5}s ease-in-out ${Math.random() * -10}s infinite`,
    };
  }, [index]);

  return (
    <div
      className="absolute whitespace-nowrap font-serif text-sm tracking-[0.16em]"
      style={{
        ...style,
        color: index % 2 ? 'rgba(185,138,58,0.46)' : 'rgba(31,45,43,0.34)',
        textShadow: '0 8px 22px rgba(31,45,43,0.12), 0 1px 0 rgba(255,255,255,0.75)',
      }}
    >
      {POEMS[index % POEMS.length]}
    </div>
  );
}

function GoldParticle({ index }) {
  const style = useMemo(
    () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${2 + Math.random() * 3}px`,
      height: `${2 + Math.random() * 3}px`,
      animation: `goldFloat ${9 + Math.random() * 10}s ease-in-out ${Math.random() * -10}s infinite`,
    }),
    [index]
  );

  return (
    <span
      className="absolute rounded-full"
      style={{
        ...style,
        background: 'radial-gradient(circle, rgba(212,188,122,0.72), rgba(201,168,106,0))',
      }}
    />
  );
}

export default function Background({ generatedImage }) {
  const backMist = useMemo(() => Array.from({ length: 8 }, (_, i) => <FloatingMist key={`b-${i}`} index={i} layer="back" />), []);
  const frontMist = useMemo(() => Array.from({ length: 7 }, (_, i) => <FloatingMist key={`f-${i}`} index={i} layer="front" />), []);
  const poems = useMemo(() => Array.from({ length: 7 }, (_, i) => <PoetryParticle key={i} index={i} />), []);
  const particles = useMemo(() => Array.from({ length: 36 }, (_, i) => <GoldParticle key={i} index={i} />), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, #f8f5ec 0%, #f1efe3 34%, #e8eadb 62%, #f5f1e6 100%)',
        }}
      />

      {generatedImage && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(248,245,236,0.52), rgba(248,245,236,0.72)), url(${generatedImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: 0.24,
            filter: 'saturate(0.9) contrast(0.96)',
          }}
        />
      )}

      {/* Far view: Wudang cloud sea and ink mountains */}
      <section className="absolute inset-x-0 top-0 h-[42%]" style={{ opacity: 0.26 }}>
        <svg className="absolute inset-x-0 bottom-0 h-full w-full" viewBox="0 0 1440 360" preserveAspectRatio="none">
          <path
            d="M0 330 L0 185 Q72 146 145 174 Q230 110 312 148 Q405 88 500 132 Q575 66 650 124 Q730 58 812 112 Q890 72 968 105 Q1050 48 1140 92 Q1240 54 1325 98 Q1390 76 1440 100 L1440 330 Z"
            fill="rgba(74,103,92,0.34)"
          />
          <path
            d="M0 350 L0 230 Q120 188 240 218 Q355 148 470 196 Q610 126 748 178 Q888 118 1020 168 Q1160 108 1300 164 Q1380 138 1440 158 L1440 350 Z"
            fill="rgba(128,157,139,0.32)"
          />
        </svg>
        <div
          className="absolute inset-x-0 bottom-0 h-28"
          style={{
            background: 'linear-gradient(0deg, rgba(242,241,229,0.95), rgba(230,236,224,0.46), transparent)',
            animation: 'mountainMist 14s ease-in-out infinite',
          }}
        />
      </section>

      {/* Middle view: Yellow Crane Tower, Yangtze rain and East Lake contour */}
      <section className="absolute inset-x-0 top-[22%] h-[54%]" style={{ opacity: 0.24 }}>
        <div className="absolute left-[12%] right-[8%] top-[52%] h-24">
          <svg viewBox="0 0 1200 160" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0 86 C130 56 220 118 360 80 C510 38 650 118 805 80 C965 40 1060 96 1200 68 L1200 160 L0 160 Z"
              fill="rgba(107,139,128,0.28)"
            />
            <path
              d="M70 96 C210 76 310 116 450 92 C610 64 720 115 880 90 C1010 70 1100 92 1190 78"
              fill="none"
              stroke="rgba(185,138,58,0.38)"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="absolute bottom-[2%] right-[13%] h-28 w-[26%] rounded-[50%]" style={{
          border: '1px solid rgba(88,124,112,0.28)',
          background: 'radial-gradient(ellipse at center, rgba(183,206,190,0.24), transparent 68%)',
          transform: 'rotate(-5deg)',
        }} />
        <div className="absolute bottom-[18%] right-[17%] h-[310px] w-[230px]">
          <div
            className="absolute inset-0"
            style={{
              clipPath:
                'polygon(50% 0, 56% 6%, 68% 4%, 80% 13%, 92% 18%, 100% 30%, 82% 35%, 75% 100%, 25% 100%, 18% 35%, 0 30%, 8% 18%, 20% 13%, 32% 4%, 44% 6%)',
              background:
                'linear-gradient(180deg, rgba(31,45,43,0.55), rgba(65,88,80,0.28) 46%, rgba(96,116,104,0.08))',
            }}
          />
        </div>
        <div
          className="absolute inset-x-0 top-[35%] h-40"
          style={{
            background:
              'linear-gradient(180deg, transparent, rgba(232,237,224,0.44), transparent), repeating-linear-gradient(90deg, transparent 0 42px, rgba(31,45,43,0.05) 43px, transparent 44px)',
            animation: 'mistRise 12s ease-in-out infinite',
          }}
        />
      </section>

      {/* Ambient depth, blur and breath */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 58% 42%, rgba(255,252,236,0.82), rgba(255,252,236,0.36) 34%, transparent 66%), radial-gradient(ellipse at 18% 54%, rgba(126,171,145,0.18), transparent 44%)',
          backdropFilter: 'blur(0.8px)',
          animation: 'softBreathe 8s ease-in-out infinite',
        }}
      />

      {backMist}
      {poems}
      {particles}

      {/* Foreground: drifting mist and water ripple */}
      <section className="absolute inset-x-0 bottom-0 h-[38%]">
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              'linear-gradient(0deg, rgba(244,240,229,0.94), rgba(236,238,226,0.5) 50%, transparent)',
          }}
        />
        <div className="absolute inset-x-[8%] bottom-20 h-20">
          <svg className="h-full w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M${20 + i * 18} ${34 + i * 16} C190 ${8 + i * 18} 310 ${66 + i * 8} 480 ${42 + i * 14} C660 ${18 + i * 14} 770 ${72 + i * 6} 940 ${46 + i * 12} C1040 ${32 + i * 8} 1130 ${42 + i * 10} 1190 ${30 + i * 13}`}
                fill="none"
                stroke={i % 2 ? 'rgba(185,138,58,0.22)' : 'rgba(75,112,100,0.18)'}
                strokeWidth="1.4"
                style={{ animation: `waterRipple ${9 + i * 2}s ease-in-out ${i * -1.5}s infinite` }}
              />
            ))}
          </svg>
        </div>
        {frontMist}
      </section>

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(248,245,236,0.18), transparent 24%, transparent 76%, rgba(248,245,236,0.34))',
        }}
      />
    </div>
  );
}
