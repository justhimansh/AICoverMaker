import { useState } from "react";
import axios from "axios";

const API_KEY = "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"; // Replace with your actual OpenAI API key

function CoverNote() {
  const [candidateSummary, setCandidateSummary] = useState('');
  const [jobText, setJobText] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCandidateSummaryChange = (event) => {
    setCandidateSummary(event.target.value);
  };

  const handleJobDescriptionChange = (event) => {
    setJobText(event.target.value);
  };

  const handleClick = async () => {
    console.log('Candidate Text:', candidateSummary);
    console.log('Job Text:', jobText);
    setIsLoading(true);
    await testing();
    setIsLoading(false);
  };

  const copyThis = () => {
   

  }

  const testing = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`
    };

    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional cover letter writer and specialise in tailoring cover letters to job descriptions" },
        { role: "system", content: "you will be given two prompts, one will be a summary of the candidate and then the job description. Use the information of the candidate to create a cover letter tailored to the job description" },
        { role: "user", content: "Here is the candidate: " + candidateSummary + ". Here is the job description: " + jobText },
      ]
    };

    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", data, { headers });
      const generatedText = response.data.choices[0].message.content;
      setGeneratedLetter(generatedText);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="wrapper">
      <label className="label">Talk about yourself: </label>
      <input className="inputstuff" type="text" value={candidateSummary} onChange={handleCandidateSummaryChange} />
      <br></br>
      <label className="label">Paste the job description here: </label>
      <input className="inputstuff" type="text" value={jobText} onChange={handleJobDescriptionChange} />
      <button onClick={handleClick}>Generate</button>


      <div>
        {isLoading ? <h3 className="letter">Loading...</h3> : <h3 className="letter" style={{ whiteSpace: "pre-line", display: "flex", justifyContent: "center", alignItems: "center" }}>{generatedLetter}</h3>}
        {/* <button onClick={copyThis} className="copy">Copy!</button> */}
      </div>
    </div>
  );
}

export default CoverNote;


