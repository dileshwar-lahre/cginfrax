import React from 'react'
import Image from "next/image";

const page = () => {
  return (
     <div className="flex-1 flex justify-center md:justify-end bg-amber-50">
              <Image
                src="/images/about.png" // apni image "public/hero.jpg" me daal dena
                alt="Property"
                width={900}
                height={600}
                className="rounded-lg shadow-xl object-cover w-full max-w-md md:max-w-lg"
              />
            </div>
  )
}

export default page