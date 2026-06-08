'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  alpha: number
  speed: number
  color: string
}

interface Props {
  count?: number
  className?: string
}

const COLORS = ['#ffffff', '#ffffff', '#ffffff', '#ffe8a0', '#C9A84C', '#aad4ff']

export default function StarField({ count = 300, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let stars: Star[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.2,
        alpha: Math.random(),
        speed: Math.random() * 0.008 + 0.003,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach((s) => {
        s.alpha += s.speed
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1

        ctx.save()
        ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.color

        // glow effect for bigger stars
        if (s.r > 1.2) {
          ctx.shadowColor = s.color
          ctx.shadowBlur = s.r * 4
        }
        ctx.fill()
        ctx.restore()
      })
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} />
}
