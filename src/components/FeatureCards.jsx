const features = [
  { id: 'poem-card', icon: '签', title: '今日诗签', desc: '每日一诗 · 宜忌 · 景点推荐' },
  { id: 'route-planner', icon: '路', title: 'AI路线规划', desc: '定制你的专属湖北之旅' },
  { id: 'promo-gen', icon: '宣', title: '宣传片生成', desc: '一键生成景点宣传文案' },
  { id: 'today-go', icon: '游', title: '今日去哪', desc: '随机推荐 · 说走就走' },
  { id: 'poem-duel', icon: '对', title: '与李白对诗', desc: '你出上句 · 太白接下句' },
];

const glassBase = {
  background: 'rgba(255,255,255,0.42)',
  backdropFilter: 'blur(18px)',
  border: '1px solid rgba(201,168,106,0.14)',
  boxShadow: '0 8px 32px rgba(54,75,62,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
};

export default function FeatureCards({ onSelect, variant = 'grid' }) {
  if (variant === 'scroll') {
    return (
      <div className="relative w-full px-3">
        <div
          className="pointer-events-none absolute left-0 right-0 top-1/2 h-16 -translate-y-1/2"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(201,168,106,0.16) 12%, rgba(201,168,106,0.16) 88%, transparent)',
          }}
        />
        <div className="relative flex items-stretch justify-center gap-0">
          <ScrollCap side="left" />
          <div
            className="grid flex-1 grid-cols-5 overflow-hidden border-y border-gold-500/18"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,252,242,0.46), rgba(255,255,255,0.34)), linear-gradient(90deg, rgba(201,168,106,0.08), transparent 18%, transparent 82%, rgba(201,168,106,0.08))',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 16px 46px rgba(54,75,62,0.08), inset 0 1px 0 rgba(255,255,255,0.65)',
            }}
          >
            {features.map((f, i) => (
              <button
                key={f.id}
                onClick={() => onSelect(f.id)}
                className="group relative min-h-[112px] overflow-hidden border-r border-gold-500/12 px-3 py-4 text-center transition-all duration-500 last:border-r-0"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className="absolute inset-x-3 top-4 bottom-4 opacity-0 transition-all duration-500 group-hover:opacity-100"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(130,185,155,0.13), transparent 66%)',
                    transform: 'translateY(6px)',
                  }}
                />
                <span className="relative mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/20 bg-gold-200/20 font-calligraphy text-2xl text-gold-600/80 transition-transform duration-500 group-hover:-translate-y-1">
                  {f.icon}
                </span>
                <h4 className="relative mt-2 text-[17px] font-semibold leading-relaxed tracking-[0.08em] text-[#16243A]">{f.title}</h4>
                <p className="relative mt-1 text-[13px] leading-[1.65] tracking-[0.04em] text-[#16243A]/70">{f.desc}</p>
              </button>
            ))}
          </div>
          <ScrollCap side="right" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-3xl grid-cols-2 gap-3 animate-fade-in md:grid-cols-5 md:gap-4">
      {features.map((f, i) => (
        <button
          key={f.id}
          onClick={() => onSelect(f.id)}
          className="group relative flex min-h-[124px] flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl p-4 transition-all duration-500"
          style={{ ...glassBase, transitionDelay: `${i * 70}ms` }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.borderColor = 'rgba(201,168,106,0.28)';
            e.currentTarget.style.boxShadow =
              '0 14px 42px rgba(54,75,62,0.09), 0 0 0 1px rgba(201,168,106,0.16), inset 0 1px 0 rgba(255,255,255,0.7)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(201,168,106,0.14)';
            e.currentTarget.style.boxShadow = glassBase.boxShadow;
          }}
        >
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(130,185,155,0.12), transparent 62%), linear-gradient(180deg, rgba(255,255,255,0.15), transparent)',
            }}
          />
          <span
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/20 bg-gold-200/20 font-calligraphy text-2xl text-gold-600/80 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105"
            aria-hidden="true"
          >
            {f.icon}
          </span>
          <h4 className="relative text-center text-[18px] font-semibold leading-relaxed tracking-[0.08em] text-[#16243A]">
            {f.title}
          </h4>
          <p className="relative text-center text-[14px] leading-[1.8] tracking-[0.04em] text-[#16243A]/70">
            {f.desc}
          </p>
          <div
            className="absolute bottom-0 left-1/4 right-1/4 h-px scale-x-0 opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,106,0.45), transparent)' }}
          />
        </button>
      ))}
    </div>
  );
}

function ScrollCap({ side }) {
  const rounded = side === 'left' ? 'rounded-l-full' : 'rounded-r-full';
  return (
    <div
      className={`relative w-10 shrink-0 border border-gold-500/18 ${rounded}`}
      style={{
        background: 'linear-gradient(180deg, rgba(240,224,192,0.48), rgba(255,255,255,0.34))',
        boxShadow: 'inset 0 0 18px rgba(201,168,106,0.1), 0 8px 28px rgba(54,75,62,0.07)',
      }}
    >
      <div
        className="absolute left-1/2 top-3 bottom-3 w-px -translate-x-1/2"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(201,168,106,0.3), transparent)' }}
      />
    </div>
  );
}
