const SectionWrapper = ({name, children, sideElement}) => {
    return (
        <>
            <div className='w-full flex justify-between items-center pb-2 border-b-2'>
                <span className='font-large font-bold'>{name}</span>
                {sideElement}
            </div>
            {children}
        </>
    );
}

export default SectionWrapper;