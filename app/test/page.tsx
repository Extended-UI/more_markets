"use client";

import MoreGraphicLinear from '@/components/graphics/MoreGraphicsLinear';
import React from 'react'

const Test = () => {

  const closeModal = () => {
    console.log("CLOSE")
  }

  return (
    <>
      <div className="artboard phone-1 w-full"><MoreGraphicLinear></MoreGraphicLinear></div>
    </>
  )
}

export default Test
