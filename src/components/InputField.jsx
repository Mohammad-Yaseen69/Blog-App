import React, { forwardRef, useId } from 'react'

const InputField = ({
    lable,
    placeholder = "",
    className = "",
    type = "text",
    onChange = () => { },
    ...props
}, ref) => {

    const id = useId()
    return (
        <div className='w-full'>
            {lable &&
                <label htmlFor={id} className='block text-sm font-medium '>
                    {lable}
                </label>}
            <input
                type={type}
                className={`outline-none rounded-[5px] px-5 text-black py-2 focus:ring-2 focus:ring-blue-600 border-none  ${className}`}
                placeholder={placeholder}
                id={id}
                onChange={onChange}
                ref={ref}
                {...props}
            />
        </div>
    )
}

export default forwardRef(InputField)