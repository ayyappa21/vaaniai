/**
 * VaaniAI - Centralized API Configuration
 * Manages production backend endpoint resolution and client/server request routing.
 */

// Production Render backend URL
export const DEFAULT_PRODUCTION_BACKEND = "https://vaaniai-u9w6.onrender.com";

/**
 * Resolves the backend base URL dynamically.
 * Priority:
 * 1. process.env.NEXT_PUBLIC_API_BASE_URL (Requested exact environment variable)
 * 2. process.env.NEXT_PUBLIC_API_URL
 * 3. process.env.BACKEND_URL
 * 4. Fallback: https://vaaniai-u9w6.onrender.com (Production Render backend)
 */
export function getBackendBaseUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.BACKEND_URL;

  const raw = envUrl && envUrl.trim() ? envUrl.trim() : DEFAULT_PRODUCTION_BACKEND;
  // Strip trailing slashes safely
  return raw.replace(/\/+$/, "");
}

/**
 * Builds a clean, fully-qualified backend API URL without duplicate slashes
 * or missing /api prefixes.
 *
 * Examples:
 * buildBackendUrl("/api/tts") -> "https://vaaniai-u9w6.onrender.com/api/tts"
 * buildBackendUrl("tts") -> "https://vaaniai-u9w6.onrender.com/api/tts"
 * buildBackendUrl("/health") -> "https://vaaniai-u9w6.onrender.com/health"
 */
export function buildBackendUrl(path: string): string {
  const base = getBackendBaseUrl();
  const cleanPath = path.trim().replace(/^\/+/, "");

  if (cleanPath.startsWith("api/") || cleanPath === "health") {
    return `${base}/${cleanPath}`;
  }

  return `${base}/api/${cleanPath}`;
}

/**
 * Pre-configured endpoint builders for all VaaniAI API routes
 */
export const API_ENDPOINTS = {
  health: () => buildBackendUrl("health"),
  languages: () => buildBackendUrl("api/languages"),
  voices: (lang?: string) =>
    buildBackendUrl(lang ? `api/voices?language=${encodeURIComponent(lang)}` : "api/voices"),
  detectLanguage: () => buildBackendUrl("api/detect-language"),
  extractText: () => buildBackendUrl("api/extract-text"),
  tts: () => buildBackendUrl("api/tts"),
  history: () => buildBackendUrl("api/history"),
  historyItem: (id: string) => buildBackendUrl(`api/history/${encodeURIComponent(id)}`),
};
