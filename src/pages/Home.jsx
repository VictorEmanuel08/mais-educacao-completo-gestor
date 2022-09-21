import { IoMdPerson, IoMdExit } from 'react-icons/io'
import { MdOutlineNotifications } from 'react-icons/md'
import { Sidebar } from '../components/Sidebar'
import { Calendario } from '../components/Calendario'
import { ContentHome } from '../components/ContentHome'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="flex w-full min-h-screen font-sans bg-dark-theme">
      <Sidebar />
      <main className="text-2xl font-semibold flex-1 bg-dark-theme gap-6">
        <div className="w-full h-16 bg-dark-purple relative">
          <div className="absolute right-5 pt-5 text-white">
            <ul className="flex">
              <li className="pr-2">
                <IoMdPerson />
              </li>
              <li className="pr-2">
                <MdOutlineNotifications />
              </li>
              <li className="pr-2">
                <IoMdExit onClick={logout} className="cursor-pointer" alt="sair"/>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex pt-5">
          <ContentHome />
          <Calendario />
        </div>
      </main>

      <aside></aside>
    </div>
  )
}

export default Home
