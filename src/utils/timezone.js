// All times stored as UTC timestamps in Firebase
// Tutor is in PKT (UTC+5), students see their own local time automatically

export const TUTOR_TIMEZONE = "Asia/Karachi";

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Convert PKT date + time string → UTC milliseconds
export function pktToUtc(date, time) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  // PKT = UTC+5, so subtract 5 hours to get UTC
  return Date.UTC(year, month - 1, day, hour - 5, minute);
}

// Format UTC timestamp → readable string in PKT (for tutor)
export function formatInPKT(timestamp) {
  return new Date(timestamp).toLocaleString("en-PK", {
    timeZone: TUTOR_TIMEZONE,
    weekday: "short", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true
  }) + " PKT";
}

// Format UTC timestamp → readable string in student's local timezone
export function formatInLocal(timestamp) {
  return new Date(timestamp).toLocaleString("en-US", {
    weekday: "short", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
    timeZoneName: "short"
  });
}

// Short time only in PKT
export function formatTimePKT(timestamp) {
  return new Date(timestamp).toLocaleString("en-PK", {
    timeZone: TUTOR_TIMEZONE,
    hour: "2-digit", minute: "2-digit", hour12: true
  }) + " PKT";
}

// Short time only in local
export function formatTimeLocal(timestamp) {
  return new Date(timestamp).toLocaleString("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: true,
    timeZoneName: "short"
  });
}

// Get next N days info — dates expressed in PKT (Asia/Karachi) so they match how the tutor thinks about them
export function getNextDays(n = 14) {
  const days = [];
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    // Use PKT date string, not UTC (toISOString gives UTC which can be 1 day behind PKT)
    const pktDateStr = d.toLocaleDateString("en-CA", { timeZone: "Asia/Karachi" }); // en-CA gives YYYY-MM-DD format
    const dayName = d.toLocaleDateString("en-US", { timeZone: "Asia/Karachi", weekday: "long" });
    const display = i === 0 ? "Today" : d.toLocaleDateString("en-US", { timeZone: "Asia/Karachi", weekday: "short", month: "short", day: "numeric" });
    days.push({ date: pktDateStr, dayName, display });
  }
  return days;
}

// Get next N days in the viewer's LOCAL timezone (for students to pick booking dates)
export function getNextDaysLocal(n = 60) {
  const days = [];
  const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const localDateStr = d.toLocaleDateString("en-CA", { timeZone: localTZ });
    const dayName = d.toLocaleDateString("en-US", { timeZone: localTZ, weekday: "long" });
    const display = i === 0 ? "Today" : d.toLocaleDateString("en-US", { timeZone: localTZ, weekday: "short", month: "short", day: "numeric" });
    days.push({ date: localDateStr, dayName, display });
  }
  return days;
}

// Student's local timezone label
export function getLocalTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Returns a human readable countdown string like "in 2h 15m" or "starting now" or "Started"
export function getCountdown(utcTimestamp) {
  const diff = utcTimestamp - Date.now();
  if (diff <= 0 && diff > -60 * 60 * 1000) return "Starting now";
  if (diff <= 0) return "Already started";

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `in ${days}d ${hours}h`;
  if (hours > 0) return `in ${hours}h ${minutes}m`;
  return `in ${minutes}m`;
}
