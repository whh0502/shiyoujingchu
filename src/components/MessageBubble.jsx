import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const AI_FONT_SIZE = '20px';
const AI_LINE_HEIGHT = '1.9';
const AI_TEXT_COLOR = '#16243A';
const USER_FONT_SIZE = '18px';

export default function MessageBubble({ message, isUser, isNew }) {
  const [displayedText, setDisplayedText] = useState(isUser ? message : '');
  const [isTyping, setIsTyping] = useState(!isUser && isNew);
  const renderedText = isUser ? displayedText : cleanMarkdown(displayedText);

  useEffect(() => {
    if (isUser || !isNew) {
      setDisplayedText(message);
      setIsTyping(false);
      return;
    }

    let i = 0;
    setDisplayedText('');
    const speed = 28 + Math.random() * 32;
    const timer = setInterval(() => {
      if (i < message.length) {
        setDisplayedText(message.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [message, isUser, isNew]);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-5 animate-fade-in`}>
      <div
        className={`max-w-[78%] px-6 py-4 rounded-2xl ${
          isUser
            ? 'rounded-br-md'
            : 'rounded-bl-md'
        }`}
        style={isUser ? {
          background: 'rgba(130,185,155,0.12)',
          border: '1px solid rgba(130,185,155,0.2)',
          boxShadow: '0 3px 16px rgba(90,130,110,0.07)',
        } : {
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(201,168,106,0.1)',
          boxShadow: '0 4px 28px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)',
        }}>
        {/* AI label */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#16243A]/70 text-xs tracking-[0.22em]">太白</span>
            <span className="w-1 h-1 rounded-full bg-celadon-400/40" />
            {isTyping && <span className="text-[11px] text-gold-600/70 tracking-[0.18em]">正在挥毫……</span>}
          </div>
        )}

        {isUser ? (
          <p
            className="whitespace-pre-wrap font-serif tracking-[0.04em]"
            style={{
              fontSize: USER_FONT_SIZE,
              lineHeight: AI_LINE_HEIGHT,
              color: 'rgba(22,36,58,0.88)',
            }}
          >
            {renderedText}
          </p>
        ) : (
          <div
            className="markdown-message font-serif tracking-[0.04em]"
            style={{
              fontSize: AI_FONT_SIZE,
              lineHeight: AI_LINE_HEIGHT,
              color: AI_TEXT_COLOR,
            }}
          >
            <ReactMarkdown components={markdownComponents}>{renderedText}</ReactMarkdown>
            {isTyping && <span className="cursor-blink" />}
          </div>
        )}

        {/* Timestamp */}
        <div className={`text-[10px] mt-2.5 opacity-65 tracking-wider ${
          isUser ? 'text-[#16243A] text-right' : 'text-[#16243A]'
        }`}>
          {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

const markdownComponents = {
  h1: ({ children }) => <h3 className="mb-3 mt-2 text-[22px] font-semibold leading-relaxed text-[#16243A]">{children}</h3>,
  h2: ({ children }) => <h3 className="mb-3 mt-2 text-[21px] font-semibold leading-relaxed text-[#16243A]">{children}</h3>,
  h3: ({ children }) => <h4 className="mb-2 mt-2 text-[19px] font-semibold leading-relaxed text-[#16243A]">{children}</h4>,
  p: ({ children }) => <p className="mb-3 whitespace-pre-wrap leading-[1.9] last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-[#5f4a22]">{children}</strong>,
  em: ({ children }) => <em className="text-[#5f4a22]/90 not-italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-2 border-gold-500/45 bg-gold-200/10 py-2 pl-4 text-[#5f4a22]">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => <ul className="mb-3 list-disc space-y-1.5 pl-6 marker:text-gold-600/70">{children}</ul>,
  ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1.5 pl-6 marker:text-gold-600/70">{children}</ol>,
  li: ({ children }) => <li className="leading-[1.85]">{children}</li>,
  code: ({ children }) => (
    <code className="rounded bg-white/45 px-1.5 py-0.5 text-[0.92em] text-[#5f4a22]">{children}</code>
  ),
};

function cleanMarkdown(text) {
  return text
    .replace(/^\s*(?:\*{1,3}|#{1,6})\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
