const questions = [
  { icon: '🏯', text: '黄鹤楼有什么故事？', detail: '李白与崔颢的诗坛佳话' },
  { icon: '⛰️', text: '武当山怎么游玩？',   detail: '道家仙山两日攻略' },
  { icon: '🌊', text: '长江三峡有多壮观？', detail: '西陵峡、巫峡、瞿塘峡' },
  { icon: '🍜', text: '湖北有什么美食？',   detail: '热干面、武昌鱼、莲藕排骨汤' },
];

const glassBase = {
  background: 'rgba(255,255,255,0.42)',
  backdropFilter: 'blur(18px)',
  border: '1px solid rgba(201,168,106,0.1)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
};

export default function RecommendedQuestions({ onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-xl animate-fade-in">
      {questions.map((q, i) => (
        <button
          key={i}
          onClick={() => onSelect(q.text)}
          className="group relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-500"
          style={{
            ...glassBase,
            transitionDelay: `${i * 80}ms`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06), 0 0 0 1px rgba(201,168,106,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = glassBase.boxShadow;
          }}
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(130,185,155,0.08) 0%, transparent 60%)' }} />

          <div className="relative z-10">
            <span className="text-xl mb-2 block">{q.icon}</span>
            <h4 className="text-[18px] font-semibold text-[#16243A] tracking-[0.04em] mb-1 leading-[1.5]">
              {q.text}
            </h4>
            <p className="text-[13px] text-[#16243A]/70 tracking-[0.06em] leading-relaxed">{q.detail}</p>
          </div>

          <div className="absolute top-0 right-0 w-14 h-14 opacity-0 group-hover:opacity-100
            transition-all duration-500 group-hover:scale-100 scale-50">
            <div className="absolute top-3 right-3 w-10 h-10
              border-t-2 border-r-2 border-gold-400/15 rounded-tr-xl" />
          </div>
        </button>
      ))}
    </div>
  );
}
