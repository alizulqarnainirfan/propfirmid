'use client'
import { useEffect, useRef } from 'react'

interface FirmRadarChartProps {
  firmName: string
  scores: {
    ttpScore: number
    challengeRules: number
    userRatings: number
    slippage: number
    companyBackground: number
  }
  overallScore: number
  locale: 'en' | 'id'
}

export default function FirmRadarChart({ 
  firmName, 
  scores, 
  overallScore, 
  locale 
}: FirmRadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const size = 400
    canvas.width = size
    canvas.height = size

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Chart settings
    const centerX = size / 2
    const centerY = size / 2
    const radius = 140
    const numPoints = 5

    // Labels
    const labels = locale === 'id' ? [
      'Latar Belakang Perusahaan',
      'Aturan Challenge',
      'Rating Pengguna',
      'Slippage',
      'Skor TTP'
    ] : [
      'Company Background',
      'Challenge Rules',
      'User Ratings',
      'Slippage',
      'TTP Score'
    ]

    const values = [
      scores.companyBackground,
      scores.challengeRules,
      scores.userRatings,
      scores.slippage,
      scores.ttpScore
    ]

    // Draw background grid
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'
    ctx.lineWidth = 1

    for (let i = 1; i <= 5; i++) {
      const gridRadius = (radius * i) / 5
      ctx.beginPath()
      
      for (let j = 0; j < numPoints; j++) {
        const angle = (j * 2 * Math.PI) / numPoints - Math.PI / 2
        const x = centerX + gridRadius * Math.cos(angle)
        const y = centerY + gridRadius * Math.sin(angle)
        
        if (j === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.stroke()
    }

    // Draw grid lines from center
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    // Draw data polygon
    ctx.strokeStyle = '#3b82f6'
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'
    ctx.lineWidth = 3
    ctx.beginPath()

    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2
      const value = values[i] / 10 // Normalize to 0-1
      const dataRadius = radius * value
      const x = centerX + dataRadius * Math.cos(angle)
      const y = centerY + dataRadius * Math.sin(angle)
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw data points
    ctx.fillStyle = '#3b82f6'
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2
      const value = values[i] / 10
      const dataRadius = radius * value
      const x = centerX + dataRadius * Math.cos(angle)
      const y = centerY + dataRadius * Math.sin(angle)
      
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, 2 * Math.PI)
      ctx.fill()
    }

    // Draw labels and values
    ctx.fillStyle = '#e5e7eb'
    ctx.font = 'bold 14px Inter, sans-serif'
    ctx.textAlign = 'center'

    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2
      const labelRadius = radius + 40
      const x = centerX + labelRadius * Math.cos(angle)
      const y = centerY + labelRadius * Math.sin(angle)
      
      // Adjust text alignment based on position
      if (x < centerX - 10) {
        ctx.textAlign = 'right'
      } else if (x > centerX + 10) {
        ctx.textAlign = 'left'
      } else {
        ctx.textAlign = 'center'
      }

      // Draw label
      ctx.fillStyle = '#e5e7eb'
      ctx.font = 'bold 12px Inter, sans-serif'
      ctx.fillText(labels[i], x, y - 8)
      
      // Draw value
      ctx.fillStyle = '#3b82f6'
      ctx.font = 'bold 14px Inter, sans-serif'
      ctx.fillText(values[i].toString(), x, y + 8)
    }

    // Draw center score
    ctx.textAlign = 'center'
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 48px Inter, sans-serif'
    ctx.fillText(overallScore.toString(), centerX, centerY + 16)

  }, [scores, overallScore, locale])

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl"></div>
        <canvas
          ref={canvasRef}
          className="relative z-10 rounded-2xl"
          style={{ 
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
        />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {locale === 'id' ? 'Skor Keseluruhan' : 'Overall Rating'}
        </h3>
        <p className="text-sm text-gray-600">
          {locale === 'id' 
            ? 'Berdasarkan analisis komprehensif dari berbagai faktor' 
            : 'Based on comprehensive analysis of various factors'}
        </p>
      </div>
    </div>
  )
}