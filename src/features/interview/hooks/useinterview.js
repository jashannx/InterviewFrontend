import { getInterviewReport, getInterviewReportById, getAllInterviews ,generateResumePdf} from "../services/interview.api";
import { useContext } from "react";
import { InterviewContext } from "../interview.context";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";
export const useInterview = () => {
    const interviewId = useParams().interviewId;
    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error("useInterview must be used within an InterviewContextProvider");
    }
    const { loading, setLoading, report, setReport, reports, setReports } = context;
    const generateReport = async ({ selfDescription, jobDescription, resumeFile }) => {
        setLoading(true);
        let response=null;
        try {
             response = await getInterviewReport({ selfDescription, jobDescription, file: resumeFile });
            setReport(response);
        } catch (error) {
            console.error("Error generating interview report:", error);
        } finally {
            setLoading(false);
        }
        return response;
    }
    const getReportById = async (interviewId) => {
        let response=null;
        setLoading(true);
        try {
             response = await getInterviewReportById(interviewId);
            setReport(response.report);
        }
        catch (error) {
            console.error("Error fetching interview report:", error);
        }
        finally {
            setLoading(false);
        }
        return response;
    }
    const getallreports = async () => {
        let response=null;
        setLoading(true);
        try {
            response = await getAllInterviews();
            console.log("Fetched Reports:", response.reports);
            setReports(response.reports);
        } catch (error) {
            console.error("Error fetching all interview reports:", error);
        } finally {
            setLoading(false);
        }
        return response;
    }
const getResumePdf = async (interviewId) => {
    setLoading(true);

    try {
        const response = await generateResumePdf(interviewId);

        const blob = new Blob(
            [response],
            { type: "application/pdf" }
        );

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = `resume_${interviewId}.pdf`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Error generating resume PDF:", error);
    } finally {
        setLoading(false);
    }
};
    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
    }, [interviewId]);
    return { loading, report, reports, generateReport, getReportById, getallreports,getResumePdf };
}
