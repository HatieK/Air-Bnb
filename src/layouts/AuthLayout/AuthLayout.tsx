import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { PATH } from "../../routes/path"

interface AuthLayoutProps {
  children:ReactNode
}


const AuthLayout:React.FC<AuthLayoutProps> = ({children}) => {
  const navigate = useNavigate()
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#f5f5f5]">
    <div className= " rounded-2xl p-8 bg-white">
      <div className="items-center flex text-center  justify-center mb-8 cursor-pointer">
        <img src="/img/logo-airbnb.svg" width={80} onClick={() => navigate(PATH.HOME)} />
      </div>
      {children}
    </div>
  </div>
  )
}

export default AuthLayout