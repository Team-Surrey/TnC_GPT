import React from 'react'


function Button({children, onClick, icon}: {children: React.ReactNode, onClick?: any, icon?:React.ReactNode}) {
  return (
    <button onClick={onClick||null} className="hover:bg-black hover:bg-opacity-20 text-inherit p-2 rounded-lg w-full whitespace-nowrap">
      <div className="flex flex-row space-x-2 ">
        {icon}
        <span>{children}</span>
      </div>
    </button>
  )
}

export default Button