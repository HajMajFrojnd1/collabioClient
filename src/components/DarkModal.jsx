
const DarkModal = ({setVisible, children}) => {
  return (
    <div 
        className="fixed w-screen h-screen bg-blackT flex justify-center items-center top-0 left-0 z-10"
        onClick={(e) => {
            setVisible((value) => !value);
        }}
    >
        {children}
    </div>
  )
}

export default DarkModal