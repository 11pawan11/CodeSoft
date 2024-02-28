import React from 'react'

const InputField= ({type, defaultValue, placeholder, ...rest}) => {
     
  return (
    <div> 
        <input type={type} 
                defaultValue={defaultValue}
                placeholder={placeholder}
                className='w-full h-full border border-stone-400 rounded p-2 '
                {...rest}
        />
    </div>
  )
}

export default InputField;