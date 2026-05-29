"use client";
import { useState, useEffect } from "react";
import { Segment, TabType } from "@/types";
import { PASTEL_COLORS } from "@/constants/colors";
import { STICKER_SETS } from "@/constants/stickers";
import { CATEGORIES } from "@/constants/categories";
import { generateTimeOptions } from "@/utils/clockMath";

const TIME_OPTIONS = generateTimeOptions();

interface Props {
  tab: TabType;
  editTarget?: Segment | null;
  onAdd: (seg: Omit<Segment, "id">) => string | null;
  onUpdate: (id: string, seg: Omit<Segment, "id">) => string | null;
  onCancelEdit: () => void;
}

const defaultForm = {
  startTime: "09:00",
  endTime: "10:00",
  label: "",
  color: PASTEL_COLORS[0].hex,
  // emoji: "",
};

export default function SegmentForm({
  tab,
  editTarget,
  onAdd,
  onUpdate,
  onCancelEdit,
}: Props) {
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editTarget) {
      setForm({
        startTime: `${String(editTarget.startHour).padStart(2, "0")}:${String(editTarget.startMinute).padStart(2, "0")}`,
        endTime: `${String(editTarget.endHour).padStart(2, "0")}:${String(editTarget.endMinute).padStart(2, "0")}`,
        label: editTarget.label,
        color: editTarget.color,
        // emoji: editTarget.emoji,
      });
    } else {
      setForm(defaultForm);
    }
    setError("");
  }, [editTarget]);

  const parseTime = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return { hour: h, minute: m };
  };

  const handleSubmit = () => {
    if (!form.label.trim()) {
      setError("활동 이름을 입력해주세요.");
      return;
    }
    const start = parseTime(form.startTime);
    const end = parseTime(form.endTime);
    const seg: Omit<Segment, "id"> = {
      startHour: start.hour,
      startMinute: start.minute,
      endHour: end.hour,
      endMinute: end.minute,
      label: form.label.trim(),
      color: form.color,
      // emoji: form.emoji,
    };
    const err = editTarget ? onUpdate(editTarget.id, seg) : onAdd(seg);
    if (err) {
      setError(err);
      return;
    }
    setForm(defaultForm);
    setError("");
    if (editTarget) onCancelEdit();
  };

  const categories = CATEGORIES[tab];
  const stickers = STICKER_SETS[tab];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        style={{
          fontWeight: 600,
          fontSize: 14,
          color: "#444",
          borderBottom: "1px solid #f0f0f0",
          paddingBottom: 8,
        }}
      >
        {editTarget ? "✏️ 구간 수정" : "➕ 구간 추가"}
      </div>

      <div>
        <div style={lbl}>빠른 선택</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {categories.map((cat) => (
            <button
              key={cat.label}
              style={{
                ...chip,
                background:
                  // form.emoji === cat.emoji &&
                  form.label === cat.label ? cat.defaultColor : "#f7f7f7",
                border:
                  // form.emoji === cat.emoji &&
                  form.label === cat.label
                    ? "1.5px solid #7F77DD"
                    : "1px solid #e8e8e8",
              }}
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  label: cat.label,
                  emoji: cat.emoji,
                  color: cat.defaultColor,
                }))
              }
            >
              {/* {cat.emoji} {cat.label} */}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={lbl}>시작</div>
          <select
            style={sel}
            value={form.startTime}
            onChange={(e) =>
              setForm((f) => ({ ...f, startTime: e.target.value }))
            }
          >
            {TIME_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <div style={lbl}>종료</div>
          <select
            style={sel}
            value={form.endTime}
            onChange={(e) =>
              setForm((f) => ({ ...f, endTime: e.target.value }))
            }
          >
            {TIME_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div style={lbl}>
          활동 이름{" "}
          <span style={{ color: "#bbb", fontWeight: 400 }}>(최대 10자)</span>
        </div>
        <input
          style={inp}
          maxLength={10}
          placeholder="예) 공부, 밥먹기"
          value={form.label}
          onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
        />
        <div style={{ fontSize: 11, color: "#bbb", marginTop: 3 }}>
          짧을수록 시계에 예쁘게 표시돼요 🕐
        </div>
      </div>

      <div>
        <div style={lbl}>색상</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {PASTEL_COLORS.map((c) => (
            <button
              key={c.hex}
              title={c.name}
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: c.hex,
                cursor: "pointer",
                padding: 0,
                border:
                  form.color === c.hex
                    ? "2.5px solid #534AB7"
                    : "2px solid #e0e0e0",
              }}
              onClick={() => setForm((f) => ({ ...f, color: c.hex }))}
            />
          ))}

          <label
            title="직접 선택"
            style={{ position: "relative", cursor: "pointer" }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background:
                  "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)",
                border: "2px solid #e0e0e0",
                flexShrink: 0,
              }}
            />
            <input
              type="color"
              value={form.color}
              onChange={(e) =>
                setForm((f) => ({ ...f, color: e.target.value }))
              }
              style={{
                position: "absolute",
                opacity: 0,
                width: 0,
                height: 0,
                top: 0,
                left: 0,
              }}
            />
          </label>
        </div>
      </div>

      {/* <div>
        <div style={lbl}>
          스티커 <span style={{ color: "#bbb", fontWeight: 400 }}>(선택)</span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            background: "#fafafa",
            borderRadius: 8,
            padding: 7,
          }}
        >
          {stickers.map((s) => (
            <button
              key={s.id}
              title={s.label}
              style={{
                width: 32,
                height: 32,
                fontSize: 18,
                cursor: "pointer",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: form.emoji === s.emoji ? "#EEEDFE" : "transparent",
                border:
                  form.emoji === s.emoji
                    ? "1.5px solid #7F77DD"
                    : "1px solid transparent",
              }}
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  emoji: f.emoji === s.emoji ? "" : s.emoji,
                }))
              }
            >
              {s.emoji}
            </button>
          ))}
        </div>
      </div> */}

      {error && (
        <div
          style={{
            fontSize: 12,
            color: "#e24b4a",
            background: "#fff0f0",
            borderRadius: 6,
            padding: "6px 10px",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", gap: 8 }}>
        {editTarget && (
          <button style={cancelBtn} onClick={onCancelEdit}>
            취소
          </button>
        )}
        <button style={addBtn} onClick={handleSubmit}>
          {editTarget ? "저장" : "+ 추가"}
        </button>
      </div>
    </div>
  );
}

const lbl: React.CSSProperties = {
  fontSize: 13,
  color: "#888",
  marginBottom: 4,
  fontWeight: 500,
};
const chip: React.CSSProperties = {
  fontSize: 14,
  padding: "4px 9px",
  borderRadius: 20,
  cursor: "pointer",
};
const sel: React.CSSProperties = {
  width: "100%",
  padding: "7px 8px",
  borderRadius: 8,
  border: "1px solid #e8e8e8",
  fontSize: 15,
  background: "#fafafa",
  outline: "none",
};
const inp: React.CSSProperties = {
  width: "100%",
  padding: "7px 10px",
  borderRadius: 8,
  border: "1px solid #e8e8e8",
  fontSize: 15,
  background: "#fafafa",
  outline: "none",
  boxSizing: "border-box",
};
const addBtn: React.CSSProperties = {
  flex: 1,
  padding: "9px",
  borderRadius: 10,
  background: "#534AB7",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 600,
};
const cancelBtn: React.CSSProperties = {
  padding: "9px 14px",
  borderRadius: 10,
  background: "#f0f0f0",
  color: "#666",
  border: "none",
  cursor: "pointer",
  fontSize: 15,
};
