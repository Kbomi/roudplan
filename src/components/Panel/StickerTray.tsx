'use client';
import { TabType } from '@/types';
import { STICKER_SETS } from '@/constants/stickers';

interface Props {
  tab: TabType;
  onStickerClick: (stickerDef: { emoji?: string; src?: string }) => void;
}

export default function StickerTray({ tab, onStickerClick }: Props) {
  const stickers = STICKER_SETS[tab];
  return (
    <div>
      <div style={{ fontSize:13, color:'#888', fontWeight:500, marginBottom:6 }}>
        스티커 <span style={{ color:'#bbb', fontWeight:400 }}>— 클릭하면 시계 위에 추가돼요</span>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:5, background:'#fafafa', borderRadius:10, padding:8, border:'1px solid #f0f0f0' }}>
        {stickers.map(s => (
          <button
            key={s.id}
            title={s.label}
            style={{
              width:42, height:42, fontSize:24, cursor:'pointer',
              borderRadius:8, background:'white', border:'1px solid #e8e8e8',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'transform 0.1s',
              padding: 0,
              overflow: 'hidden',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            onClick={() => onStickerClick({ emoji: s.emoji, src: s.src })}
          >
            {s.src ? (
              <img src={s.src} alt={s.label} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
            ) : (
              s.emoji
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
