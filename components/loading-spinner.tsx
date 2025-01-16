import React from 'react'

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[#978667] rounded-full animate-spin-slow"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#978667] font-semibold">Loading</span>
        </div>
      </div>
    </div>
  )
}

