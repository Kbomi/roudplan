import { useState, useCallback } from 'react';
import { Sticker } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export function useStickers() {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addSticker = useCallback((stickerDef: { emoji?: string; src?: string }, cx = 250, cy = 250) => {
    const newSticker: Sticker = {
      id: uuidv4(),
      emoji: stickerDef.emoji,
      src: stickerDef.src,
      x: cx,
      y: cy,
      size: 60,
      rotation: 0,
    };
    setStickers(prev => [...prev, newSticker]);
    setSelectedId(newSticker.id);
  }, []);

  const updateSticker = useCallback((id: string, updates: Partial<Sticker>) => {
    setStickers(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const deleteSticker = useCallback((id: string) => {
    setStickers(prev => prev.filter(s => s.id !== id));
    setSelectedId(null);
  }, []);

  const clearStickers = useCallback(() => {
    setStickers([]);
    setSelectedId(null);
  }, []);

  return {
    stickers,
    selectedId,
    setSelectedId,
    addSticker,
    updateSticker,
    deleteSticker,
    clearStickers,
  };
}
