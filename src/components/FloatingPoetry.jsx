import { useMemo } from 'react';

const poems = [
  '故人西辞黄鹤楼',
  '烟花三月下扬州',
  '孤帆远影碧空尽',
  '唯见长江天际流',
  '黄鹤一去不复返',
  '白云千载空悠悠',
  '晴川历历汉阳树',
  '芳草萋萋鹦鹉洲',
  '山随平野尽',
  '江入大荒流',
  '月下飞天镜',
  '云生结海楼',
  '仍怜故乡水',
  '万里送行舟',
  '两岸猿声啼不住',
  '轻舟已过万重山',
  '朝辞白帝彩云间',
  '千里江陵一日还',
];

function PoemLine({ text, index }) {
  const style = useMemo(() => {
    const left = 2 + Math.random() * 94;
    const delay = Math.random() * 18;
    const duration = 14 + Math.random() * 20;
    const fontSize = 14 + Math.random() * 20;
    return {
      position: 'absolute',
      left: `${left}%`,
      bottom: '-80px',
      fontSize: `${fontSize}px`,
      animation: `poemDrift ${duration}s linear ${delay}s infinite`,
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      zIndex: 0,
    };
  }, [index]);

  return (
    <div style={style} className="text-celadon-500 opacity-0 font-serif tracking-[0.15em] font-medium">
      {text}
    </div>
  );
}

export default function FloatingPoetry() {
  const poemLines = useMemo(
    () => poems.map((line, i) => <PoemLine key={i} text={line} index={i} />),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {poemLines}
    </div>
  );
}
