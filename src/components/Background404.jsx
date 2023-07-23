const Background404 = () => {
    return (
        <div className="relative px-4 py-4 flex-1 flex flex-col items-center justify-center">
            <img 
                className="absolute width-4/5 height-4/5 z-10"
                src="/images/404background.svg" 
                alt="background illustration for 404 error page" 
            />
        </div>
    )
}
  
  export default Background404