import { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { chatWithBackend } from '../lib/api';

const ERROR_MSG = '本诗仙暂时醉倒了，请稍后再问。';

const poems = [
  { text: '故人西辞黄鹤楼，烟花三月下扬州。', author: '李白', title: '黄鹤楼送孟浩然之广陵' },
  { text: '朝辞白帝彩云间，千里江陵一日还。', author: '李白', title: '早发白帝城' },
  { text: '山随平野尽，江入大荒流。', author: '李白', title: '渡荆门送别' },
  { text: '黄鹤一去不复返，白云千载空悠悠。', author: '崔颢', title: '黄鹤楼' },
  { text: '晴川历历汉阳树，芳草萋萋鹦鹉洲。', author: '崔颢', title: '黄鹤楼' },
  { text: '大江东去，浪淘尽，千古风流人物。', author: '苏轼', title: '念奴娇·赤壁怀古' },
];

const fortunes = [
  { yi: '登高望远', ji: '闭门不出' },
  { yi: '泛舟江湖', ji: '逆水行舟' },
  { yi: '品茗论诗', ji: '贪杯误事' },
  { yi: '寻幽访古', ji: '走马观花' },
  { yi: '对月吟诗', ji: '对牛弹琴' },
  { yi: '登山临水', ji: '闭目塞听' },
];

const attractions = [
  { name: '黄鹤楼', desc: '天下江山第一楼，登楼远眺长江滚滚。', tip: '武汉 · 蛇山' },
  { name: '武当山', desc: '道教圣地，太极之源，云海仙境。', tip: '十堰 · 武当山特区' },
  { name: '三峡大坝', desc: '高峡出平湖，现代工程与江山气魄并立。', tip: '宜昌 · 三斗坪' },
  { name: '神农架', desc: '华中屋脊，林海雾境，适合深呼吸。', tip: '神农架林区' },
  { name: '荆州古城', desc: '三国故地，城墙与护城河仍有旧时风。', tip: '荆州 · 荆州区' },
  { name: '恩施大峡谷', desc: '绝壁、云雾、栈道铺出东方科罗拉多。', tip: '恩施 · 沐抚' },
  { name: '东湖', desc: '中国最大的城中湖，四季皆有诗意。', tip: '武汉 · 武昌' },
  { name: '赤壁古战场', desc: '大江东去，烽烟旧梦仍在江风里。', tip: '咸宁 · 赤壁' },
];

const gotoList = [
  { name: '黄鹤楼', mark: '楼', reason: '今日适合登楼望远，看长江在城中铺开。', tip: '建议傍晚去，夕阳下的楼阁最有诗意。' },
  { name: '武当山', mark: '山', reason: '云海概率高，金顶日出值得早起。', tip: '凌晨出发记得带好保暖衣物。' },
  { name: '东湖绿道', mark: '湖', reason: '风不燥，骑行东湖正合适。', tip: '从梨园到磨山，一路湖光树影。' },
  { name: '神农架', mark: '林', reason: '逃离喧嚣，去原始森林深呼吸。', tip: '大九湖晨雾很美，尽量早到。' },
  { name: '荆州古城', mark: '城', reason: '寻三国遗迹，感历史沧桑。', tip: '黄昏时看古城墙更有韵味。' },
  { name: '恩施大峡谷', mark: '峡', reason: '云雾缭绕，如入仙境。', tip: '留足体力，绝壁栈道需要慢慢走。' },
];

const promoAttractions = attractions.map((item) => item.name);

const titles = {
  'poem-card': '今日诗签',
  'route-planner': 'AI路线规划',
  'promo-gen': '宣传片生成',
  'today-go': '今日去哪',
  'poem-duel': '与李白对诗',
};

const featureMarks = {
  'poem-card': '签',
  'route-planner': '路',
  'promo-gen': '宣',
  'today-go': '游',
  'poem-duel': '对',
};

const cardGlass = {
  background: 'rgba(255,255,255,0.48)',
  backdropFilter: 'blur(18px)',
  border: '1px solid rgba(201,168,106,0.12)',
  boxShadow: '0 8px 28px rgba(54,75,62,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function FeatureModal({ feature, onClose }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [poemCard, setPoemCard] = useState(() => ({
    poem: pick(poems),
    fortune: pick(fortunes),
    attraction: pick(attractions),
  }));
  const [routeForm, setRouteForm] = useState({ budget: '中等', days: '3天', style: '山水自然' });
  const [promoAttraction, setPromoAttraction] = useState('黄鹤楼');
  const [gotoSpot, setGotoSpot] = useState(() => pick(gotoList));
  const [poemInput, setPoemInput] = useState('');

  const requestAI = useCallback(async (query) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await chatWithBackend(query);
      setResult(data.answer || ERROR_MSG);
    } catch {
      setResult(ERROR_MSG);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshPoemCard = () => {
    setPoemCard({ poem: pick(poems), fortune: pick(fortunes), attraction: pick(attractions) });
  };

  const handleRouteSubmit = () => {
    requestAI(
      `你现在是李白，也是我的湖北文旅向导。请用自然聊天的语气，为我慢慢讲一条湖北旅行路线：预算${routeForm.budget}，时间${routeForm.days}，偏好${routeForm.style}。不要写成PPT，不要使用大量标题和连续列表。可以按旅途节奏轻轻分段，像朋友边走边讲故事；保留少量诗意，必要处可用一两句短诗作引用。`
    );
  };

  const handlePromoSubmit = () => {
    requestAI(
      `请你以李白陪我游湖北的口吻，聊一段${promoAttraction}的文旅宣传词。约200字，不要像广告提纲，不要堆标题，不要技术文档感。要像站在景色前娓娓道来，有画面、有江风、有一点诗意。`
    );
  };

  const handlePoemSubmit = () => {
    const text = poemInput.trim();
    if (!text) return;
    requestAI(
      `请以李白的口吻对上句“${text}”，接下一句或两句诗，五言或七言均可，要有盛唐气象。只输出诗句，不要解释。`
    );
  };

  const renderContent = () => {
    switch (feature) {
      case 'poem-card':
        return (
          <div className="flex flex-col items-center gap-5 animate-fade-in">
            <div className="w-full rounded-2xl p-6 text-center" style={cardGlass}>
              <p className="mb-3 text-xs text-[#16243A]/70 tracking-[0.3em]">今日诗签</p>
              <p className="font-serif text-xl leading-[2.1] tracking-[0.05em] text-ink-800">{poemCard.poem.text}</p>
              <p className="mt-3 text-xs tracking-[0.12em] text-[#16243A]/70">
                - {poemCard.poem.author}《{poemCard.poem.title}》
              </p>
            </div>
            <div className="flex w-full gap-4">
              <InfoBlock label="宜" value={poemCard.fortune.yi} tone="celadon" />
              <InfoBlock label="忌" value={poemCard.fortune.ji} tone="rose" />
            </div>
            <div className="w-full rounded-xl border border-gold-300/20 bg-gold-200/15 p-4">
              <p className="mb-2 text-[10px] text-[#16243A]/70 tracking-[0.3em]">推荐景点</p>
              <p className="text-lg font-medium tracking-[0.08em] text-ink-700">{poemCard.attraction.name}</p>
              <p className="mt-1 text-sm text-[#16243A]/70">{poemCard.attraction.desc}</p>
              <p className="mt-1.5 text-xs text-[#16243A]/70">{poemCard.attraction.tip}</p>
            </div>
            <SoftButton onClick={refreshPoemCard}>换一签</SoftButton>
          </div>
        );
      case 'route-planner':
        return (
          <div className="flex flex-col gap-5 animate-fade-in">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <SelectField label="预算" value={routeForm.budget} options={['经济', '中等', '舒适', '高端']} onChange={(value) => setRouteForm((f) => ({ ...f, budget: value }))} />
              <SelectField label="时间" value={routeForm.days} options={['1天', '2天', '3天', '5天', '7天']} onChange={(value) => setRouteForm((f) => ({ ...f, days: value }))} />
              <SelectField label="偏好" value={routeForm.style} options={['山水自然', '历史人文', '美食之旅', '亲子休闲', '摄影打卡']} onChange={(value) => setRouteForm((f) => ({ ...f, style: value }))} />
            </div>
            <PrimaryButton onClick={handleRouteSubmit} disabled={loading}>
              {loading ? '太白正在规划路线...' : '生成路线'}
            </PrimaryButton>
            {loading && <LoadingDots />}
            {result && <ResultBox result={result} />}
          </div>
        );
      case 'promo-gen':
        return (
          <div className="flex flex-col gap-5 animate-fade-in">
            <SelectField label="景点" value={promoAttraction} options={promoAttractions} onChange={setPromoAttraction} />
            <PrimaryButton onClick={handlePromoSubmit} disabled={loading}>
              {loading ? '太白正在挥毫...' : '生成宣传文案'}
            </PrimaryButton>
            {loading && <LoadingDots tone="gold" />}
            {result && <ResultBox result={result} />}
          </div>
        );
      case 'today-go':
        return (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold-500/20 bg-gold-200/20 font-calligraphy text-5xl text-gold-600/80">
              {gotoSpot.mark}
            </div>
            <div className="text-center">
              <h3 className="mb-3 font-calligraphy text-3xl font-bold tracking-[0.16em] text-ink-800">{gotoSpot.name}</h3>
              <p className="text-base leading-relaxed tracking-[0.06em] text-ink-600/60">{gotoSpot.reason}</p>
              <p className="mt-3 text-xs tracking-[0.1em] text-[#16243A]/70">{gotoSpot.tip}</p>
            </div>
            <SoftButton onClick={() => setGotoSpot(pick(gotoList))}>换一处</SoftButton>
          </div>
        );
      case 'poem-duel':
        return (
          <div className="flex flex-col gap-5 animate-fade-in">
            <div className="rounded-2xl p-4" style={cardGlass}>
              <input
                type="text"
                value={poemInput}
                onChange={(e) => setPoemInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !loading) handlePoemSubmit();
                }}
                placeholder="请出上句，如：床前明月光..."
                className="w-full border-none bg-transparent font-serif text-base tracking-[0.08em] text-[#16243A] outline-none placeholder:text-[#16243A]/65"
              />
            </div>
            <PrimaryButton onClick={handlePoemSubmit} disabled={loading || !poemInput.trim()}>
              {loading ? '太白正在斟酌...' : '请太白接句'}
            </PrimaryButton>
            {loading && <LoadingDots />}
            {result && (
              <div className="rounded-2xl p-5 text-center" style={cardGlass}>
                <p className="mb-3 text-xs text-[#16243A]/70 tracking-[0.3em]">太白接句</p>
                <MarkdownResult result={result} className="text-xl leading-[2.1] text-center" />
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4" style={{ zIndex: 100 }} onClick={onClose}>
      <div className="absolute inset-0 bg-ink-800/15 backdrop-blur-sm" />
      <div
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-gold-500/15 bg-[#f8f5ef]/90 animate-fade-in"
        style={{ boxShadow: '0 20px 70px rgba(54,75,62,0.16), 0 0 80px rgba(130,185,155,0.08)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="h-1 rounded-t-3xl"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(130,185,155,0.4), rgba(201,168,106,0.36), transparent)' }}
        />
        <div className="flex items-center justify-between px-6 pb-2 pt-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/20 bg-gold-200/20 font-calligraphy text-2xl text-gold-600/80">
              {featureMarks[feature]}
            </span>
            <h3 className="font-calligraphy text-2xl font-bold tracking-[0.12em] text-ink-700">{titles[feature]}</h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-200/30 text-base text-[#16243A]/70 transition-all duration-300 hover:bg-ink-200/50"
            aria-label="关闭"
          >
            ×
          </button>
        </div>
        <div className="px-6 pb-8 pt-3">{renderContent()}</div>
      </div>
    </div>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <label>
      <span className="mb-1.5 block text-[10px] tracking-[0.2em] text-[#16243A]/70">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gold-500/15 bg-white/55 px-3 py-2.5 font-serif text-sm text-[#16243A] outline-none transition-colors focus:border-gold-500/35"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function InfoBlock({ label, value, tone }) {
  const color = tone === 'rose' ? 'text-red-500/70 border-red-200/20 bg-red-100/20' : 'text-celadon-700/75 border-celadon-500/15 bg-celadon-400/10';
  return (
    <div className={`flex-1 rounded-xl border p-4 text-center ${color}`}>
      <p className="mb-1 text-[10px] tracking-[0.3em] opacity-70">{label}</p>
      <p className="text-base font-medium tracking-[0.15em]">{value}</p>
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl border border-celadon-500/25 bg-celadon-400/20 py-3 font-serif text-sm tracking-[0.12em] text-celadon-700/75 transition-all duration-300 hover:bg-celadon-400/30 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function SoftButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-gold-500/18 bg-white/50 px-6 py-2 text-sm tracking-[0.1em] text-[#16243A]/70 transition-all duration-300 hover:border-gold-500/35 hover:bg-white/70"
    >
      {children}
    </button>
  );
}

function LoadingDots({ tone = 'celadon' }) {
  const bg = tone === 'gold' ? 'bg-gold-500/45' : 'bg-celadon-500/50';
  return (
    <div className="flex justify-center gap-1.5 py-4">
      {[0, 150, 300].map((delay) => (
        <div key={delay} className={`h-2 w-2 animate-bounce rounded-full ${bg}`} style={{ animationDelay: `${delay}ms` }} />
      ))}
    </div>
  );
}

function ResultBox({ result }) {
  return (
    <div
      className="max-h-80 overflow-y-auto rounded-2xl p-5 font-serif text-sm leading-[1.9] tracking-[0.04em] text-[#16243A]"
      style={cardGlass}
    >
      <MarkdownResult result={result} />
    </div>
  );
}

function MarkdownResult({ result, className = '' }) {
  return (
    <div className={`feature-markdown ${className}`}>
      <ReactMarkdown components={markdownComponents}>{cleanMarkdown(result)}</ReactMarkdown>
    </div>
  );
}

const markdownComponents = {
  h1: ({ children }) => <h3 className="mb-2 mt-1 text-lg font-semibold leading-relaxed text-[#16243A]">{children}</h3>,
  h2: ({ children }) => <h3 className="mb-2 mt-1 text-base font-semibold leading-relaxed text-[#16243A]">{children}</h3>,
  h3: ({ children }) => <h4 className="mb-2 mt-1 text-base font-semibold leading-relaxed text-[#16243A]">{children}</h4>,
  p: ({ children }) => <p className="mb-3 whitespace-pre-wrap leading-[1.9] last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-[#5f4a22]">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-2 border-gold-500/45 bg-gold-200/10 py-2 pl-4 text-[#5f4a22]">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => <ul className="mb-3 list-disc space-y-1.5 pl-6 marker:text-gold-600/70">{children}</ul>,
  ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1.5 pl-6 marker:text-gold-600/70">{children}</ol>,
  li: ({ children }) => <li className="leading-[1.85]">{children}</li>,
};

function cleanMarkdown(text) {
  return String(text || '')
    .replace(/^\s*(?:\*{1,3}|#{1,6})\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
