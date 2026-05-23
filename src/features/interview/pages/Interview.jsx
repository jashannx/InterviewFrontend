import React, { useState } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useinterview";
import { useEffect } from "react";
import { useParams } from "react-router";
const Interview = () => {
  const { report,getReportById,loading,getResumePdf } = useInterview();
  const [activeTab, setActiveTab] = useState("behavioral");
  const { interviewId } = useParams();
  useEffect(() => {
  getReportById(interviewId);
}, [interviewId]);
if (loading || !report) {
  return (
    <div className="loading-screen">
      <div className="loader-card">
        <div className="loader-ring"></div>

        <h2>Generating Your AI Interview Report</h2>

        <p>
          Analyzing your resume, matching skills,
          and preparing personalized interview
          insights...
        </p>

        <div className="loading-steps">
          <span>✔ Resume Analysis</span>
          <span>✔ Skill Matching</span>
          <span>✔ HR Questions</span>
          <span>✔ Technical Evaluation</span>
        </div>
      </div>
    </div>
  );
}
  return (
    <main className="interview-page page container">

      {/* LEFT SIDEBAR */}

      <aside className="sidebar">
        <h2>Interview Prep</h2>

        <button
          className={activeTab === "behavioral" ? "active" : ""}
          onClick={() => setActiveTab("behavioral")}
        >
          Behavioral Questions
        </button>

        <button
          className={activeTab === "technical" ? "active" : ""}
          onClick={() => setActiveTab("technical")}
        >
          Technical Questions
        </button>

        <button
          className={activeTab === "roadmap" ? "active" : ""}
          onClick={() => setActiveTab("roadmap")}
        >
          Roadmap
        </button>
        <button onClick={() => getResumePdf(interviewId)}>Download Resume</button>
      </aside>

      {/* CENTER CONTENT */}

      <section className="content">

        {activeTab === "behavioral" && (
          <div>
            <h1>Behavioral Questions</h1>

            {report.behavioralQuestions.map((item, index) => (
              <div className="card" key={index}>
                <h3>{item.question}</h3>

                <p>
                  <span>Intention:</span> {item.intention}
                </p>

                <p>
                  <span>Answer:</span> {item.answer}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "technical" && (
          <div>
            <h1>Technical Questions</h1>

            {report.technicalQuestions.map((item, index) => (
              <div className="card" key={index}>
                <h3>{item.question}</h3>

                <p>
                  <span>Intention:</span> {item.intention}
                </p>

                <p>
                  <span>Answer:</span> {item.answer}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "roadmap" && (
          <div>
            <h1>Preparation Roadmap</h1>

            {report.preparationPlan.map((item, index) => (
              <div className="card roadmap-card" key={index}>
                <h3>Day {item.day}</h3>

                <p>
                  <span>Focus:</span> {item.focus}
                </p>

                <ul>
                  {item.tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        )}

      </section>

      {/* RIGHT SIDEBAR */}

      <aside className="right-panel">

        <div className="score-card">
          <h2>Match Score</h2>

          <div className="score-circle">
            {report.matchScore}%
          </div>
        </div>

        <div className="skills-card">
          <h2>Skill Gaps</h2>

          {report.skillGaps.map((item, index) => (
            <div className="skill" key={index}>
              <p>{item.skill}</p>

              <span className={item.severity.toLowerCase()}>
                {item.severity}
              </span>
            </div>
          ))}
        </div>

      </aside>
    </main>
  );
};

export default Interview;