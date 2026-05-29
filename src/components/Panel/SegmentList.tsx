"use client";
import { Segment } from "@/types";
import { formatTime } from "@/utils/clockMath";

interface Props {
  segments: Segment[];
  onEdit: (seg: Segment) => void;
  onDelete: (id: string) => void;
}

export default function SegmentList({ segments, onEdit, onDelete }: Props) {
  if (segments.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px 0",
          color: "#ccc",
          fontSize: 13,
        }}
      >
        아직 추가된 내용이 없어요
        <br />
        <span style={{ fontSize: 24 }}>🕐</span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        maxHeight: 280,
        overflowY: "auto",
        paddingRight: 2,
      }}
    >
      {segments.map((seg) => (
        <div
          key={seg.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 10px",
            background: "#fafafa",
            borderRadius: 8,
            border: "1px solid #f0f0f0",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: seg.color,
              flexShrink: 0,
              border: "1px solid #e0e0e0",
            }}
          />
          {/* <span style={{ fontSize: 16, flexShrink: 0 }}>{seg.emoji}</span> */}
          <span
            style={{
              fontSize: 13,
              flex: 1,
              fontWeight: 500,
              color: "#444",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {seg.label}
          </span>
          <span style={{ fontSize: 13, color: "#aaa", flexShrink: 0 }}>
            {formatTime(seg.startHour, seg.startMinute)}~
            {formatTime(seg.endHour, seg.endMinute)}
          </span>
          <button style={iconBtn} title="수정" onClick={() => onEdit(seg)}>
            ✏️
          </button>
          <button
            style={{ ...iconBtn, color: "#e24b4a" }}
            title="삭제"
            onClick={() => onDelete(seg.id)}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}

const iconBtn: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: 14,
  padding: "2px 4px",
  borderRadius: 4,
  flexShrink: 0,
};
