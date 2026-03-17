import Image from 'next/image'

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

const Logo = ({ width = 150, height = 50, className = "" }: LogoProps) => {
  return (
    <Image
      src="/logo-raw.svg"
      alt="PropFirmID Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}

export default Logo