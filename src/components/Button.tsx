import React from 'react'

function Button({children}: {children: React.ReactNode}) {
  return (
    <button className="hover:bg-black hover:bg-opacity-20 text-white p-2 rounded-lg w-full text-left">
        {children}
    </button>
  )
}

export default Button