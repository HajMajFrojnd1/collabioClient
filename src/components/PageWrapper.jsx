
const PageWrapper = ({children}) => {
  return (
    <div className="relative flex-1 p-4 bg-mainShade flex flex-col gap-4 rounded-md text-white">
        {children}
    </div>
  )
}

export default PageWrapper