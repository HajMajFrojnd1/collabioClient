import BasicButton from "./BasicButton";

const TwoButtonModal = ({onClickOne, onClickTwo, textOne, textTwo, children}) => {
    return (
        <div 
            className='bg-main gap-y-4 flex flex-col p-4 opacity-100 items-center rounded-md border-2 border-orange'
            onClick={(e) => {e.stopPropagation();}}
        >
            {children}
            <div className='flex gap-x-4'>
                <BasicButton
                    text={textOne}
                    onClick={(e) => {
                        onClickOne();
                        e.stopPropagation();
                    }}
                    type={"button"}
                />
                <BasicButton
                    text={textTwo}
                    onClick={(e) => {
                        onClickTwo();
                        e.stopPropagation();
                    }}
                    className={"outline"}
                    type={"button"}
                />
            </div>
        </div>
    )
}

export default TwoButtonModal