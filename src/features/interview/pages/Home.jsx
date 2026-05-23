// Home.jsx

import React, { useEffect, useRef, useState } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useinterview";
import { useNavigate } from "react-router";

const Home = () => {
  const {
    loading,
    generateReport,
    reports,
    getallreports,
  } = useInterview();

  const [jobDescription, setJobDescription] =
    useState("");

  const [selfDescription, setSelfDescription] =
    useState("");

  const resumeInputRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    getallreports();
  }, []);

  const handleGenerateReport = async () => {
    const resumeFile =
      resumeInputRef.current.files[0];

    const data = await generateReport({
      selfDescription,
      jobDescription,
      resumeFile,
    });

    navigate(`/interview/${data._id}`);
  };

  if (loading) {
    return (
      <div className="loading">
        <p>
          Generating your interview report...
        </p>
      </div>
    );
  }

  return (
    <main className="home-page">
      <div className="home-container">
        {/* LEFT SECTION */}
        <section className="home-left">
          <div className="home-badge">
            AI Powered Career Assistant
          </div>

          <h1 className="home-title">
            Crack Your Next{" "}
            <span className="gradient-text">
              Technical Interview
            </span>
          </h1>

          <p className="home-subtitle">
            Upload your resume, paste the job
            description, and get a complete AI
            generated interview preparation report
            with strengths, weaknesses, and likely
            interview questions.
          </p>

          <div className="form-card">
            <div className="input-group">
              <label htmlFor="jobDescription">
                Job Description
              </label>

              <textarea
                id="jobDescription"
                placeholder="Paste the complete job description..."
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="input-group">
              <label htmlFor="resume">
                Upload Resume
              </label>

              <div className="file-upload">
                <input
                  type="file"
                  id="resume"
                  ref={resumeInputRef}
                  accept=".pdf"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="selfDescription">
                Self Description
              </label>

              <textarea
                id="selfDescription"
                placeholder="Tell us about your skills, projects, achievements, and goals..."
                value={selfDescription}
                onChange={(e) =>
                  setSelfDescription(
                    e.target.value
                  )
                }
              />
            </div>

            <button
              className="generate-btn"
              onClick={handleGenerateReport}
            >
              Generate Interview Report
            </button>
          </div>
        </section>

        {/* RIGHT SECTION */}
        <section className="home-right">
          <div className="recent-header">
            <h2>Recent Reports</h2>
          </div>

          <div className="report-list">
            {reports?.length > 0 ? (
              reports.map((report) => (
                <div
                  className="report-item"
                  key={report._id}
                  onClick={() =>
                    navigate(
                      `/interview/${report._id}`
                    )
                  }
                >
                  <div className="report-info">
                    <h3 className="report-title">
                      {report.title ||
                        "Untitled Report"}
                    </h3>

                    <span className="report-date">
                      AI Interview Analysis
                    </span>
                  </div>

                  <div className="report-score">
                    {report.matchScore || 0}%
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>
                  No reports generated yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;