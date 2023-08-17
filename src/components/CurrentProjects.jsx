import React from 'react'
import ImageLink from './ImageLink'
import ProjectConatiner from './ProjectContainer'

const CurrentProjects = () => {
  return (
    <div className='bg-main rounded-md col-span-8 row-span-8 p-4 flex flex-col gap-y-4'>
        <div className='w-100 flex justify-between items-center pb-2 border-b-2'>
            <span className='font-large font-bold'>Your Projects</span>
            <ImageLink 
                className={"svg hover:text-orange bg-mainShade rounded-md py-2 px-4 flex items-center gap-x-4"}
                imageUrl={"/icons/plus-solid.svg" }
                imageAlt={"Plus icon"}
                imageSize={"6"}
                linkText={"Create Project"}
                to={"/"}
            />
        </div>
        <div className='flex-1 overflow-y-auto no-scrollbar flex flex-col gap-y-4'>
            {
                //project containers
            }
        </div>
    </div>
  )
}

export default CurrentProjects