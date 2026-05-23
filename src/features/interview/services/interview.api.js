import axios from 'axios';


const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URI}`,
    withCredentials: true
});


export const getInterviewReport = async ({ selfDescription, jobDescription, file }) => {
    const fromData = new FormData();
    fromData.append("selfDescription", selfDescription);
    fromData.append("jobDescription", jobDescription);
    fromData.append("resume", file);
    const response = await api.post("/api/interview/generate-report", fromData);
    return response.data;
}
export const getInterviewReportById = async (interviewId) => {
    const response =await  api.get(`/api/interview/report/${interviewId}`);
    return response.data;
}
export const getAllInterviews = async() => {
    const response = await api.get("/api/interview/reports");
    return response.data;
}
export const generateResumePdf = async (interviewId) => {
    const response = await api.post(
        `/api/interview/resume/pdf/${interviewId}`,
        {},
        {
            responseType: "arraybuffer"
        }
    );

    return response.data;
};