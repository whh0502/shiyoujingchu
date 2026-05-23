import { useEffect, useState } from 'react';

const placeholders = [
  '黄鹤楼有什么故事？',
  '武当山怎么玩？',
  '帮我规划武汉两日游',
  '与太白对诗',
  '生成湖北宣传片',
];

export default function InputBox({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderVisible(false);
      window.setTimeout(() => {
        setPlaceholderIndex((index) => (index + 1) % placeholders.length);
        setPlaceholderVisible(true);
      }, 360);
    }, 3600);

    return () => clearInterval(timer);
  }, []);

  const handleSend = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      {/* Ambient gold glow */}
      <div className="absolute -inset-3 rounded-[32px]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,168,106,0.1) 0%, transparent 70%)',
          animation: 'softBreathe 4s ease-in-out infinite',
        }}
      />

      {/* Input container — page visual center */}
      <div
        className="relative flex items-center rounded-3xl px-5 transition-all duration-500 group"
        style={{
          height: '62px',
          borderRadius: '22px',
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(201,168,106,0.2)',
          boxShadow: '0 10px 40px rgba(201,168,106,0.12), inset 0 1px 0 rgba(255,255,255,0.55)',
          animation: 'inputGlow 5s ease-in-out infinite',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(201,168,106,0.4)';
          e.currentTarget.style.boxShadow = '0 10px 50px rgba(201,168,106,0.2), 0 0 80px rgba(201,168,106,0.06), inset 0 1px 0 rgba(255,255,255,0.55)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(201,168,106,0.2)';
          e.currentTarget.style.boxShadow = '0 10px 40px rgba(201,168,106,0.12), inset 0 1px 0 rgba(255,255,255,0.55)';
        }}
      >
        <span className="text-gold-600/70 text-xl mr-3 select-none" style={{ fontFamily: 'serif' }}>
          ◇
        </span>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholders[placeholderIndex]}
          className="flex-1 bg-transparent text-[#16243A]/90 text-base placeholder:text-[#16243A]/65
            tracking-[0.08em] outline-none border-none font-serif"
          style={{
            transition: 'opacity 360ms ease',
            opacity: placeholderVisible || value ? 1 : 0.55,
          }}
        />

        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="ml-3 w-10 h-10 rounded-2xl flex items-center justify-center
            bg-gold-300/15 hover:bg-gold-300/25 border border-gold-400/25
            hover:border-gold-400/45 transition-all duration-300
            disabled:opacity-20 disabled:cursor-not-allowed
            hover:shadow-[0_0_25px_rgba(201,168,106,0.2)] shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-gold-500">
            <path d="M2 8L14 2L8 14L6.5 9.5L2 8Z" fill="currentColor" opacity="0.8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
