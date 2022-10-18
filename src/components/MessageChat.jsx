

import bigodeIcon from "../assets/bigode.png";
import etIcon from "../assets/et.png";
import pintinhoIcon from "../assets/pintinho.png";

export function MessageChat() {

    const mensagens = [
      {id:1, name: "Ramon Maia", message: "Boa tarde professor, um triângulo é tridimensional?", img: bigodeIcon},
      {id:2, name: "José Neto", message: "Bom dia professor, existe um triângulo redondo?", img: etIcon},
      {id:3, name: "Vinicíus Travincas", message: "Oi Professor, um triângulo pode ter quatro lados?", img: pintinhoIcon},
    ]
    return (
        <div className="shadow-md rounded-md bg-dark-purple w-[500px] py-2 pt-2">
        <h2 className="text-center text-[16px] font-semibold text-[#FFF]">
          Mensagens
        </h2>

        <div className="bg-white h-full w-full">
          <div className="flex flex-col justify-between">
            {
              mensagens.map((mensagem)=> {
                return (
                  <div className="w-full flex flex-row justify-start items-center p-2">
                    <div>
                      <img src={mensagem.img} alt="" />
                    </div>
                    <div className="flex flex-col ml-5 justify-start items-start">
                      <h2 className="text-[16px] text-[#4263EB]">{mensagem.name}</h2>
                      <p className="text-sm font-semibold text-[#707070]">{mensagem.message}</p>
                    </div>                    
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
}