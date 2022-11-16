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
                    <AccordionDetails className="add_question">
                      <div className="add_question_top">
                        <input
                          type="text"
                          className="question"
                          placeholder={`Questão ${i + 1}`}
                          value={ques.questionText}
                          onChange={(e) => {
                            changeQuestion(e.target.value, i);
                          }}
                        ></input>
                        <CropOriginalIcon style={{ color: "#5f6368" }} />
                        <Select
                          className="select"
                          style={{ color: "#5f6368", fontSize: "13px" }}
                        >
                          <MenuItem
                            id="text"
                            value="Text"
                            onClick={() => {
                              addQuestionType(i, "text");
                            }}
                          >
                            <SubjectIcon style={{ marginRight: "10px" }} />{" "}
                            Paragraph
                          </MenuItem>
                          <MenuItem
                            id="checkbox"
                            value="Checkbox"
                            onClick={() => {
                              addQuestionType(i, "checkbox");
                            }}
                          >
                            <CheckBoxIcon
                              style={{
                                marginRight: "10px",
                                color: "#70757a",
                              }}
                              checked
                            />
                            CheckBoxes
                          </MenuItem>
                          <MenuItem
                            id="radio"
                            value="Radio"
                            onClick={() => {
                              addQuestionType(i, "radio");
                            }}
                          >
                            <Radio
                              style={{
                                marginRight: "10px",
                                color: "#70757a",
                              }}
                              checked
                            />{" "}
                            Multiple Choice
                          </MenuItem>
                        </Select>
                      </div>
                      {ques.options.map((op, j) => (
                        <div className="add_question_body" key={j}>
                          {ques.questionType != "text" ? (
                            <input
                              type={ques.questionType}
                              style={{ marginRight: "10px" }}
                            />
                          ) : (
                            <TextField style={{ marginRight: "10px" }} />
                          )}
                          <div>
                            <input
                              type="text"
                              className="text_input"
                              placeholder={`Alternativa ${j + 1}`}
                              value={ques.options[j].optionText}
                              onChange={(e) => {
                                changeOptionValue(e.target.value, i, j);
                              }}
                            ></input>
                          </div>
                          <CropOriginalIcon style={{ color: "#5f6368" }} />
                          <IconButton aria-label="delete">
                            <CloseIcon
                              onClick={() => {
                                removeOption(i, j);
                              }} //Deletar alternativa
                            />
                          </IconButton>
                        </div>
                      ))}

                      {ques.options.length < 5 ? (
                        <div className="add_question_body">
                          <FormControlLabel
                            disabled
                            control={
                              ques.questionType != "text" ? (
                                <input
                                  type={ques.questionType}
                                  color="primary"
                                  inputProps={{
                                    "aria-label": "secondary checkbox",
                                  }}
                                  style={{
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                  }}
                                  disabled
                                />
                              ) : (
                                <ShortTextIcon
                                  style={{ marginRight: "10px" }}
                                />
                              )
                            }
                            label={
                              <div>
                                <input
                                  type="text"
                                  className="text_input"
                                  style={{ fontSize: "13px", width: "60px" }}
                                  placeholder="Add other"
                                ></input>
                                <Button
                                  size="small"
                                  onClick={() => addOption(i)}
                                  style={{
                                    textTransform: "none",
                                    color: "#4285f4",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                >
                                  Add option
                                </Button>
                              </div>
                            }
                          />
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="add_footer">
                        <div className="add_question_bottom_left">
                          <Button
                            size="small"
                            style={{
                              textTransform: "none",
                              color: "#4285f4",
                              fontSize: "13px",
                              fontWeight: "600",
                            }}
                          >
                            <FcRightUp
                              style={{
                                border: "2px solif #4285f4",
                                padding: "2px",
                                marginRight: "8px",
                              }}
                            />
                            Answer Key
                          </Button>
                        </div>
                        <div className="add_question_bottom">
                          <IconButton
                            aria-label="Copy"
                            onClick={() => {
                              copyQuestion(i);
                            }}
                          >
                            <FilterNoneIcon />
                          </IconButton>

                          <IconButton
                            aria-label="delete"
                            onClick={() => deleteQuestion(i)}
                          >
                            <BsTrash />
                          </IconButton>

                          <span style={{ color: "#5f6368", fontSize: "13px" }}>
                            Required
                          </span>
                          <Switch
                            name="checkedA"
                            color="primary"
                            onClick={() => {
                              requiredQuestion(i);
                            }}
                            checked
                          />

                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        </div>
                      </div>
                    </AccordionDetails>

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
