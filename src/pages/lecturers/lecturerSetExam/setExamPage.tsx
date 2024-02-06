import "./setExamStyle.css";
import addButton from "../../../assets/add_button_logo copy.png";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";
import SideBar from "../../../components/sidebar/sideBar";
import { Link } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import axios from "axios";
interface Question {
  type: "objectives" | "theory" | "fill-in-the-blank";
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}

interface Section {
  questions: Question[];
}

function SetExamPage() {
  const { lecturerData } = useAuth();
  // section handling state
  const [sectionValue, setSectionValue] = useState<Record<string, string>[]>(
    []
  );

  const [popup, setPopup] = useState(false);
  const toggleAddSectionModal = () => {
    setPopup(!popup);
  };

  const [sectionDetail, setSectionDetail] = useState({
    sectionAlphabet: "",
    ScoreObtainable: "",
    questionType: "",
  });

  const [section, setSection] = useState("blank-section");
  const [instruction, setInstruction] = useState("");

  const nextSectionToggle = () => {
    sectionValue.forEach((EachSection, index) => {
      if (EachSection.questionType === section) {
        setSection(sectionValue[index + 1].questionType);
      }
    });
    // setCurrentSection((prevIndex) => (prevIndex + 1) % sectionValue.length);
  };
  const prevSectionToggle = () => {
    sectionValue.forEach((EachSection, index) => {
      if (EachSection.questionType === section) {
        setSection(sectionValue[index - 1].questionType);
      }
    });
    // setCurrentSection((prevIndex) => (prevIndex - 1) % sectionValue.length);
  };
  const [sectionDetailCopy, setSectionDetailCopy] = useState({
    sectionAlphabet: "",
    ScoreObtainable: "",
    questionType: "",
  });
  console.log("1", sectionValue);
  const handleAddSectionModalSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    const updatedSectionDetail = JSON.parse(JSON.stringify(sectionDetail));
    setSectionDetailCopy((prev) => ({
      ...prev,
      sectionAlphabet: updatedSectionDetail.sectionAlphabet,
      ScoreObtainable: updatedSectionDetail.ScoreObtainable,
      questionType: updatedSectionDetail.questionType,
    }));
    toggleAddSectionModal();
  };
  useEffect(() => {
    if (sectionDetailCopy.questionType) {
      setSection(sectionDetailCopy.questionType);
      setSectionDetail({
        sectionAlphabet: "",
        ScoreObtainable: "",
        questionType: "",
      });
      // Check if there is a questionType before updating
      setSectionValue((prevSectionValue) => [
        ...prevSectionValue,
        sectionDetailCopy,
      ]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionDetailCopy]);
  

  // fetchting each course detail frm the backedn
  const [courseDetails, setCourseDetails] = useState([]);
  useEffect(() => {
    fetchCourseDetails();
    return;
  }, []);

  const fetchCourseDetails = async () => {
    const res = await axios.get("http://localhost:3000/get-courses");
    setCourseDetails(res.data.coureDetailFromServer);
  };

  //
  const [sections, setSections] = useState<Section[]>([
    { questions: [] },
    { questions: [] },
    { questions: [] },
  ]);

  const handleQuestionChange = (
    sectionIndex: number,
    questionIndex: number,
    field: keyof Question,
    value: string
  ) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions[questionIndex] = {
      ...updatedSections[sectionIndex].questions[questionIndex],
      [field]: value,
    };
    setSections(updatedSections);
  };

  const addQuestion = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions.push({
      type: "objectives",
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
    });
    setSections(updatedSections);
  };

  const addTheoryQuestion = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions.push({
      type: "theory",
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
    });
    setSections(updatedSections);
  };
  const addFillInTheBlankQuestions = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions.push({
      type: "fill-in-the-blank",
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
    });
    setSections(updatedSections);
  };

  const removeQuestion = (sectionIndex: number, questionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions.splice(questionIndex, 1);
    setSections(updatedSections);
  };

  const [totalScore, setTotalScore] = useState("");
  const [examDuration, setexamDuration] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [session, setSession] = useState("");
  const [faculty, setFaculty] = useState("");
  const [examDate, setExamDate] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

  const submitQuestions = async (e: FormEvent) => {
    e.preventDefault();
    const assembledQuestions: Question[] = sections.reduce(
      (allQuestions, section) => allQuestions.concat(section.questions),
      [] as Question[]
    );
    console.log("assemble questions", assembledQuestions);
    try {
      const res = await axios.post("http://localhost:3000/lecturers/set-exam", {
        examDuration,
        courseCode,
        semester,
        session,
        instruction,
        courseTitle,
        faculty,
        sections: sectionValue,
        lecturerId: lecturerData?.lecturerId,
        department,
        examDate,
        totalScore: Number(totalScore),
        questions: assembledQuestions,
      });

      if (res.status === 200 && res.data.examQuestionCreated) {
        console.log("Exam created successfully");
        window.location.reload();
      } else {
        console.log("res", res);
      }
    } catch (error) {
      console.error("Error submitting questions:", error);
    }
  };
  return (
    <div className="set-exams-page-whole-container">
      {/* Sidebar */}
      <SideBar>
        {{
          sidebarElement: (
            <>
              <div className="feature-2">
                <img
                  className="img-feat"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-menu.svg"
                />
                <Link to="/lecturers/dashboard" className="text-wrapper-6">
                  Dashboard
                </Link>
              </div>

              <div className="feature-2">
                <img
                  className="img-2"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
                />

                <Link
                  to="/lecturers/dashboard/set-exams"
                  className="text-wrapper-6"
                >
                  Set Exams
                </Link>
              </div>
              <div className="feature-2">
                <img
                  className="img-2"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
                />
                <Link
                  to="/lecturers/dashboard/grade-exams"
                  className="text-wrapper-6"
                >
                  Grade Exams
                </Link>
              </div>
              <div className="feature-2">
                <img
                  className="img-2"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-refresh-square-2.svg"
                />
                <Link
                  to="/lecturers/dashboard/results"
                  className="text-wrapper-6"
                >
                  Results
                </Link>
              </div>
            </>
          ),
        }}
      </SideBar>

      {/* Main content */}
      <main className="set-exams-page-main-section">
        {/* set exams heading wrapper */}
        <div className="set-exams-inner-wrapper">
          <div className="set-exams-page-main-section-title-container">
            <h1 className="set-exams-page-main-section-title">Set Exams</h1>
          </div>
          {/* set exam form wrapper */}
          <div className="set-exams-page-all-forms">
            <div>
              <div className="set-exams-page-session-form-container">
                {/* add modal pop up fixed position */}
                {popup && (
                  <div className="add-section-pop-up">
                    <div className="inner-pop-up">
                      <h1>Add Section</h1>
                      <form onSubmit={handleAddSectionModalSubmitForm}>
                        <fieldset className="set-exam-page-modal-fieldset">
                          <label htmlFor=""> Section</label>
                          <input
                            type="text"
                            className="section-detail"
                            value={sectionDetail.sectionAlphabet}
                            onChange={(e) =>
                              setSectionDetail({
                                ...sectionDetail,
                                sectionAlphabet: e.target.value,
                              })
                            }
                            placeholder="Type section number or alphabet"
                          />
                        </fieldset>
                        <fieldset className="set-exam-page-modal-fieldset">
                          <label htmlFor=""> Score obtainable</label>
                          <input
                            type="text"
                            placeholder="Enter total marks in section"
                            value={sectionDetail.ScoreObtainable}
                            onChange={(e) =>
                              setSectionDetail({
                                ...sectionDetail,
                                ScoreObtainable: e.target.value,
                              })
                            }
                          />
                        </fieldset>
                        <fieldset className="add-section-fieldset">
                          <div className="add-section-instruction">
                            <p>
                              {" "}
                              Question Type <br />{" "}
                              <span className="set-exams-page-modal-selection-question">
                                Select 1 section at a time
                              </span>
                            </p>
                          </div>
                          <div className="add-section-type-wrapper">
                            <fieldset className="set-exams-page-modal-question-type-input">
                              <input
                                name="setSectionType"
                                type="radio"
                                id="Multiple-choice"
                                value="MultipleChoice"
                                onChange={(e) =>
                                  setSectionDetail({
                                    ...sectionDetail,
                                    questionType: e.target.value,
                                  })
                                }
                              />
                              <label htmlFor="Multiple-choice">
                                {" "}
                                Multiple Choice{" "}
                              </label>
                            </fieldset>
                            <fieldset className="set-exams-page-modal-question-type-input">
                              <input
                                name="setSectionType"
                                type="radio"
                                id="Fill-in-the-blank"
                                value="FillInTheBlank"
                                onChange={(e) =>
                                  setSectionDetail({
                                    ...sectionDetail,
                                    questionType: e.target.value,
                                  })
                                }
                              />
                              <label htmlFor="Fill-in-the-blank">
                                {" "}
                                Fill in the blanks{" "}
                              </label>
                            </fieldset>
                            <fieldset className="set-exams-page-modal-question-type-input">
                              <input
                                name="setSectionType"
                                type="radio"
                                id="Theory"
                                value="Theory"
                                onChange={(e) =>
                                  setSectionDetail({
                                    ...sectionDetail,
                                    questionType: e.target.value,
                                  })
                                }
                                // checked={sectionDetail.Theory.checked}

                                // onChange={(e) =>
                                //   setSectionDetail({
                                //     ...sectionDetail,
                                //     Theory: {
                                //       ...sectionDetail.Theory,
                                //       checked: e.target.checked,
                                //     },
                                //   })
                                // }
                              />
                              <label htmlFor="Theory"> Theory</label>
                            </fieldset>
                          </div>
                        </fieldset>
                        <div className="set-exams-page-modal-buttons-continer">
                          <button
                            className="set-exams-page-modal-button"
                            type="button"
                            onClick={toggleAddSectionModal}
                          >
                            Cancel
                          </button>
                          <button
                            className="set-exams-page-modal-button"
                            type="submit"
                          >
                            Add Section
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* all set main set exam form */}
                <form
                  className="set-exams-page-session-form"
                  onSubmit={submitQuestions}
                >
                  {/* course details to be fectched from backend */}
                  <div className="set-exams-top-form-wrapper">
                    <div className="set-exams-page-session-form-row">
                      <div className="set-exams-page-form-label-and-inputs">
                        <label
                          className="set-exams-page-session-form-label"
                          htmlFor="sessionInput"
                        >
                          Session
                        </label>
                        <br />
                        <select
                          className="set-exams-page-session-form-input"
                          name="session"
                          id="sessionInput"
                          value={session}
                          onChange={(e) => setSession(e.target.value)}
                        >
                          <option value="Please select">Please Select</option>
                          <option defaultValue="2023/2024">2023/2024</option>
                        </select>
                      </div>

                      <div className="set-exams-page-form-label-and-inputs">
                        <label
                          className="set-exams-page-session-form-label"
                          htmlFor="semesterInput"
                        >
                          Semester
                        </label>
                        <br />
                        <select
                          className="set-exams-page-session-form-input"
                          name="semester"
                          id="semesterInput"
                          value={semester}
                          onChange={(e) => setSemester(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="first semester">First</option>
                          <option value="second semester">Second</option>
                        </select>
                      </div>

                      <div className="set-exams-page-form-label-and-inputs">
                        <label
                          className="set-exams-page-session-form-label"
                          htmlFor="facultyInput"
                        >
                          Faculty
                        </label>
                        <br />
                        <select
                          className="set-exams-page-session-form-input"
                          name="semester"
                          id="semesterInput"
                          value={faculty}
                          onChange={(e) => setFaculty(e.target.value)}
                        >
                          <option value="Please select">Please Select</option>
                          {courseDetails.length > 0 ? (
                            courseDetails.map(
                              (
                                course: Record<string, unknown>,
                                index: number
                              ) => (
                                <option
                                  value={course.faculty as string}
                                  key={index}
                                >
                                  {course.faculty as string}
                                </option>
                              )
                            )
                          ) : (
                            <option value="fetching">fetching..</option>
                          )}
                        </select>
                      </div>

                      <div className="set-exams-page-form-label-and-inputs">
                        <label
                          className="set-exams-page-session-form-label"
                          htmlFor="departmentInput"
                        >
                          Department
                        </label>
                        <br />
                        <select
                          className="set-exams-page-session-form-input"
                          name="semester"
                          id="semesterInput"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                        >
                          <option value="Please select">Please Select</option>
                          {courseDetails.length > 0 ? (
                            courseDetails.map(
                              (
                                course: Record<string, unknown>,
                                index: number
                              ) => (
                                <option
                                  value={course.department as string}
                                  key={index}
                                >
                                  {course.department as string}
                                </option>
                              )
                            )
                          ) : (
                            <option value="fetching">fetching..</option>
                          )}
                        </select>
                      </div>
                    </div>

                    <div className="set-exams-page-session-form-row">
                      <div className="set-exams-page-form-label-and-inputs">
                        <label
                          className="set-exams-page-session-form-label"
                          htmlFor="courseCodeInput"
                        >
                          Course Code
                        </label>
                        <br />
                        <select
                          className="set-exams-page-session-form-input"
                          name="semester"
                          id="semesterInput"
                          value={courseCode}
                          onChange={(e) => setCourseCode(e.target.value)}
                        >
                          <option value="Please select">Please Select</option>
                          {courseDetails.length > 0 ? (
                            courseDetails.map(
                              (
                                course: Record<string, unknown>,
                                index: number
                              ) => (
                                <option
                                  value={course.courseCode as string}
                                  key={index}
                                >
                                  {course.courseCode as string}
                                </option>
                              )
                            )
                          ) : (
                            <option value="fetching">fetching..</option>
                          )}
                        </select>
                      </div>

                      <div className="set-exams-page-form-label-and-inputs">
                        <label
                          className="set-exams-page-session-form-label"
                          htmlFor="courseTitleInput"
                        >
                          Course Title
                        </label>
                        <br />
                        <select
                          className="set-exams-page-session-form-input"
                          name="semester"
                          id="semesterInput"
                          value={courseTitle}
                          onChange={(e) => setCourseTitle(e.target.value)}
                        >
                          <option value="Please select">Please Select</option>
                          {courseDetails.length > 0 ? (
                            courseDetails.map(
                              (
                                course: Record<string, unknown>,
                                index: number
                              ) => (
                                <option
                                  value={course.courseTitle as string}
                                  key={index}
                                >
                                  {course.courseTitle as string}
                                </option>
                              )
                            )
                          ) : (
                            <option value="fetching">fetching..</option>
                          )}
                        </select>
                      </div>

                      <div className="set-exams-page-form-label-and-inputs">
                        <label
                          className="set-exams-page-session-form-label"
                          htmlFor="totalScoreInput"
                        >
                          Total Score
                        </label>
                        <br />
                        <input
                          className="set-exams-page-session-form-input"
                          placeholder="Type Obtainable Score"
                          type="number"
                          id="totalScoreInput"
                          name="totalScore"
                          value={totalScore}
                          onChange={(e) => setTotalScore(e.target.value)}
                        />
                      </div>

                      <div className="set-exams-page-form-label-and-inputs">
                        <label
                          className="set-exams-page-session-form-label"
                          htmlFor="timeAllowedInput"
                        >
                          Time allowed
                        </label>
                        <br />
                        <input
                          className="set-exams-page-session-form-input"
                          placeholder="60 mins"
                          type="text"
                          id="timeAllowedInput"
                          name="timeAllowed"
                          value={examDuration}
                          onChange={(e) => setexamDuration(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="set-exams-page-session-form-instruction-row">
                      <label
                        htmlFor=""
                        className="set-exams-session-date-wrapper"
                      >
                        Date
                        <br />
                        <input
                          type="datetime-local"
                          className="set-exams-page-session-form-date-input"
                          value={examDate}
                          onChange={(e) => setExamDate(e.target.value)}
                        />
                      </label>
                      <label
                        className="set-exams-session-instructions-wrapper"
                        htmlFor="instructionsInput"
                      >
                        Instructions
                        <br />
                        <input
                          className="set-exams-page-session-form-instructions-input"
                          placeholder="Type Instructions"
                          type="text"
                          value={instruction}
                          onChange={(e) => setInstruction(e.target.value)}
                          id="instructionsInput"
                          name="instructions"
                        />
                      </label>{" "}
                    </div>
                  </div>

                  <div className="set-exams-page-bottom-form">
                    {/* add section button wrapper */}
                    <div className="set-exams-page-add-section-button-container">
                      <button
                        onClick={toggleAddSectionModal}
                        className="set-exams-page-add-section-button"
                        type="button"
                      >
                        {" "}
                        <img src={addButton} />
                        <span className="set-exams-page-add-section-button-text">
                          {" "}
                          Add Section
                        </span>
                      </button>
                    </div>
                    <div className="set-exams-page-questions-section-container">
                      <div className="set-exams-page-multiple-choice-questions-container">
                        <div className="set-exams-page-multiple-choice-questions-form">
                          {section === "blank-section" && (
                            <>
                              <h1 className="set-exams-page-questions-section-title">
                                Click on Add section Above to add the section
                                based on your question type{" "}
                              </h1>
                            </>
                          )}
                          {section === "MultipleChoice" && (
                            <div className="multiple-choice-question-wrapper">
                              <div className="set-exams-page-questions-section-header-and-marks">
                                <h1 className="set-exams-page-questions-section-title">
                                  {sectionValue
                                    .filter(
                                      (section) =>
                                        section.questionType ===
                                        "MultipleChoice"
                                    )
                                    .map((section) => {
                                      return (
                                        <>Section {section.sectionAlphabet}</>
                                      );
                                    })}
                                  <span className="set-exams-page-questions-section-header-subtitle">
                                    (Multiple Choice Question)
                                  </span>
                                </h1>
                                <hr />
                                <p className="set-exams-page-questions-section-marks">
                                  {sectionValue
                                    .filter(
                                      (section) =>
                                        section.questionType ===
                                        "MultipleChoice"
                                    )
                                    .map((section) => {
                                      return (
                                        <>
                                          {section.ScoreObtainable}
                                          Marks
                                        </>
                                      );
                                    })}
                                </p>
                                <button
                                  type="button"
                                  className="set-exams-page-questions-form-multiple-choice-add-question-button"
                                  onClick={() => addQuestion(0)}
                                >
                                  +
                                </button>
                              </div>

                              <div className="set-exams-page-question-with-options">
                                <div className="set-exams-page-mcq-inner-wrapper">
                                  {sections[0].questions.map(
                                    (question, questionIndex) => (
                                      <div key={`objectives-${questionIndex}`}>
                                        <div className="number-question-input-wrapper">
                                          <div className="btn-wrapper">
                                            <button
                                              className="remove-new-question-btn"
                                              type="button"
                                              onClick={() =>
                                                removeQuestion(0, questionIndex)
                                              }
                                            >
                                              X
                                            </button>
                                          </div>
                                          <span className="number-question-input-wrapper-number">
                                            {questionIndex + 1}
                                          </span>
                                          <input
                                            type="text"
                                            placeholder="Type question"
                                            className="objective-input-field"
                                            value={question.questionText}
                                            onChange={(e) =>
                                              handleQuestionChange(
                                                0,
                                                questionIndex,
                                                "questionText",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="options-wrapper">
                                          <label
                                            className="options-label"
                                            htmlFor=""
                                          >
                                            A.
                                            <input
                                              type="text"
                                              className="options-text"
                                              placeholder="Option A"
                                              value={question.optionA}
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "optionA",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <input
                                              type="radio"
                                              name={`question${questionIndex}`}
                                              value={question.optionA}
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "correctAnswer",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </label>
                                          <label
                                            className="options-label"
                                            htmlFor=""
                                          >
                                            B.
                                            <input
                                              type="text"
                                              placeholder="Option B"
                                              className="options-text"
                                              value={question.optionB}
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "optionB",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <input
                                              type="radio"
                                              name={`question${questionIndex}`}
                                              value={question.optionB}
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "correctAnswer",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </label>
                                          <label
                                            className="options-label"
                                            htmlFor=""
                                          >
                                            C.
                                            <input
                                              type="text"
                                              placeholder="Option C"
                                              className="options-text"
                                              value={question.optionC}
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "optionC",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <input
                                              type="radio"
                                              name={`question${questionIndex}`}
                                              value={question.optionC}
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "correctAnswer",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </label>
                                          <label
                                            className="options-label"
                                            htmlFor=""
                                          >
                                            D.
                                            <input
                                              type="text"
                                              placeholder="Option D"
                                              className="options-text"
                                              value={question.optionD}
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "optionD",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <input
                                              type="radio"
                                              name={`question${questionIndex}`}
                                              value={question.optionD}
                                              onChange={(e) =>
                                                handleQuestionChange(
                                                  0,
                                                  questionIndex,
                                                  "correctAnswer",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </label>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                              <div className="set-exams-page-bottom-form-base-button-section">
                                <div className="set-exams-page-next-section-and-save-button-container">
                                  {/* <a
                            href="#"
                            className="set-exams-page-next-section-link"
                            onClick={toggleSection}
                          >
                            <button className="set-exams-page-next-section-text">
                              Next Section
                            </button>
                            <img
                              src={nextArrow}
                              className="set-exams-page-next-section-arrow"
                            />
                          </a> */}
                                </div>
                              </div>
                            </div>
                          )}

                          {section === "Theory" && (
                            <div className="theory-question-wrapper">
                              <div className="set-exams-page-questions-section-header-and-marks">
                                <h1 className="set-exams-page-questions-section-title">
                                  {sectionDetailCopy.questionType ===
                                    "Theory" && (
                                    <>
                                      Section{" "}
                                      {sectionDetailCopy.sectionAlphabet.toUpperCase()}
                                    </>
                                  )}
                                  <span className="set-exams-page-questions-section-header-subtitle">
                                    (Theory)
                                  </span>
                                </h1>
                                <hr />
                                <p className="set-exams-page-questions-section-marks">
                                  {sectionDetailCopy.questionType ===
                                    "Theory" && (
                                    <>
                                      {sectionDetailCopy.ScoreObtainable} marks
                                    </>
                                  )}
                                </p>
                                <button
                                  type="button"
                                  className="set-exams-page-questions-form-multiple-choice-add-question-button"
                                  onClick={() => addQuestion(1)}
                                >
                                  +
                                </button>
                              </div>
                              <div className="theory-question-wrapper">
                                <h2>Theory Questions</h2>
                                {sections[1].questions.map(
                                  (question, questionIndex) => (
                                    <div key={`theory-${questionIndex}`}>
                                      <div className="number-question-input-wrapper">
                                        <span className="number-question-input-wrapper-number">
                                          {questionIndex + 1}
                                        </span>
                                        <input
                                          type="text"
                                          className="theory-question-input"
                                          placeholder="Question Text"
                                          value={question.questionText}
                                          onChange={(e) =>
                                            handleQuestionChange(
                                              1,
                                              questionIndex,
                                              "questionText",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <input
                                        type="text"
                                        placeholder="Option A"
                                        className="theory-question-input-options"
                                        value={question.optionA}
                                        onChange={(e) =>
                                          handleQuestionChange(
                                            1,
                                            questionIndex,
                                            "optionA",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <input
                                        type="text"
                                        placeholder="Option B"
                                        className="theory-question-input-options"
                                        value={question.optionB}
                                        onChange={(e) =>
                                          handleQuestionChange(
                                            1,
                                            questionIndex,
                                            "optionB",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <input
                                        type="text"
                                        placeholder="Option C"
                                        className="theory-question-input-options"
                                        value={question.optionC}
                                        onChange={(e) =>
                                          handleQuestionChange(
                                            1,
                                            questionIndex,
                                            "optionC",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <input
                                        type="text"
                                        placeholder="Option D"
                                        className="theory-question-input-options"
                                        value={question.optionD}
                                        onChange={(e) =>
                                          handleQuestionChange(
                                            1,
                                            questionIndex,
                                            "optionD",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <input
                                        type="text"
                                        placeholder="Correct Answer"
                                        className="theory-question-input-options"
                                        value={question.correctAnswer}
                                        onChange={(e) =>
                                          handleQuestionChange(
                                            1,
                                            questionIndex,
                                            "correctAnswer",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeQuestion(1, questionIndex)
                                        }
                                      >
                                        Remove Question
                                      </button>
                                    </div>
                                  )
                                )}
                                <button
                                  className="set-exams-page-add-theory-button"
                                  type="button"
                                  onClick={() => addTheoryQuestion(1)}
                                >
                                  Add Theory Question
                                </button>
                              </div>
                            </div>
                          )}
                          {section === "FillInTheBlank" && (
                            <div className="fill-in-the-blank-wrapper">
                              <div className="set-exams-page-questions-section-header-and-marks">
                                <h1 className="set-exams-page-questions-section-title">
                                  {sectionDetailCopy.questionType ===
                                    "FillInTheBlank" && (
                                    <>
                                      Section{" "}
                                      {sectionDetailCopy.sectionAlphabet.toUpperCase()}
                                    </>
                                  )}
                                  <span className="set-exams-page-questions-section-header-subtitle">
                                    (Fill in the blank)
                                  </span>
                                </h1>
                                <hr />
                                <p className="set-exams-page-questions-section-marks">
                                  {sectionDetailCopy.questionType ===
                                    "FillInTheBlank" && (
                                    <>
                                      {sectionDetailCopy.ScoreObtainable} marks
                                    </>
                                  )}
                                </p>
                                <button
                                  type="button"
                                  className="set-exams-page-questions-form-multiple-choice-add-question-button"
                                  onClick={() => addQuestion(2)}
                                >
                                  +
                                </button>
                              </div>
                              <div className="Fill-in-the-blank">
                                <h2>Fill in the blanks</h2>
                                {sections[2].questions.map(
                                  (question, questionIndex) => (
                                    <div
                                      key={`fill-in-the-blank-${questionIndex}`}
                                    >
                                      <div className="number-question-input-wrapper">
                                        <span className="number-question-input-wrapper-number">
                                          {questionIndex + 1}
                                        </span>
                                        <input
                                          type="text"
                                          className="theory-question-input"
                                          placeholder="Question Text"
                                          value={question.questionText}
                                          onChange={(e) =>
                                            handleQuestionChange(
                                              2,
                                              questionIndex,
                                              "questionText",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <input
                                        type="text"
                                        placeholder="Option A"
                                        className="theory-question-input-options"
                                        value={question.optionA}
                                        onChange={(e) =>
                                          handleQuestionChange(
                                            2,
                                            questionIndex,
                                            "optionA",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <input
                                        type="text"
                                        placeholder="Option B"
                                        className="theory-question-input-options"
                                        value={question.optionB}
                                        onChange={(e) =>
                                          handleQuestionChange(
                                            2,
                                            questionIndex,
                                            "optionB",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <input
                                        type="text"
                                        placeholder="Option C"
                                        className="theory-question-input-options"
                                        value={question.optionC}
                                        onChange={(e) =>
                                          handleQuestionChange(
                                            2,
                                            questionIndex,
                                            "optionC",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <input
                                        type="text"
                                        placeholder="Option D hidden-fill-in-the-blank"
                                        className="theory-question-input-options"
                                        value={question.optionD}
                                        onChange={(e) =>
                                          handleQuestionChange(
                                            2,
                                            questionIndex,
                                            "optionD",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <input
                                        type="text"
                                        placeholder="Correct Answer"
                                        className="theory-question-input-options fill-in-the-blanks-options"
                                        value={question.correctAnswer}
                                        onChange={(e) =>
                                          handleQuestionChange(
                                            2,
                                            questionIndex,
                                            "correctAnswer",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <button
                                        type="button"
                                        className="fill-in-the-blanks-remove-question"
                                        onClick={() =>
                                          removeQuestion(2, questionIndex)
                                        }
                                      >
                                        Remove Question
                                      </button>
                                    </div>
                                  )
                                )}
                                <button
                                  type="button"
                                  onClick={() => addFillInTheBlankQuestions(2)}
                                >
                                  Add question
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* next and previous button */}
                        {sectionValue.length >= 2 ? (
                          <>
                            <button
                              className="set-exams-page-change-section-buttons"
                              type="button"
                              onClick={nextSectionToggle}
                            >
                              Next Section
                            </button>
                            <button
                              className="set-exams-page-change-section-buttons"
                              type="submit"
                            >
                              Submit
                            </button>
                            <button
                              className="set-exams-page-change-section-buttons"
                              type="button"
                              onClick={prevSectionToggle}
                            >
                              Previous Section
                            </button>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SetExamPage;
