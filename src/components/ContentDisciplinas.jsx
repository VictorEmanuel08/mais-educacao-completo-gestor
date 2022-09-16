import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { app } from '../api/app'

export function ContentDisciplinas() {
  const navigate = useNavigate()
  const [disc, setDisc] = useState([])

  useEffect(() => {
    // app.get(`/disciplinas`).then(data => console.log(data.data.disciplinas[2]))
    app.get(`/disciplinas`).then(data => {
      setDisc(data.data.disciplinas)
    })
  }, [])

  return (
    <div>
      <div className="w-full px-5 ml-3">
        <div className="w-[60rem] flex flex-col p-6 pt-6 bg-white rounded-lg shadow-md shaow-[#333] pr-10">
          <div className="flex justify-between flex-col">
            <h1 className="text-[#4263EB] text-[20px] text-left">
              Disciplinas
            </h1>

            <h2 className="text-[#4263EB] text-[20px] text-left ml-6 p-3 mb-[-20px]">
              1 Ano
            </h2>

            <div className="grid grid-cols-3 ml-12 ">
              {disc.map(disciplina => {
                return (
                  <div
                    key={disciplina.id}
                    className="flex justify-center mr-1 mt-4 items-center scale-100 ease-in duration-200 hover:scale-110"
                  >
                    <a href={`/editar-disciplinas/${disciplina.id}`}>
                      <img
                        src={disciplina.bk_img}
                        alt={disciplina.name}
                        className="w-64 h-36 rounded-lg"
                      />

                    </a>
                    <div className="absolute mt-28 ml-1 bg-[#FFFFFF] w-40 h-6 rounded-lg">
                      <p className="flex items-center mt-[-4px] justify-center text-[#585858] text-[18px] ">
                        {disciplina.name}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
