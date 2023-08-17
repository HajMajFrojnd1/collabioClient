const VerticalFormInput = ({type, placeholder, name, value, setValue, options = null}) => {
    return (
        <div className="flex flex-col items-start gap-y-1">
            <span className="font-medium text-lg">{name}</span>
            {
                options === null ?
                    <input
                        type={type}
                        value={value}
                        className="bg-mainShade p-2 rounded-md outline-0 flex-1 w-96"
                        placeholder={placeholder}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        autoFocus={true}
                    />
                :
                    <select 
                        className="bg-mainShade p-2 rounded-md outline-0 flex-1 w-96"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                    >
                        {
                            options.map((option) => <option value={option}>{option}</option>)
                        }
                    </select>
            }
        </div>
    );
}

export default VerticalFormInput;
