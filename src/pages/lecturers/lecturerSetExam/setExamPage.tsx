import "./setExamStyle.css";
import addButton from "../../../assets/add_button_logo copy.png";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";
import LecturerSideBar from "../lecturerSideBar/lecturerSideBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import Header from "../../../components/header/header";

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

interface SectionValue {
  sectionAlphabet: string;
  ScoreObtainable: string;
  questionType: string;
}

function SetExamPage() {
  const { lecturerData } = useAuth();
  const navigate = useNavigate();
  // section handling state
  const [sectionValue, setSectionValue] = useState<SectionValue[]>([]);

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
    const res = await axiosInstance.get("/get-courses");
    setCourseDetails(res.data.coureDetailFromServer);
  };

  //
  const [sections, setSections] = useState<Section[]>([
    { questions: [] },
    { questions: [] },
    { questions: [] },
  ]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleQuestionChange = (
    sectionIndex: number,
    questionIndex: number,
    field: keyof Question,
    value: string
  ) => {
    if (field === "correctAnswer") {
      setSelectedAnswers((prevState) => ({
        ...prevState,
        [`question${questionIndex}`]: value,
      }));
    }
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions[questionIndex] = {
      ...updatedSections[sectionIndex].questions[questionIndex],
      [field]: value,
    };
    setSections(updatedSections);
    // Update selectedAnswers when the correctAnswer field is changed
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

  const isObjectivesSectionValid = (section: Section) => {
    return section.questions.every((question) => {
      if (
        !totalScore.trim() ||
        !examDuration.trim() ||
        !examDate.trim() ||
        !courseCode.trim() ||
        !courseTitle.trim() ||
        !department.trim() ||
        !semester.trim() ||
        !session.trim() ||
        !faculty.trim() ||
        !instruction.trim()
      ) {
        return false;
      }
      if (!question.questionText.trim()) return false;

      // Check if all options are filled
      if (
        !question.optionA.trim() ||
        !question.optionB.trim() ||
        !question.optionC.trim() ||
        !question.optionD.trim()
      ) {
        return false;
      }

      // Check if the correct answer is selected
      if (!question.correctAnswer.trim()) return false;

      return true;
    });
  };

  const isTheorySectionValid = (section: Section) => {
    return section.questions.every((question) => {
      if (
        !totalScore.trim() &&
        !examDuration.trim() &&
        !examDate.trim() &&
        !courseCode.trim() &&
        !courseTitle.trim() &&
        !department.trim() &&
        !semester.trim() &&
        !session.trim() &&
        !faculty.trim() &&
        !instruction.trim()
      ) {
        return false;
      }
      if (!question.questionText.trim()) return false;

      return true;
    });
  };

  const isFillInTheBlankSectionValid = (section: Section) => {
    return section.questions.every((question) => {
      if (
        !totalScore.trim() &&
        !examDuration.trim() &&
        !examDate.trim() &&
        !courseCode.trim() &&
        !courseTitle.trim() &&
        !department.trim() &&
        !semester.trim() &&
        !session.trim() &&
        !faculty.trim() &&
        !instruction.trim()
      ) {
        return false;
      }
      if (!question.questionText.trim()) return false;

      return true;
    });
  };

  const submitQuestions = async (e: FormEvent) => {
    e.preventDefault();
    const assembledQuestions: Question[] = sections.reduce(
      (allQuestions, section) => allQuestions.concat(section.questions),
      [] as Question[]
    );
    try {
      const res = await axiosInstance.post("/lecturers/set-exam", {
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
        navigate(`/lecturers/dashboard/set-exams/success/${courseCode}`);
      }
    } catch (error) {
      console.error("Error submitting questions:", error);
    }
  };
  return (
    <div className="set-exams-page-whole-container">
      {/* Sidebar */}
      <LecturerSideBar />

      {/* Main content */}
      <main className="set-exams-page-main-section">
        {/* set exams heading wrapper */}
        {lecturerData && (
          <Header newUser={lecturerData.title + " " + lecturerData.firstName} />
        )}
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
                            className="section-detail"
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
                        <div className="set-exams-page-modal-buttons-container">
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
                        htmlFor="dateInput"
                        className="set-exams-session-date-wrapper"
                      >
                        Date
                        <br />
                        <input
                          type="datetime-local"
                          className="set-exams-page-session-form-date-input"
                          value={examDate}
                          onChange={(e) => setExamDate(e.target.value)}
                          id="dateInput"
                          name="examDate"
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

                    <button
                      className="set-exam-page-session-form-button"
                      type="button"
                    >
                      {" "}
                      +{" "}
                    </button>
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
                                Click on the add section button above to get
                                started{" "}
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
                                        <>
                                          Section{" "}
                                          {section.sectionAlphabet.toUpperCase()}
                                        </>
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
                                              checked={
                                                (
                                                  selectedAnswers as Record<
                                                    string,
                                                    string
                                                  >
                                                )[
                                                  `question${questionIndex}`
                                                ] === question.optionA
                                              }
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
                                              checked={
                                                (
                                                  selectedAnswers as Record<
                                                    string,
                                                    string
                                                  >
                                                )[
                                                  `question${questionIndex}`
                                                ] === question.optionB
                                              }
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
                                              checked={
                                                (
                                                  selectedAnswers as Record<
                                                    string,
                                                    string
                                                  >
                                                )[
                                                  `question${questionIndex}`
                                                ] === question.optionC
                                              }
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
                                              checked={
                                                (
                                                  selectedAnswers as Record<
                                                    string,
                                                    string
                                                  >
                                                )[
                                                  `question${questionIndex}`
                                                ] === question.optionD
                                              }
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
                                        <button
                                          className="fill-in-the-blanks-remove-question"
                                          type="button"
                                          onClick={() =>
                                            removeQuestion(0, questionIndex)
                                          }
                                        >
                                          Remove question
                                        </button>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                              {sections[0].questions.length > 0 && (
                                <button
                                  className="set-exams-page-change-section-buttons set-exams-final-submit-btn"
                                  type="submit"
                                  disabled={
                                    !isObjectivesSectionValid(sections[0])
                                  }
                                >
                                  Submit
                                </button>
                              )}
                            </div>
                          )}

                          {section === "Theory" && (
                            <div className="theory-question-wrapper">
                              <div className="set-exams-page-questions-section-header-and-marks">
                                <h1 className="set-exams-page-questions-section-title">
                                  {sectionValue
                                    .filter(
                                      (section) =>
                                        section.questionType === "Theory"
                                    )
                                    .map((section) => {
                                      return (
                                        <>
                                          Section{" "}
                                          {section.sectionAlphabet.toUpperCase()}
                                        </>
                                      );
                                    })}
                                  <span className="set-exams-page-questions-section-header-subtitle">
                                    (Theory)
                                  </span>
                                </h1>
                                <hr />
                                <p className="set-exams-page-questions-section-marks">
                                  {sectionValue
                                    .filter(
                                      (section) =>
                                        section.questionType === "Theory"
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
                                  onClick={() => addTheoryQuestion(1)}
                                >
                                  +
                                </button>
                              </div>
                              <div className="theory-question-wrapper">
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

                                      <button
                                        className="fill-in-the-blanks-remove-question"
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
                              </div>
                              {sections[1].questions.length > 0 && (
                                <button
                                  className="set-exams-page-change-section-buttons set-exams-final-submit-btn"
                                  type="submit"
                                  disabled={!isTheorySectionValid(sections[1])}
                                >
                                  Submit
                                </button>
                              )}
                            </div>
                          )}

                          {section === "FillInTheBlank" && (
                            <div className="fill-in-the-blank-wrapper">
                              <div className="set-exams-page-questions-section-header-and-marks">
                                <h1 className="set-exams-page-questions-section-title">
                                  {sectionValue
                                    .filter(
                                      (section) =>
                                        section.questionType ===
                                        "FillInTheBlank"
                                    )
                                    .map((section) => {
                                      return (
                                        <>
                                          Section{" "}
                                          {section.sectionAlphabet.toUpperCase()}
                                        </>
                                      );
                                    })}
                                  <span className="set-exams-page-questions-section-header-subtitle">
                                    (Fill in the blanks)
                                  </span>
                                </h1>
                                <hr />
                                <p className="set-exams-page-questions-section-marks">
                                  {sectionValue
                                    .filter(
                                      (section) =>
                                        section.questionType ===
                                        "FillInTheBlank"
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
                                  onClick={() => addFillInTheBlankQuestions(2)}
                                >
                                  +
                                </button>
                              </div>
                              <div className="Fill-in-the-blank">
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
                                {/* <button
                                  type="button"
                                  onClick={() => addFillInTheBlankQuestions(2)}
                                >
                                  Add question
                                </button> */}
                              </div>
                              {sections[2].questions.length > 0 && (
                                <button
                                  className="set-exams-page-change-section-buttons set-exams-final-submit-btn"
                                  type="submit"
                                  disabled={
                                    !isFillInTheBlankSectionValid(sections[2])
                                  }
                                >
                                  Submit
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        {/* next and previous button */}
                        {sectionValue.length >= 2 ? (
                          <div className="set-exams-page-change-section-buttons-container">
                            <button
                              className="set-exams-page-change-section-buttons"
                              type="button"
                              onClick={prevSectionToggle}
                            >
                              Previous Section
                            </button>

                            <button
                              className="set-exams-page-change-section-buttons"
                              type="button"
                              onClick={nextSectionToggle}
                            >
                              Next Section
                            </button>
                          </div>
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
