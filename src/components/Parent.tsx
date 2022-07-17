

interface IProps{
    children:React.ReactNode
}

const Parent = ({children}:IProps) => {
  return (
   <h1>{children}</h1>
  )
}

export default Parent