import React from 'react'
interface ContainerProps {
    children: React.ReactNode
}
export const Container = ({children}: ContainerProps) => {
  return (
    <div className='w-full h-screen bg-blue-950 flex items-center justify-center'>
        {children}
    </div>
  )
}
