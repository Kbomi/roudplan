"use client";
import { Segment } from "@/types";
import { describeArc, midAngle, polarToCartesian } from "@/utils/clockMath";

const CX = 250,
  CY = 250,
  R = 175,
  R_INNER = 50;
const HOUR_MARKS = Array.from({ length: 24 }, (_, i) => i);

interface Props {
  segments: Segment[];
  comment?: string;
  userName?: string;
  titleSuffix?: string;
}

export default function ClockCanvas({
  segments,
  comment,
  userName,
  titleSuffix,
}: Props) {
  return (
    <svg
      viewBox="0 0 500 540"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%",
        height: "auto",
        fontFamily: '"Gaegu", cursive',
      }}
    >
      {/* 손그림 필터 */}
      <defs>
        <filter id="sketchy">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.04"
            numOctaves="3"
            seed="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="sketchyStrong">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.05"
            numOctaves="3"
            seed="5"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* 제목 */}
      <text
        x="250"
        y="28"
        textAnchor="middle"
        fontSize="18"
        fill="#444"
        style={{ fontFamily: '"Gaegu", cursive' }}
      >
        {userName || "___"}
        {titleSuffix}
      </text>

      {/* 바깥 테두리 원 */}
      <circle
        cx={CX}
        cy={CY + 20}
        r={R + 14}
        fill="none"
        stroke="#ddd"
        strokeWidth="1"
        filter="url(#sketchyStrong)"
      />

      {/* 시간 눈금 & 숫자 */}
      {HOUR_MARKS.map((h) => {
        const angle = (h / 24) * 360 - 90;
        const outer = polarToCartesian(CX, CY + 20, R + 10, angle);
        const inner = polarToCartesian(CX, CY + 20, R + 4, angle);
        const label = polarToCartesian(CX, CY + 20, R + 24, angle);
        return (
          <g key={h}>
            <line
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="#bbb"
              strokeWidth={h % 6 === 0 ? 1.5 : 0.8}
            />
            {h % 2 === 0 && (
              <text
                x={label.x}
                y={label.y + 4}
                textAnchor="middle"
                fontSize="11"
                fill="#999"
                style={{ fontFamily: '"Gaegu", cursive' }}
              >
                {h === 0 ? "0" : h}
              </text>
            )}
          </g>
        );
      })}

      {/* 파이 조각들 */}
      {segments.map((seg) => {
        const path = describeArc(
          CX,
          CY + 20,
          R,
          seg.startHour,
          seg.startMinute,
          seg.endHour,
          seg.endMinute,
        );
        const mid = midAngle(
          seg.startHour,
          seg.startMinute,
          seg.endHour,
          seg.endMinute,
        );
        const labelR = R * 0.65;
        const labelPos = polarToCartesian(CX, CY + 20, labelR, mid);
        return (
          <g key={seg.id}>
            <path
              d={path}
              fill={seg.color}
              stroke="white"
              strokeWidth="1.5"
              opacity="0.85"
              filter="url(#sketchy)"
            />
            {/* <text
              x={labelPos.x}
              y={labelPos.y - 6}
              textAnchor="middle"
              fontSize="16"
              style={{ userSelect: "none" }}
            >
              {seg.emoji}
            </text> */}
            <text
              x={labelPos.x}
              y={labelPos.y + 10}
              textAnchor="middle"
              fontSize="9"
              fill="#555"
              style={{ fontFamily: '"Gaegu", cursive' }}
            >
              {seg.label}
            </text>
          </g>
        );
      })}

      {/* 중앙 흰 원 */}
      <circle
        cx={CX}
        cy={CY + 20}
        r={R_INNER}
        fill="white"
        stroke="#eee"
        strokeWidth="1"
      />
      <text x={CX} y={CY + 26} textAnchor="middle" fontSize="30">
        🐰
      </text>

      {/* 총평 (하루기록표/아기냠냠표) */}
      {comment && (
        <text
          x="250"
          y="510"
          textAnchor="middle"
          fontSize="13"
          fill="#666"
          style={{ fontFamily: '"Gaegu", cursive' }}
        >
          {comment}
        </text>
      )}
    </svg>
  );
}
