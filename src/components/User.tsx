import React from 'react'

interface IProps{
    children:string
}

const User = ({children}:IProps) => {
  return (
    <div>{children}</div>
  )
}

export default User