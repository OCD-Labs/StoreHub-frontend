import React from 'react'

const AppLoader = () => {
  return (
    <div className="flex items-center justify-center p-5 my-12">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
      </div>
    </div>
  )
}

export default AppLoader
