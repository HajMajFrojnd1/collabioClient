import React from 'react'
import ImageLink from './ImageLink'
import { Link } from 'react-router-dom'
const ProjectTextContainer = ({fTitle, fText, sTitle, sText}) => {

    return(
        <div className='flex flex-col items-start border-r-2 pr-4 border-white'>
                    <span className='opacity-75'>
                        {fTitle + ": " + fText}
                    </span>
                    <span className='opacity-75'>
                        {sTitle + ": " + sText}
                    </span>
        </div>
    )

}

const ProjectConatiner = ({title, project}) => {

    return (
        <div className='w-full flex flex-col gap-y-2 text-white font-large text-base items-start'>
            <span>
                {title}
            </span>
            <div className='w-full bg-mainShade p-3 rounded-md flex items-center gap-x-4'>
                <div className='w-16 h-16 bg-white'>

                </div>
                <ProjectTextContainer
                    fTitle={"Owner"}
                    fText={"Patrik Odložilík"}
                    sTitle={"Permission"}
                    sText={"Owner"}
                />
                <ProjectTextContainer
                    fTitle={"Last edit"}
                    fText={"14.3.2022 14:55:31"}
                    sTitle={"Created"}
                    sText={"14.3.2022 14:55:31"}
                />
                <div className='flex flex-1 justify-end gap-x-2'>
                    <Link 
                        className='svg bg-main p-2 rounded-md'
                        to={"/projects"}
                    >
                        <img 
                            src="/icons/chart-column-solid.svg" 
                            alt="Project statistics icon" 
                            className='w-6 h6'
                        />
                    </Link>
                    <Link 
                        className='svg bg-main p-2 rounded-md'
                        to={"/projects"}
                    >
                        <img 
                            src="/icons/pen-to-square-solid.svg" 
                            alt="Edit project icon" 
                            className='w-6 h-6'
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

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
            <ProjectConatiner
                title={"Yumi little project"}
            />
            <ProjectConatiner
                title={"Yumi little project"}
            />
            <ProjectConatiner
                title={"Yumi little project"}
            />
            <ProjectConatiner
                title={"Yumi little project"}
            />
            <ProjectConatiner
                title={"Yumi little project"}
            />
            <ProjectConatiner
                title={"Yumi little project"}
            />
        </div>
    </div>
  )
}

export default CurrentProjects