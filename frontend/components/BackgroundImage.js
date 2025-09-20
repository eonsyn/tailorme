import React from 'react'
import background from '@/public/Images/background.png'
import Image from 'next/image'
function BackgroundImage() {
  return (
    <Image
            className='absolute h-full -z-20 pulse top-0 left-0'
            src={background}
            alt='background image'
            />
  )
}

export default BackgroundImage
