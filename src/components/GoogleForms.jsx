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
  Typography,
} from "@mui/material";

import ShortTextIcon from "@material-ui/icons/ShortText";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SubjectIcon from "@material-ui/icons/Subject";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import CloseIcon from "@material-ui/icons/Close";
import {FcRightUp} from "react-icons/fc";
import React, { useEffect, useState } from "react";

export function GoogleForms() {
  const [questions, setQuestions] = useState([
    {
      questionText: "Escolha a capital do Brasil:",
      questionType: "radio",
      options: [
        { optionText: "Rio de Janeiro" },
        { optionText: "São Paulo" },
        { optionText: "Brasília" },
        { optionText: "São Luís" },
      ],
      open: true,
      required: false,
    },
  ]);

  function questionsUI() {
    return questions.map((ques, i) => (
      <Accordion
        expanded={ques.open}
        // className={ques[i].open ? "add_border" : ""}
      >
        <AccordionSummary
          aria-controls="panelia-content"
          id="panelia-header"
          elevation={1}
          style={{ width: "100%" }}
        >
          {questions[i].open ? (
            <div className="saved_questions">
              <Typography
                style={{
                  fontsize: "15px",
                  fontWeight: "400",
                  letterSpacing: ".1px",
                  lineHeight: "24px",
                  paddingBottom: "8px",
                }}
              >
                {i + 1}.{questions[i].questionText}
              </Typography>

              {ques.options.map((op, j) => (
                <div key={j}>
                  <div>
                    <FormControlLabel
                      style={{ marginLeft: "5px", marginBottom: "5px" }}
                      disabled
                      control={
                        <input
                          type={ques.questionType}
                          color="primary"
                          style={{ marginRight: "3px" }}
                          required={ques.type}
                        />
                      }
                      label={
                        <Typography
                          style={{
                            fontFamily: "Roboto, Arial, sans-serif",
                            fontSize: "13px",
                            fontWeight: "400",
                            letterSpacing: ".2px",
                            lineHeight: "20px",
                            color: "#202124",
                          }}
                        >
                          {ques.options[j].optionText}
                        </Typography>
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </AccordionSummary>

        <div className="question_boxes">
          <AccordionDetails className="add_question">
            <div className="add_question_top">
              <input
                type="text"
                className="question"
                placeholder="Question"
                value={ques.questionText}
              ></input>
              <CropOriginalIcon style={{ color: "#5f6368" }} />
              <Select
                className="select"
                style={{ color: "#5f6368", fontSize: "13px" }}
              >
                <MenuItem id="text" value="Text">
                  <SubjectIcon style={{ marginRight: "10px" }} /> Paragraph
                </MenuItem>
                <MenuItem id="checkbox" value="Checkbox">
                  <CheckBoxIcon
                    style={{ marginRight: "10px", color: "#70757a" }}
                    checked
                  />{" "}
                  CheckBoxes
                </MenuItem>
                <MenuItem id="radio" value="Radio">
                  <Radio
                    style={{ marginRight: "10px", color: "#70757a" }}
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
                  <ShortTextIcon style={{ marginRight: "10px" }} />
                )}
                <div>
                  <input
                    type="text"
                    className="text_input"
                    placeholder="option"
                    value={ques.options[j].optionText}
                  ></input>
                </div>
                <CropOriginalIcon style={{ color: "#5f6368" }} />
                <IconButton aria-label="delete">
                  <CloseIcon />
                </IconButton>
              </div>
            ))}
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
            </div>
          </AccordionDetails>
        </div>
      </Accordion>
    ));
  }

  function changeQuestions(text, i) {
    var newQuestion = [...questions];
    newQuestion[i].questionText = text;
    setQuestions(newQuestion);
    console.log(newQuestion);
  }

  return (
    <div>
      <div className="question_form">
        <br></br>
        <div className="section">
          <div className="question_title_section">
            <div className="question_form_top">
              <input
                type="text"
                className="question_form_top_name"
                style={{ color: "black" }}
                placeholder="Untitled document"
              ></input>
              <input
                type="text"
                className="question_form_top_desc"
                placeholder="Form description"
              ></input>
            </div>
          </div>
          {questionsUI()}
        </div>
      </div>
    </div>
  );
}
