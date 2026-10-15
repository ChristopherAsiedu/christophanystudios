"use client";

import { useEffect, useState } from "react";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function iso(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function BookingCalendar({ name, value, onChange }: { name: string; value: string; onChange: (date: string) => void }) {
  const now = new Date();
  const today = iso(now.getFullYear(), now.getMonth(), now.getDate());
  const [view, setView] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const [booked, setBooked] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/availability")
      .then((response) => response.json() as Promise<{ bookedDates?: string[] }>)
      .then((data) => setBooked(new Set(data.bookedDates ?? [])))
      .catch(() => undefined);
  }, []);

  const first = new Date(view.year, view.month, 1);
  const offset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const cells = [...Array<null>(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)];
  const atCurrentMonth = view.year === now.getFullYear() && view.month === now.getMonth();

  function shift(delta: number) {
    const next = new Date(view.year, view.month + delta, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
  }

  return (
    <div className="calendar">
      <input type="hidden" name={name} value={value} />
      <div className="calendar-head">
        <button type="button" onClick={() => shift(-1)} disabled={atCurrentMonth} aria-label="Previous month">‹</button>
        <strong aria-live="polite">{first.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</strong>
        <button type="button" onClick={() => shift(1)} aria-label="Next month">›</button>
      </div>
      <div className="calendar-grid">
        {weekdays.map((day) => <span key={day} className="calendar-weekday">{day}</span>)}
        {cells.map((day, index) => {
          if (day === null) return <span key={`blank-${index}`} />;
          const date = iso(view.year, view.month, day);
          const isBooked = booked.has(date);
          const unavailable = isBooked || date < today;
          return (
            <button
              key={date}
              type="button"
              className={`calendar-day${isBooked ? " is-booked" : ""}${value === date ? " is-selected" : ""}`}
              disabled={unavailable}
              aria-pressed={value === date}
              aria-label={`${date}${isBooked ? " (booked)" : ""}`}
              onClick={() => onChange(value === date ? "" : date)}
            >
              {day}
            </button>
          );
        })}
      </div>
      <p className="small-note">Greyed-out dates are already booked.{value && <> Selected: <b>{value}</b></>}</p>
    </div>
  );
}
