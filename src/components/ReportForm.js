import React, { useState } from "react";
import "../global.css"; 

const ReportForm = () => {
  const [incidentDateKnown, setIncidentDateKnown] = useState(null);
  const [victimKnown, setVictimKnown] = useState(null);
  const [perpetratorKnown, setPerpetratorKnown] = useState(null);
  const [followUpConsent, setFollowUpConsent] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [day, setDay] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = (event) => {
    event.preventDefault();
    let formErrors = {};

    const nameRegex = /^[A-Za-z\s]{4,}$/; // Only letters, spaces, min 4 chars

    if (!incidentDateKnown) formErrors.incidentDateKnown = "Required";
    if (!victimKnown) formErrors.victimKnown = "Required";
    if (!perpetratorKnown) formErrors.perpetratorKnown = "Required";
    if (!followUpConsent) formErrors.followUpConsent = "Required";

    if (incidentDateKnown === "yes" && (!month || !year || !day)) {
      formErrors.date = "Please select a valid date.";
    }

    if (victimKnown === "yes") {
      const victimName = event.target.victimName.value.trim();
      if (!nameRegex.test(victimName)) formErrors.victimName = "Name must be at least 4 letters, no numbers or special characters.";
    }

    if (perpetratorKnown === "yes") {
      const perpetratorName = event.target.perpetratorName.value.trim();
      if (!nameRegex.test(perpetratorName)) formErrors.perpetratorName = "Name must be at least 4 letters, no numbers or special characters.";
    }

    if (followUpConsent === "yes") {
      const phone = event.target.phone.value.trim();
      if (!/^\d{11}$/.test(phone)) formErrors.phone = "Phone number must be exactly 11 digits.";

      const email = event.target.email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) formErrors.email = "Enter a valid email address.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      alert("Form submitted successfully!");
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  return (
    <div className="form-container">
      <h1>Report</h1>
      <p>Tell us everything you know about any femicide case.</p>

      <form onSubmit={validateForm}>
        {/* Do you know the date of the incident? */}
        <div className="form-group">
          <label>Do you know the date of the incident? <span className="required">*</span></label>
          <div className="inline-options">
            <input type="radio" name="incidentDateKnown" value="yes" onChange={() => setIncidentDateKnown("yes")} /> <p>Yes</p>
            <input type="radio" name="incidentDateKnown" value="no" onChange={() => setIncidentDateKnown("no")} /> <p>No</p>
          </div>
          {errors.incidentDateKnown && <p className="error">{errors.incidentDateKnown}</p>}
        </div>

        {/* Date selection if "Yes" */}
        {incidentDateKnown === "yes" && (
          <div className="date-fields">
            <div>
              <label>Month <span className="required">*</span></label>
              <select onChange={(e) => setMonth(e.target.value)} required>
                <option value="">Select</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, index) => (
                  <option key={index} value={index + 1}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Year <span className="required">*</span></label>
              <select onChange={(e) => setYear(e.target.value)} required>
                <option value="">Select</option>
                {[...Array(35)].map((_, i) => {
                  const y = new Date().getFullYear() - i;
                  return <option key={y} value={y}>{y}</option>;
                })}
              </select>
            </div>
            <div>
              <label>Day <span className="required">*</span></label>
              <select onChange={(e) => setDay(e.target.value)} required>
                <option value="">Select</option>
                {[...Array(getDaysInMonth(month, year))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        {errors.date && <p className="error">{errors.date}</p>}

        {/* Name of Victim */}
        <div className="form-group">
          <label>Do you know the name of the victim? <span className="required">*</span></label>
          <div className="inline-options">
            <input type="radio" name="victimKnown" value="yes" onChange={() => setVictimKnown("yes")} /> <p>Yes</p>
            <input type="radio" name="victimKnown" value="no" onChange={() => setVictimKnown("no")} /> <p>No</p>
          </div>
        </div>

        {victimKnown === "yes" && (
          <input type="text" name="victimName" placeholder="Enter victim's name" />
        )}
        {errors.victimName && <p className="error">{errors.victimName}</p>}

        {/* File Upload */}
        <div className="form-group">
          <label>Upload Evidence</label>
          <input type="file" className="file-upload" accept=".png, .jpg, .jpeg, .doc, .pdf, .mp3, .mp4" />
          <p className="file-info">Allowed file types: PNG, JPG, JPEG, DOC, PDF, MP3, MP4</p>
        </div>

        {/* Describe Incident */}
        <div className="form-group">
          <label>Describe the Incident <span className="required">*</span></label>
          <textarea name="description" maxLength="2000" required></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportForm;

