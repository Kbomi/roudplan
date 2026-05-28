import { useState, useCallback } from 'react';
import { Segment } from '@/types';
import { hasOverlap } from '@/utils/clockMath';
import { v4 as uuidv4 } from 'uuid';

export function useSegments() {
  const [segments, setSegments] = useState<Segment[]>([]);

  const addSegment = useCallback((seg: Omit<Segment, 'id'>): string | null => {
    // 충돌 체크
    const conflict = segments.find(s =>
      hasOverlap(
        seg.startHour, seg.startMinute, seg.endHour, seg.endMinute,
        s.startHour, s.startMinute, s.endHour, s.endMinute
      )
    );
    if (conflict) return `"${conflict.label}" 구간과 시간이 겹쳐요.`;

    const newSeg: Segment = { ...seg, id: uuidv4() };
    setSegments(prev =>
      [...prev, newSeg].sort((a, b) => {
        const aMin = a.startHour * 60 + a.startMinute;
        const bMin = b.startHour * 60 + b.startMinute;
        return aMin - bMin;
      })
    );
    return null;
  }, [segments]);

  const updateSegment = useCallback((id: string, seg: Omit<Segment, 'id'>): string | null => {
    const conflict = segments.find(s =>
      s.id !== id &&
      hasOverlap(
        seg.startHour, seg.startMinute, seg.endHour, seg.endMinute,
        s.startHour, s.startMinute, s.endHour, s.endMinute
      )
    );
    if (conflict) return `"${conflict.label}" 구간과 시간이 겹쳐요.`;

    setSegments(prev =>
      prev.map(s => s.id === id ? { ...seg, id } : s)
        .sort((a, b) => (a.startHour * 60 + a.startMinute) - (b.startHour * 60 + b.startMinute))
    );
    return null;
  }, [segments]);

  const deleteSegment = useCallback((id: string) => {
    setSegments(prev => prev.filter(s => s.id !== id));
  }, []);

  const clearSegments = useCallback(() => setSegments([]), []);

  return { segments, addSegment, updateSegment, deleteSegment, clearSegments };
}
