import React, { useEffect, useState } from "react";

import { Checkbox } from "@mui/material";

import Modal from "react-modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export function NewModalcomponent() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [atividade, setAtividade] = useState([]);
  const [selectValue, setSelectValue] = useState("Múltipla escolha"); // multipla
  const [alternativa, setAlternativa] = useState([]);
  const [questao, setQuestao] = useState([]);
  const [title_question, setTitle_question] = useState([]);

  const [arrayCount, setArrayCount] = useState(-1);

  const optionTipo = [
    { id: 1, nome: "Múltipla escolha" },
    { id: 2, nome: "Subjetiva" },
  ];

  const addInputAlternativa = (e) => {
    e.preventDefault();

    const objetoOptions = { description: e };
    setAlternativa([...alternativa, objetoOptions]);
  };

  const handleChangeAlternativa = (e, index) => {
    alternativa[index] = e.target.value;
    setAlternativa([...alternativa]);
    console.log(alternativa);
  };

  const addInputQuestao = (e) => {
    e.preventDefault();
    const objetoQuestao = {
      title_question: title_question[arrayCount],
      question_type: selectValue,
      options: alternativa,
    };
    setQuestao([...questao, objetoQuestao]);
    setArrayCount(arrayCount + 1);
  };
  console.log(questao);

  const handleChangeTitleQuestion = (e, index) => {
    title_question[index] = e.target.value;
    setTitle_question([...title_question]);
  };

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <div>
      <div className="flex justify-center text-dark-purple">
        <button
          onClick={openModal}
          className="bg-white mb-4 rounded-lg w-4/5 h-fit flex items-center justify-center"
        >
          <AddCircleIcon /> Nova Atividade
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          overlayClassName="flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 bg-black-rgba"
          className="flex flex-col bg-white w-2/5 h-4/5 rounded-lg p-1 px-8 text-dark-purple scrollbar-thin scrollbar-thumb-[#EDF2FF]-700 scrollbar-track-[#000000]-300 overflow-y-scroll"
        >
          <div className="flex items-center justify-center">
            <p className="text-[25px] font-semibold">Nova Atividade</p>
          </div>

          <div className="flex flex-col text-dark-purple py-4 border-dashed border-b-2 border-dark-purple">
            <input
              placeholder="Título"
              className="w-fit placeholder-dark-purple outline-none text-[25px]"
            />
          </div>
          <div>
            <div className="flex flex-col mt-4 px-4">
              {questao.map((_, index) => (
                <div key={index}>
                  <div className="flex flex-row w-full justify-between items-center text-black">
                    <p className="mr-4 text-dark-purple text-[20px]">
                      {index + 1})
                    </p>

                    <div className="flex items-center h-[40px] w-1/3">
                      <DeleteForeverOutlinedIcon
                        sx={{ fontSize: 30 }}
                        className="cursor-pointer text-dark-purple mr-2"
                      />
                      <div className="bg-[#EDF2FF] w-full rounded-lg p-2 pr-4">
                        <select
                          className="bg-transparent w-full rounded-lg outline-none"
                          name="TipoDeQuestão"
                          value={selectValue}
                          onChange={(e) => setSelectValue(e.target.value)}
                        >
                          {optionTipo.map((item) => (
                            <option key={item.id} value={item.nome}>
                              {item.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 mb-12 w-full h-[40px]">
                    <textarea
                      placeholder="Pergunta"
                      onChange={(e) => handleChangeTitleQuestion(e, index)}
                      className="bg-[#EDF2FF] w-full h-fit placeholder-black outline-none text-black text-[18px] rounded-lg p-2 scrollbar-thin resize-none"
                    />
                  </div>

                  <div>
                    {selectValue === "Múltipla escolha" ? (
                      <div>
                        {alternativa.map((description, index) => (
                          <div
                            key={index}
                            className="flex flex-row items-center justify-between mt-2"
                          >
                            <Checkbox className="cursor-pointer text-dark-purple" />
                            <textarea
                              id={`descricao-${index + 1}`}
                              // value={description}
                              placeholder={`Alternativa ${index + 1}`}
                              onChange={(e) =>
                                handleChangeAlternativa(e, index)
                              }
                              className="bg-[#EDF2FF] w-full h-[40px] placeholder-black outline-none text-[18px] rounded-lg p-2 scrollbar-thin resize-none"
                            />
                            <CloseIcon className="cursor-pointer text-dark-purple" />
                          </div>
                        ))}

                        <div className="h-[40px] mt-4 mb-4">
                          <button
                            onClick={addInputAlternativa}
                            className="flex items-center justify-center w-full h-full bg-dark-purple rounded-lg text-white "
                          >
                            <AddCircleOutlineIcon className="mr-4" />
                            Adicionar Alternativas
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {selectValue == "Subjetiva" ? <div></div> : null}
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-center mt-2">
                <button
                  onClick={addInputQuestao}
                  className="flex items-center justify-center w-1/3 h-[40px] bg-dark-purple rounded-lg text-white"
                >
                  Adicionar Questão
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-end my-8 px-4 w-full">
            <button
              onClick={closeModal}
              className="bg-[#EDF2FF] rounded-lg text-black w-1/6 h-[40px] mr-4"
            >
              Cancelar
            </button>
            <button
              onClick={closeModal}
              className="bg-dark-purple rounded-lg text-white w-1/6 h-[40px]"
            >
              Salvar
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
