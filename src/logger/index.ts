type LogLevel = "debug" | "info" | "warn" | "error";

const levelPriority: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40
};

const currentLevel: LogLevel =
  process.env.NODE_ENV === "production" ? "info" : "debug";

function shouldLog(level: LogLevel) {
  return levelPriority[level] >= levelPriority[currentLevel];
}

export function log(
  level: LogLevel,
  message: string,
  meta?: Record<string, unknown>
) {
  if (!shouldLog(level)) return;

  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta
  };

  const fn =
    level === "debug" ? console.log :
    level === "info"  ? console.info :
    level === "warn"  ? console.warn :
                        console.error;

  fn(JSON.stringify(entry));
}
