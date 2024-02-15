import { useParams, useNavigate } from "react-router-dom";
import MainButton from "../../../components/buttons/mainButton";
import "./TakeExamOBJ.css";
import { FormEvent, useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";
import Header from "../../../components/header/header";
import StudentSideBar from "../studentsSideBar/studentsSideBar";

interface Question {
  questionText: string;
  questionType: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  questionId: string;
  scoreObtainable: string;
  sectionAlphabet: string;
}
interface ExamsDetail {
  examDuration: string;
  courseTitle: string;
  courseCode: string;
  examInstruction: string;
  semester: string;
  session: string;
  faculty: string;
  department: string;
  examDate: string;
  totalScore: string;
  totalNoOfQuestions: string;
  examId: string;
  firstSection: string;
  secondSection: string;
  thirdSection: string;
}

interface SelectedOption {
  questionId: string;
  questionText: string;
  typedAnswer?: string;
}

const TakeExamOBJ = () => {
  const { courseCode } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [examsDetail, setExamDetails] = useState<ExamsDetail>();
  const { studentData } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get(
        `/students/dashboard/take-exams/${courseCode}`
      );

      // checking the response
      if (
        res.status === 200 &&
        (res.data.questionNotAvailable || res.data.internalServerError)
      ) {
        navigate("/students/signin");
        // window.location.reload();
      } else if (
        res.status === 200 &&
        res.data.questions &&
        res.data.examsDetail
      ) {
        setQuestions(res.data.questions);
        setExamDetails(res.data.examsDetail);
      }
    }
    fetchData();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // State to store the selected options for each question
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);

  // Function to handle radio button changes
  // const handleRadioChange = (questionId: string, selectedOption: string) => {
  //   const updatedOptions = [
  //     ...selectedOptions.filter((item) => item.questionId !== questionId),
  //     { questionId, selectedOption },
  //   ];
  //   setSelectedOptions(updatedOptions);
  // };

  // Function to handle text input changes for fill-in-the-blanks and theory questions
  const handleTextChange = (
    questionId: string,
    typedAnswer: string,
    questionText: string
  ) => {
    const updatedOptions = [
      ...selectedOptions.filter((item) => item.questionId !== questionId),
      { questionId, typedAnswer, questionText },
    ];
    setSelectedOptions(updatedOptions);
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Assemble questions array`
    const assembledQuestions = questions.map((question) => {
      const selectedOption = selectedOptions.find(
        (item) => item.questionId === question.questionId
      );
      return {
        questionId: question.questionId,
        questionType: question.questionType,
        questionText: selectedOption ? selectedOption.questionText : null,
        typedAnswer: selectedOption ? selectedOption.typedAnswer : null,
      };
    });

    const courseCode = examsDetail?.courseCode;
    const studentId = studentData?.studentId;
    const examId = examsDetail?.examId;
    const sendStudentResponse = await axiosInstance.post(
      `/lecturers/grade-exam-objectives/${courseCode}`,
      {
        examId,
        studentId,
        courseCode,
        assembledQuestions,
      }
    );
    if (
      sendStudentResponse.status === 200 &&
      sendStudentResponse.data.objectivesAutoGradedSuccessfully
    ) {
      navigate(`/students/dashboard/take-exams/success/${courseCode}`);
    } else if (
      sendStudentResponse.status === 200 &&
      sendStudentResponse.data.error
    ) {
      window.location.reload();
    }

    // You can send assembledQuestions to the backend server here
  };
  return (
    <div className="take-exam-Container">
      <StudentSideBar />

      <div className="student-take-exam-body-wrapper">
        <Header newUser={studentData?.firstName || ""} />

        <div className="takeExamTimer">
          <div className="take-exam-header">Take Exam</div>

          <div className="take-exams-timer-container">
            <div className="circle-box">
              <div className="timer-circle">
                <p>118</p>
              </div>
              <div className="dot">
                <p>:</p>
              </div>
              <div className="timer-circle">
                <p>32</p>
              </div>
            </div>
            <div className="minute-seconds">
              <p>Minutes</p>
              <p>Seconds</p>
            </div>
          </div>
        </div>

        {questions.length ? (
          <div className="take-exam-form-container">
            <form className="take-exam-form" onSubmit={handleSubmit}>
              <div className="div-for-first-form">
                <div className="first-form">
                  <div>
                    <label htmlFor="session">Session</label>
                    <br />
                    <input
                      type="text"
                      value={examsDetail?.session}
                      className="input-form-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="Semester">Semester</label>
                    <br />
                    <input
                      type="text"
                      value={examsDetail?.semester}
                      className="input-form-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="Faculty">Faculty</label>
                    <br />
                    <input
                      type="text"
                      value={examsDetail?.faculty}
                      className="input-form-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="Department">Department</label>
                    <br />
                    <input
                      type="text"
                      value={examsDetail?.department}
                      className="input-form-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="Course Code">Course Code</label>
                    <br />
                    <input
                      type="text"
                      value={examsDetail?.courseCode}
                      className="input-form-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="Course Title">Course Title</label>
                    <br />
                    <input
                      type="text"
                      value={examsDetail?.courseTitle}
                      className="input-form-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="Total Score">Total Score</label>
                    <br />
                    <input
                      type="text"
                      value={
                        examsDetail?.secondSection.length
                          ? examsDetail?.totalScore
                          : examsDetail?.firstSection.split("|")[1]
                      }
                      className="input-form-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="Time allowed">Time Allowed</label>
                    <br />
                    <input
                      type="text"
                      value={examsDetail?.examDuration}
                      className="input-form-1"
                    />
                  </div>
                </div>

                <div className="lower-part-of-first-form">
                  <p>Instructions</p>
                  <p className="second-p">{examsDetail?.examInstruction}</p>
                </div>
              </div>

              <div className="div-student-id-section">
                <p>
                  ID: <span>{examsDetail?.examId}</span>
                </p>
                <div className="sub-div">
                  <p>Total score</p>
                  <div className="green-circle">
                    {examsDetail?.secondSection.length
                      ? examsDetail?.totalScore
                      : examsDetail?.firstSection.split("|")[1]}
                  </div>
                </div>
              </div>

              <div className="all-sections-wrapper">
                <>
                  <p id="section-p">
                    Section
                    {examsDetail?.firstSection.split("|")[0]}
                    {/* Section{" "}
                  {questions
                    .filter((question) => {
                      return question.questionType === "Objective";
                    })[0]
                    .sectionAlphabet?.toString()} */}
                  </p>
                </>

                <p id="section-p2">
                  {/* {questions
                  .filter((question) => {
                    return question.questionType === "Objective";
                  })[0]
                  .sectionAlphabet?.toString()}{" "} */}
                  {examsDetail?.firstSection.split("|")[1] + " "}
                  Marks
                </p>
                {/* <div className="section-score">
                <p>Section score</p>
                <div className="brown-circle"></div>
              </div> */}

                {/* objectives questions */}
                {questions
                  .filter((question) => {
                    return (
                      question.questionType === "Objective"
                      // examsDetail?.firstSection.split("|")[2]
                    );
                  })
                  .map((question, index) => (
                    <>
                      <div className="second-form" key={index}>
                        <div className="question-container">
                          <div>{index + 1}.</div>
                          <div>{question.questionText}</div>
                        </div>

                        <div className="take-exams-options-container">
                          <label htmlFor="option1">
                            A. <span>{question.optionA}</span>
                            <input
                              type="radio"
                              name={question.questionId}
                              id="option1"
                              className="option"
                              onChange={() =>
                                handleTextChange(
                                  question.questionId,
                                  question.optionA,
                                  question.questionText
                                )
                              }
                              // onChange={() =>
                              //   handleRadioChange(
                              //     question.questionId,
                              //     question.optionA
                              //   )
                              // }
                            />
                          </label>

                          <label htmlFor="option1">
                            B. <span>{question.optionB}</span>
                            <input
                              type="radio"
                              name={question.questionId}
                              id="option1"
                              className="option"
                              onChange={() =>
                                handleTextChange(
                                  question.questionId,
                                  question.optionB,
                                  question.questionText
                                )
                              }
                              // onChange={() =>
                              //   handleRadioChange(
                              //     question.questionId,
                              //     question.optionB
                              //   )
                              // }
                            />
                          </label>

                          <label htmlFor="option1">
                            C. <span>{question.optionC}</span>
                            <input
                              type="radio"
                              name={question.questionId}
                              id="option1"
                              className="option"
                              onChange={() =>
                                handleTextChange(
                                  question.questionId,
                                  question.optionC,
                                  question.questionText
                                )
                              }
                              // onChange={() =>
                              //   handleRadioChange(
                              //     question.questionId,
                              //     question.optionC
                              //   )
                              // }
                            />
                          </label>

                          <label htmlFor="option1">
                            D. <span>{question.optionD}</span>
                            <input
                              type="radio"
                              name={question.questionId}
                              id="option1"
                              className="option"
                              onChange={() =>
                                handleTextChange(
                                  question.questionId,
                                  question.optionD,
                                  question.questionText
                                )
                              }
                              // onChange={() =>
                              //   handleRadioChange(
                              //     question.questionId,
                              //     question.optionD
                              //   )
                              // }
                            />
                          </label>
                        </div>
                      </div>
                    </>
                  ))}

                {/* fill in the blanks questions */}

                {questions.map((question) => {
                  return question.questionType === "fill-in-the-blank" ? (
                    <>
                      <div className="fill-in-the-blanks-wrapper">
                        <>
                          <p id="section-p">
                            Section
                            {examsDetail?.secondSection.split("|")[0]}
                            {/* Section{" "}
                  {questions
                    .filter((question) => {
                      return question.questionType === "Objective";
                    })[0]
                    .sectionAlphabet?.toString()} */}
                          </p>
                        </>

                        <p id="section-p2">
                          {/* {questions
                  .filter((question) => {
                    return question.questionType === "Objective";
                  })[0]
                  .sectionAlphabet?.toString()}{" "} */}
                          {examsDetail?.secondSection.split("|")[1] + " "}
                          Marks
                        </p>

                        {questions
                          .filter((question) => {
                            return (
                              question.questionType === "fill-in-the-blank"
                            );
                          })
                          .map((question, index) => (
                            <>
                              <div className="second-form" key={index}>
                                <div className="question-container-theory">
                                  <div>
                                    {questions.filter((question) => {
                                      return (
                                        question.questionType === "Objective"
                                      );
                                    }).length +
                                      index +
                                      1}
                                    .
                                  </div>
                                  <div>{question.questionText}</div>
                                </div>

                                <label htmlFor="your Answer">
                                  <textarea
                                    rows={4}
                                    name={question.questionId}
                                    placeholder="Type answer"
                                    className="theory-options"
                                    value={
                                      selectedOptions.find(
                                        (option) =>
                                          option.questionId ===
                                          question.questionId
                                      )?.typedAnswer || ""
                                    }
                                    onChange={(e) =>
                                      handleTextChange(
                                        question.questionId,
                                        e.target.value,
                                        question.questionText
                                      )
                                    }
                                  ></textarea>
                                </label>
                              </div>
                            </>
                          ))}
                      </div>
                    </>
                  ) : null;
                })}

                {/* theory question */}

                {questions.map((question) => {
                  return question.questionType === "Theory" ? (
                    <>
                      <div className="theory-question-wrapper">
                        <>
                          <p id="section-p">
                            Section
                            {examsDetail?.thirdSection.split("|")[0]}
                            {/* Section{" "}
                  {questions
                    .filter((question) => {
                      return question.questionType === "Objective";
                    })[0]
                    .sectionAlphabet?.toString()} */}
                          </p>
                        </>

                        <p id="section-p2">
                          {/* {questions
                  .filter((question) => {
                    return question.questionType === "Objective";
                  })[0]
                  .sectionAlphabet?.toString()}{" "} */}
                          {examsDetail?.thirdSection.split("|")[1] + " "}
                          Marks
                        </p>

                        {questions
                          .filter((question) => {
                            return question.questionType === "Theory";
                          })
                          .map((question, index) => (
                            <>
                              <div className="second-form" key={index}>
                                <div className="question-container-theory">
                                  <div>
                                    {questions.filter((question) => {
                                      return (
                                        question.questionType === "Objective"
                                      );
                                    }).length +
                                      questions.filter((question) => {
                                        return (
                                          question.questionType ===
                                          "fill-in-the-blank"
                                        );
                                      }).length +
                                      index +
                                      1}
                                    .
                                  </div>
                                  <div>{question.questionText}</div>
                                </div>

                                <label htmlFor="your Answer">
                                  <textarea
                                    rows={4}
                                    name={question.questionId}
                                    id="option1"
                                    className="theory-options"
                                    placeholder="Type answer"
                                    value={
                                      selectedOptions.find(
                                        (option) =>
                                          option.questionId ===
                                          question.questionId
                                      )?.typedAnswer || ""
                                    }
                                    onChange={(e) =>
                                      handleTextChange(
                                        question.questionId,
                                        e.target.value,
                                        question.questionText
                                      )
                                    }
                                  ></textarea>
                                </label>
                              </div>
                            </>
                          ))}
                      </div>
                    </>
                  ) : null;
                })}
              </div>
              <div className="take-exam-submit-container">
                <MainButton button_text="Submit Exam" />
              </div>

              {/* <div className="anchor-div">
                <a href="./take-exam-obj" id="first-anchor">
                  &larr; Previous Section
                </a>
                <button id="button1" type="button">
                  1
                </button>
                <button type="button">2</button>
                <button type="button">3</button>
                <button type="button">4</button>
                <button type="button">5</button>
                <button type="button">6</button>
                <a href="./take-exam-theory" id="second-anchor">
                  Next Section &rarr;
                </a>
              </div> */}
            </form>
          </div>
        ) : (
          <div className="take-exams-main-container">
            <p>No questions available for this exam</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeExamOBJ;
