// 시간 → 각도 변환 (12시 방향 = -90도, 시계방향)
export function timeToAngle(hour: number, minute: number): number {
  const totalMinutes = hour * 60 + minute;
  return (totalMinutes / (24 * 60)) * 360 - 90;
}

// 극좌표 → 직교좌표
export function polarToCartesian(
  cx: number, cy: number, r: number, angleDeg: number
) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

// SVG arc path 생성
export function describeArc(
  cx: number, cy: number, r: number,
  startHour: number, startMinute: number,
  endHour: number, endMinute: number
): string {
  const startAngle = timeToAngle(startHour, startMinute);
  let endAngle = timeToAngle(endHour, endMinute);

  // 자정 넘기기 처리 (예: 23:00 ~ 07:00)
  if (endHour < startHour || (endHour === startHour && endMinute <= startMinute)) {
    endAngle += 360;
  }

  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const spanAngle = endAngle - startAngle;
  const largeArcFlag = spanAngle > 180 ? 1 : 0;

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
}

// 파이 조각 중앙 각도 계산 (레이블 위치)
export function midAngle(
  startHour: number, startMinute: number,
  endHour: number, endMinute: number
): number {
  const startAngle = timeToAngle(startHour, startMinute);
  let endAngle = timeToAngle(endHour, endMinute);
  if (endAngle <= startAngle) endAngle += 360;
  return (startAngle + endAngle) / 2;
}

// 30분 단위 드롭다운 옵션
export function generateTimeOptions(): { value: string; label: string }[] {
  const options = [];
  for (let h = 0; h < 24; h++) {
    for (const m of [0, 30]) {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      options.push({ value: `${hh}:${mm}`, label: `${hh}:${mm}` });
    }
  }
  return options;
}

// 두 구간 충돌 체크
export function hasOverlap(
  s1H: number, s1M: number, e1H: number, e1M: number,
  s2H: number, s2M: number, e2H: number, e2M: number
): boolean {
  const toMin = (h: number, m: number) => h * 60 + m;
  const s1 = toMin(s1H, s1M);
  let e1 = toMin(e1H, e1M);
  const s2 = toMin(s2H, s2M);
  let e2 = toMin(e2H, e2M);

  if (e1 <= s1) e1 += 1440;
  if (e2 <= s2) e2 += 1440;

  return !(e1 <= s2 || e2 <= s1);
}

// 총 분 계산
export function totalMinutes(startH: number, startM: number, endH: number, endM: number): number {
  const s = startH * 60 + startM;
  let e = endH * 60 + endM;
  if (e <= s) e += 1440;
  return e - s;
}

// 시간 표시 포맷
export function formatTime(hour: number, minute: number): string {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}
