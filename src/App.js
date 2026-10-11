import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    patientName: '',
    doctorName: '',
    insurerName: '',
    medication: 'GLP‑1',
    dosage: '',
    startDate: '',
    address: ''
  });

  const [letter, setLetter] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateLetter = () => {
    const {
      patientName,
      doctorName,
      insurerName,
      medication,
      dosage,
      startDate,
      address
    } = form;

    const today = new Date().toLocaleDateString('en-US');

    const text = `
${today}
${insurerName}
Attn: Pre‑Authorization Department
${address ? address + '\\n' : ''}

Re: Pre‑Authorization Request for ${patientName}

Dear Sir/Madam,

I am writing on behalf of my patient, ${patientName}, to request pre‑authorization for ${medication} therapy. The patient has been diagnosed with Type 2 Diabetes and has not achieved adequate glycemic control with other agents.

Prescribed dosage: ${dosage}
Proposed start date: ${startDate}

Given the clinical evidence supporting ${medication} and the patient's need, I kindly ask for prompt approval.

Thank you for your attention to this matter.

Sincerely,

${doctorName}
`;

    setLetter(text.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(letter);
    alert('Letter copied to clipboard!');
  };

  return (
    <div className="container">
      <h1>GLP‑1 Pre‑Authorization Letter Generator</h1>
      <div className="form">
        <input name="patientName" placeholder="Patient Name" value={form.patientName} onChange={handleChange} />
        <input name="doctorName" placeholder="Doctor Name" value={form.doctorName} onChange={handleChange} />
        <input name="insurerName" placeholder="Insurer Name" value={form.insurerName} onChange={handleChange} />
        <input name="address" placeholder="Insurer Address (optional)" value={form.address} onChange={handleChange} />
        <input name="dosage" placeholder="Dosage (e.g., 1 mg weekly)" value={form.dosage} onChange={handleChange} />
        <input name="startDate" type="date" placeholder="Proposed Start Date" value={form.startDate} onChange={handleChange} />
        <button onClick={generateLetter}>Generate Letter</button>
      </div>
      {letter && (
        <div className="output">
          <h2>Generated Letter</h2>
          <pre>{letter}</pre>
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
}

export default App;

