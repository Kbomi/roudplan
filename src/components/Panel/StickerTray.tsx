'use client';
import { ALL_STICKERS } from '@/constants/stickers';

interface Props {
  onStickerClick: (stickerDef: { emoji?: string; src?: string }) => void;
}

export default function StickerTray({ onStickerClick }: Props) {
  const stickers = ALL_STICKERS;
  return (
    <div>
      <div style={{ fontSize:13, color:'var(--tab-inactive)', fontWeight:500, marginBottom:6, transition: 'color 0.3s ease' }}>
        스티커 <span style={{ color:'var(--tab-inactive)', fontWeight:400, opacity: 0.8 }}>— 클릭하면 시계 위에 추가돼요</span>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:5, background:'var(--input-bg)', borderRadius:10, padding:8, border:'1px solid var(--border-color)', transition: 'background-color 0.3s ease, border-color 0.3s ease' }}>
        {stickers.map(s => (
          <button
            key={s.id}
            title={s.label}
            style={{
              width:42, height:42, fontSize:24, cursor:'pointer',
              borderRadius:8, background:'var(--card-bg)', border:'1px solid var(--border-color)',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all 0.1s ease',
              padding: 0,
              overflow: 'hidden',
              color: 'var(--foreground)',
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
