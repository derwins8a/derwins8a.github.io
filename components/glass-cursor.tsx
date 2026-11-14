"use client"

import { useEffect, useRef, useState } from "react"

export function GlassCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isPointerFine, setIsPointerFine] = useState(false)
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse / trackpad)
    const media = window.matchMedia("(pointer: fine)")
    setIsPointerFine(media.matches)

    const onMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches)
    }
    media.addEventListener("change", onMediaChange)

    if (!media.matches) return () => media.removeEventListener("change", onMediaChange)

    let mouseX = -100
    let mouseY = -100
    let currentX = -100
    let currentY = -100
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)
    }

    const onMouseDown = () => setIsMouseDown(true)
    const onMouseUp = () => setIsMouseDown(false)

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    // Check if target or any parent is interactive
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], summary, [tabindex="0"], label'
      )
      setIsHoveringInteractive(!!interactive)
    }

    // Smooth lerp glide animation loop
    const render = () => {
      // 0.2 lerp factor gives an Apple-level smooth gliding momentum
      currentX += (mouseX - currentX) * 0.22
      currentY += (mouseY - currentY) * 0.22

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }

      rafId = requestAnimationFrame(render)
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("mouseover", onMouseOver, { passive: true })

    rafId = requestAnimationFrame(render)

    return () => {
      media.removeEventListener("change", onMediaChange)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseover", onMouseOver)
      cancelAnimationFrame(rafId)
    }
  }, [isVisible])

  if (!isPointerFine) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
      aria-hidden="true"
    >
      {/* 
        The Looking Glass Circle Lens:
        - -translate-x-1/2 -translate-y-1/2 centers it directly on the pointer point
        - Dual specular gradient simulates a curved glass lens
        - Backdrop-filter gives slight magnification and crisp refraction
        - When hovering interactive targets, expands smoothly and displays an outer ring
      */}
      <div
        className="relative -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ease-out flex items-center justify-center"
        style={{
          width: isHoveringInteractive ? "38px" : "26px",
          height: isHoveringInteractive ? "38px" : "26px",
          transform: isMouseDown ? "scale(0.85)" : isHoveringInteractive ? "scale(1.15)" : "scale(1)",
          background: isHoveringInteractive
            ? "radial-gradient(circle at 35% 35%, oklch(0.6 0.22 250 / 0.18) 0%, oklch(0.6 0.22 250 / 0.06) 60%, transparent 100%)"
            : "radial-gradient(circle at 32% 32%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 35%, rgba(0, 0, 0, 0.08) 100%)",
          border: isHoveringInteractive
            ? "1.75px solid oklch(0.6 0.22 250)"
            : "1.5px solid oklch(var(--foreground) / 0.35)",
          boxShadow: isHoveringInteractive
            ? "0 0 0 3px oklch(0.6 0.22 250 / 0.35), 0 4px 16px oklch(0.6 0.22 250 / 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.6)"
            : "0 2px 10px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.7), inset 0 -1px 1px rgba(0, 0, 0, 0.15)",
          backdropFilter: "blur(0.4px) contrast(1.1) brightness(1.08)",
          WebkitBackdropFilter: "blur(0.4px) contrast(1.1) brightness(1.08)",
        }}
      >
        {/* Optical Specular Glare Dot */}
        <span
          className="absolute rounded-full pointer-events-none transition-all duration-200"
          style={{
            top: "20%",
            left: "24%",
            width: isHoveringInteractive ? "4px" : "3px",
            height: isHoveringInteractive ? "4px" : "3px",
            background: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 0 3px rgba(255, 255, 255, 0.8)",
          }}
        />

        {/* Center alignment point */}
        <span
          className="size-1 rounded-full transition-all duration-200"
          style={{
            background: isHoveringInteractive ? "oklch(0.6 0.22 250)" : "oklch(var(--foreground) / 0.45)",
            transform: isHoveringInteractive ? "scale(1.25)" : "scale(0.8)",
          }}
        />
      </div>
    </div>
  )
}
