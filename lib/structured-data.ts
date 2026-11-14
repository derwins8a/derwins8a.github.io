/**
 * Schema.org Person JSON-LD Structured Data
 * Provides search engines and AI crawlers with exact identity information
 * including name, alternate name (handle), role, location, and social profiles.
 */

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Derwins Ochoa",
  "alternateName": "derwins8a",
  "url": "https://derwins8a.github.io",
  "image": "https://derwins8a.github.io/img.jpeg",
  "description": "Design engineer & frontend architect. Building tactile, high-performance web and mobile software for established brands and funded startups. Based in Venezuela.",
  "jobTitle": "Design Engineer / Frontend Architect / iOS Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "location": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Venezuela",
      "addressCountry": "VE"
    }
  },
  "sameAs": [
    "https://github.com/derwins8a",
    "https://linkedin.com/in/derwins8a",
    "https://x.com/derwins8a",
    "https://instagram.com/derwins8a",
    "https://youtube.com/@derwins8a"
  ],
  "knowsAbout": [
    "TypeScript",
    "React",
    "Next.js",
    "SwiftUI",
    "iOS Development",
    "Design Systems",
    "Tailwind CSS",
    "OKLCH Color Space",
    "Frontend Architecture",
    "Accessibility",
    "Performance Optimization",
    "Human-Computer Interaction"
  ],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Self-taught Engineer"
  },
  "email": "mailto:hi@derwins.dev"
}