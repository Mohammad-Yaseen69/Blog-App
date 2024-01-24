import React from 'react'

const Button = ({
    callback,
    name,
    className,
    type = 'button'
}) => {
    return (
        <button
            onClick={() => {
                if (callback) callback()
            }}

            type={type}
            className={`${className}  px-6 py-3 focus:ring-offset-2 focus:ring-blue-500
             text-white font-medium text-xs leading-tight uppercase shadow-md 
             hover:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease rounded-md hover:bg-blue-800 bg-blue-600`}
        >
            {name}
        </button>
    )
}

export default Button