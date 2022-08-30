import { useNavigate } from 'react-router-dom'

const MatImg = require('../assets/Capas/Mat.png')
const FisImg = require('../assets/Capas/FIS.png')
const QuiImg = require('../assets/Capas/QUI.png')
// import MatImg from '../assets/Capas/Mat.png'

export function ContentDisciplinas() {
  const navigate = useNavigate()

  return (
    <div>
      <div className="w-full px-5 ml-3">
        <div className="w-[60rem] flex flex-col p-6 pt-6 bg-white rounded-lg shadow-md shaow-[#333] pr-10">
          <div className="flex justify-between flex-col">
            <h1 className="text-[#4263EB] text-[20px] text-left">
              Disciplinas
            </h1>

            <h2 className="text-[#4263EB] text-[20px] text-left ml-6 p-3">
              1 Ano
            </h2>
            <div className="flex items-center flex-row ml-12 ">
              <div className="flex justify-center items-center pr-4 scale-100 ease-in duration-200 hover:scale-110">
                <a href="/www.youtube.com" target="_blank">
                  <img
                    src={MatImg}
                    alt="Disciplina de matemática"
                    className="w-64 h-36 rounded-lg"
                  />
                </a>
                <div className="absolute mt-28 ml-1 bg-[#FFFFFF] w-60 h-6 rounded-lg">
                  <p className="flex items-center  justify-center text-[#585858] text-[18px] ">
                    Matemática
                  </p>
                </div>
              </div>

              <div className="flex items-center pr-4 scale-100 ease-in duration-200 hover:scale-110">
                <a href="/www.youtube.com" target="_blank">
                  <img
                    src={FisImg}
                    alt="Disciplina de matemática"
                    className="w-64 h-36 rounded-lg"
                  />
                </a>
                <div className="absolute mt-28 ml-1 bg-[#FFFFFF] w-60 h-6 rounded-lg">
                  <p className="flex items-center justify-center text-[#585858] text-[18px] ">
                    Física
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-[#4263EB] text-[20px] text-left ml-6 p-3">
              3 Ano
            </h2>
            <div className="flex items-center flex-row ml-12">
              <div className="flex justify-center items-center pr-4 scale-100 ease-in duration-200 hover:scale-110">
                <a href="/www.youtube.com" target="_blank">
                  <img
                    src={MatImg}
                    alt="Disciplina de matemática"
                    className="w-64 h-36 rounded-lg"
                  />
                </a>
                <div className="absolute mt-28 ml-1 bg-[#FFFFFF] w-60 h-6 rounded-lg">
                  <p className="flex items-center  justify-center text-[#585858] text-[18px] ">
                    Matemática
                  </p>
                </div>
              </div>

              <div className="flex items-center pr-4 scale-100 ease-in duration-200 hover:scale-110">
                <img
                  src={FisImg}
                  alt="Disciplina de matemática"
                  className="w-64 h-36 rounded-lg"
                />
                <div className="absolute mt-28 ml-1 bg-[#FFFFFF] w-60 h-6 rounded-lg">
                  <p className="flex items-center  justify-center text-[#585858] text-[18px] ">
                    Física
                  </p>
                </div>
              </div>

              <div className="flex items-center pr-4 scale-100 ease-in duration-200 hover:scale-110">
                <img
                  src={QuiImg}
                  alt="Disciplina de matemática"
                  className="w-64 h-36 rounded-lg"
                />
                <div className="absolute mt-28 ml-1 bg-[#FFFFFF] w-60 h-6 rounded-lg">
                  <p className="flex items-center  justify-center text-[#585858] text-[18px] ">
                    Química
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
