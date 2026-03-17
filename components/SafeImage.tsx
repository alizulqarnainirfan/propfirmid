'use client'
import Image from 'next/image'
import { useState } from 'react'

interface SafeImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  fallbackSrc?: string
}

export default function SafeImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  fallbackSrc = '/placeholder.svg'
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  // If the image source is invalid or empty, show a placeholder
  if (!src || src.trim() === '') {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">No Image</span>
      </div>
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      unoptimized={hasError} // Use unoptimized for fallback images
    />
  )
}