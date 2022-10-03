import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import { IoMdPerson, IoMdExit } from 'react-icons/io'
import { MdOutlineNotifications } from 'react-icons/md'
import { Sidebar } from '../components/Sidebar'
import { Calendario } from '../components/Calendario'
import  {ContentDisciplinas} from '../components/ContentDisciplinas'

function Disciplinas() {

  const { logout } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    logout();
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
                <IoMdExit onClick={handleSubmit} className="cursor-pointer"/>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex pt-6 space-x-20">
          <ContentDisciplinas />
          <Calendario />
        </div>
      </main>
    </div>
  )
}
export default Disciplinas
