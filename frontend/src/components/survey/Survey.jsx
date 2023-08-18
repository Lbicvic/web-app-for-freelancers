import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import axios from "axios";

const Survey = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [downloadMessage, setDownloadMessage] = useState("");

  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);
  const [answer3, setAnswer3] = useState(0);
  const [answer4, setAnswer4] = useState(0);
  const [answer5, setAnswer5] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();

    const survey = {
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      answer5: answer5,
    };

    axios
      .post("http://localhost:3003/api/survey/", JSON.stringify(survey), {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setError("");
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data);
      });
  }

  async function handleDownload(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3003/api/survey/exportToExcel", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setDownloadMessage("File has been downloaded inside project folder");
      })
      .catch((error) => {
        console.log(error.response.data);
        setDownloadMessage(error.response.data);
      });
  }

  return (
    <>
      <Header />
      <section className="survey">
        <div className="survey__wrapper">
          <h2>Survey</h2>
          <p>Legend: 1-bad 2-good 3-very good 4-excellent</p>
          <form onSubmit={handleSubmit} className="survey__content">
            <div
              className="survey__question"
              onChange={(e) => {
                setAnswer1(e.target.value);
              }}
            >
              <p>
                Overall, how would you describe your satisfaction with our
                services?
              </p>
              <input
                className="answer"
                type="radio"
                id="question1Answer1"
                name="question1"
                value={1}
                required
              />
              <label htmlFor="question1Answer1">1</label>

              <input
                className="answer"
                type="radio"
                id="question1Answer2"
                name="question1"
                value={2}
                required
              />
              <label htmlFor="question1Answer2">2</label>

              <input
                className="answer"
                type="radio"
                id="question1Answer3"
                name="question1"
                value={3}
                required
              />
              <label htmlFor="question1Answer3">3</label>

              <input
                className="answer"
                type="radio"
                id="question1Answer4"
                name="question1"
                value={4}
                required
              />
              <label htmlFor="question1Answer4">4</label>
            </div>
            <div
              className="survey__question"
              onChange={(e) => {
                setAnswer2(e.target.value);
              }}
            >
              <p>How would you rate our UI?</p>
              <input
                className="answer"
                type="radio"
                id="question2Answer1"
                name="question2"
                value={1}
                required
              />
              <label htmlFor="question2Answer1">1</label>

              <input
                className="answer"
                type="radio"
                id="question2Answer2"
                name="question2"
                value={2}
                required
              />
              <label htmlFor="question2Answer2">2</label>

              <input
                className="answer"
                type="radio"
                id="question2Answer3"
                name="question2"
                value={3}
                required
              />
              <label htmlFor="question2Answer3">3</label>

              <input
                className="answer"
                type="radio"
                id="question2Answer4"
                name="question2"
                value={4}
                required
              />
              <label htmlFor="question2Answer4">4</label>
            </div>
            <div
              className="survey__question"
              onChange={(e) => {
                setAnswer3(e.target.value);
              }}
            >
              <p>
                Based on your recent experiences, how would you describe your
                first encounter with a freelancer/customer within our app?
              </p>
              <input
                className="answer"
                type="radio"
                id="question3Answer1"
                name="question3"
                value={1}
                required
              />
              <label htmlFor="question3Answer1">1</label>

              <input
                className="answer"
                type="radio"
                id="question3Answer2"
                name="question3"
                value={2}
                required
              />
              <label htmlFor="question3Answer2">2</label>

              <input
                className="answer"
                type="radio"
                id="question3Answer3"
                name="question3"
                value={3}
                required
              />
              <label htmlFor="question3Answer3">3</label>

              <input
                className="answer"
                type="radio"
                id="question3Answer4"
                name="question3"
                value={4}
                required
              />
              <label htmlFor="question3Answer4">4</label>
            </div>
            <div
              className="survey__question"
              onChange={(e) => {
                setAnswer4(e.target.value);
              }}
            >
              <p>Overall, how would you rate our client-freelancer approach?</p>
              <input
                className="answer"
                type="radio"
                id="question4Answer1"
                name="question4"
                value={1}
                required
              />
              <label htmlFor="question4Answer1">1</label>

              <input
                className="answer"
                type="radio"
                id="question4Answer2"
                name="question4"
                value={2}
                required
              />
              <label htmlFor="question4Answer2">2</label>

              <input
                className="answer"
                type="radio"
                id="question4Answer3"
                name="question4"
                value={3}
                required
              />
              <label htmlFor="question4Answer3">3</label>

              <input
                className="answer"
                type="radio"
                id="question4Answer4"
                name="question4"
                value={4}
                required
              />
              <label htmlFor="question4Answer4">4</label>
            </div>
            <div
              className="survey__question"
              onChange={(e) => {
                setAnswer5(e.target.value);
              }}
            >
              <p>
                Based on your recent experiences, how would you rate our app in
                general?
              </p>
              <input
                className="answer"
                type="radio"
                id="question5Answer1"
                name="question5"
                value={1}
                required
              />
              <label htmlFor="question5Answer1">1</label>

              <input
                className="answer"
                type="radio"
                id="question5Answer2"
                name="question5"
                value={2}
                required
              />
              <label htmlFor="question5Answer2">2</label>

              <input
                className="answer"
                type="radio"
                id="question5Answer3"
                name="question5"
                value={3}
                required
              />
              <label htmlFor="question5Answer3">3</label>

              <input
                className="answer"
                type="radio"
                id="question5Answer4"
                name="question5"
                value={4}
                required
              />
              <label htmlFor="question5Answer4">4</label>
            </div>
            <button type="submit">Send</button>
            {error && <div className="error"> {error} </div>}
          </form>
          {currentUser.email === "admin@gmail.com" && (
            <>
              <button
                type="submit"
                onClick={handleDownload}
                className="download-button"
              >
                Download
              </button>
              {downloadMessage && (
                <div className="download-message"> {downloadMessage} </div>
              )}
            </>
          )}
          <p>
            Return to{" "}
            <Link to="/home" className="form__link">
              Homepage
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Survey;
