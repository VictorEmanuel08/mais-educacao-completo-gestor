import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  Select,
  Switch,
  Typography,
} from "@mui/material";

import ShortTextIcon from "@material-ui/icons/ShortText";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SubjectIcon from "@material-ui/icons/Subject";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import CloseIcon from "@material-ui/icons/Close";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import { FcRightUp } from "react-icons/fc";
import { BsTrash } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { MdDragIndicator, MdOndemandVideo, MdTextFields } from "react-icons/md";
import TextField from "@mui/material/TextField";
import "./GoogleForms.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "react-modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Checkbox } from "@mui/material";

export function GoogleForms() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      questionType: "radio",
      options: [
        { optionText: "" },
        { optionText: "" },
        { optionText: "" },
        { optionText: "" },
        { optionText: "" },
      ],
      answer: false,
      answerKey: "",
      points: 0,
      open: true,
      required: false,
    },
  ]);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function changeQuestion(text, i) {
    var newQuestion = [...questions];
    newQuestion[i].questionText = text;
    setQuestions(newQuestion);
    console.log(newQuestion);
  }

  function changeOptionValue(text, i, j) {
    var optionsQuestion = [...questions];
    optionsQuestion[i].options[j].optionText = text;

    setQuestions(optionsQuestion);
    console.log(optionsQuestion);
  }

  function addQuestionType(i, type) {
    let qs = [...questions];
    console.log(type);
    qs[i].questionType = type;

    setQuestions(qs);
  }

  function removeOption(i, j) {
    var RemoveOptionQuestion = [...questions];
    if (RemoveOptionQuestion[i].options.length > 1) {
      RemoveOptionQuestion[i].options.splice(j, 1);
      setQuestions(RemoveOptionQuestion);
      console.log(i + "___" + j);
    }
    console.log(questions);
  }

  console.log(questions);

  function addOption(i) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i].options.push({
        optionText: "Alternativa " + (optionsOfQuestion[i].options.length + 1),
      });
    } else {
      console.log("Máximo de 5 alternativas");
    }

    setQuestions(optionsOfQuestion);
  }

  function copyQuestion(i) {
    let qs = [...questions];
    var newQuestion = qs[i];

    setQuestions([...questions, newQuestion]);
  }

  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }

  function requiredQuestion(i) {
    var reqQuestion = [...questions];

    reqQuestion[i].required = !reqQuestion[i].required;
    console.log(reqQuestion[i].required + "" + i);
    setQuestions(reqQuestion);
  }

  function addMoreQuestionField() {
    setQuestions([
      ...questions,
      {
        questionText: "",
        questionType: "radio",
        options: [{ optionText: "" }],
        open: true,
        required: false,
      },
    ]);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questions];
    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );
    setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function questionsUI() {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div>
                <MdDragIndicator
                  style={{
                    transform: "rotate(-90deg)",
                    color: "#DAE0E2",
                    position: "relative",
                    left: "330px",
                  }}
                  fontSize="small"
                />
              </div>
              <div>
                <Accordion
                  expanded={questions[i].open}
                  className={questions[i].open ? "add_border" : ""}
                >
                  <div className="question_boxes">
                    <div className="add_question">
                      <div className="flex flex-row w-full justify-between items-center text-black">
                        <p className="mr-4 text-dark-purple text-[20px]">
                          {i + 1})
                        </p>
                      </div>

                      <div className="mt-4 mb-12 w-full h-[40px]">
                        <textarea
                          placeholder="Pergunta"
                          value={ques.questionText}
                          onChange={(e) => {
                            changeQuestion(e.target.value, i);
                          }}
                          className="bg-[#EDF2FF] w-full h-fit placeholder-black outline-none text-black text-[18px] rounded-lg p-2 scrollbar-thin resize-none"
                        />
                      </div>
                      {ques.options.map((op, j) => (
                        <div className="add_question_body" key={j}>
                          {/* alternativas */}
                          <div>
                            <div className="flex flex-row items-center justify-between mt-2">
                              <Checkbox className="cursor-pointer text-dark-purple" />
                              <textarea
                                type="text"
                                className="bg-[#EDF2FF] w-full h-[40px] placeholder-black outline-none text-[18px] rounded-lg p-2 scrollbar-thin resize-none"
                                placeholder={`Alternativa ${j + 1}`}
                                value={ques.options[j].optionText}
                                onChange={(e) => {
                                  changeOptionValue(e.target.value, i, j);
                                }}
                              />
                              <CloseIcon
                                className="cursor-pointer text-dark-purple"
                                onClick={() => {
                                  removeOption(i, j);
                                }}
                              />
                              {/* Deletar alternativa */}
                            </div>
                          </div>
                        </div>
                      ))}

                      {ques.options.length < 5 ? (
                        <div className="add_question_body">
                          <FormControlLabel
                            disabled
                            control={
                              ques.questionType != "text" ? <input /> : ""
                            }
                            label={
                              <div className="h-[40px] mt-4 mb-4">
                                <button
                                  onClick={() => addOption(i)}
                                  className="flex items-center justify-center w-full h-full bg-dark-purple rounded-lg text-white "
                                >
                                  <AddCircleOutlineIcon className="mr-4" />
                                  Adicionar Alternativas
                                </button>
                              </div>
                            }
                          />
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="add_footer">
                        <div className="add_question_bottom">
                          <IconButton
                            aria-label="delete"
                            onClick={() => deleteQuestion(i)}
                          >
                            <BsTrash />
                          </IconButton>
                        </div>
                      </div>
                    </div>

                    <div className="question_edit">
                      <AddCircleOutline
                        onClick={addMoreQuestionField}
                        className="edit"
                      />
                      <MdOndemandVideo className="edit" />
                      <CropOriginalIcon className="edit" />
                      <MdTextFields className="edit" />
                    </div>
                  </div>
                </Accordion>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  }

  return (
    <div>
      <div className="flex justify-center text-dark-purple">
        <button
          onClick={openModal}
          className="bg-white p-1 mb-4 rounded-lg w-full h-fit flex items-center justify-center"
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

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questionsUI()}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
