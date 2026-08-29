/**
 * Email Obfuscation Helper to prevent bot scraping from static HTML
 */

const USER_PART = "businesswithderwins8a"
const DOMAIN_PART = "duck.com"

export function getObfuscatedEmail(): string {
  return `${USER_PART}@${DOMAIN_PART}`
}

export function openProtectedMail(subject: string = "hello from portfolio") {
  if (typeof window !== "undefined") {
    const mailtoUrl = `mai${"lto"}:${getObfuscatedEmail()}?subject=${encodeURIComponent(subject)}`
    window.location.href = mailtoUrl
  }
}
