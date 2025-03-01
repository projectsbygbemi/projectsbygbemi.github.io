import React, { useState } from "react";
import "../global.css";

function ReportForm() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    dateKnown: "",
    victimKnown: "",
    perpetratorKnown: "",
    followUp: "",
    month: "",
    year: "",
    day: "",
    victimName: "",
    perpetratorName: "",
    description: "",
    phone: "",
    email: "",
    file: null,
  });

  const validateForm = () => {
    let newErrors = {};

    if (!formData.month || !formData.year || !formData.day) {
      newErrors.date = "Please select a valid date.";
    }

    if (formData.victimKnown === "yes" && !/^[a-zA-Z ]{4,}$/.test(formData.victimName)) {
      newErrors.victimName = "Name should contain only letters and be at least 4 characters.";
    }

    if (formData.perpetratorKnown === "yes" && !/^[a-zA-Z ]{4,}$/.test(formData.perpetratorName)) {
      newErrors.perpetratorName = "Name should contain only letters and be at least 4 characters.";
    }

    if (formData.phone && !/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 11 digits.";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.description.length > 2000) {
      newErrors.description = "Maximum 2000 characters allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
    }
  };

  return (
    <div className="form-container">
      <h1>Report</h1>
      <p>Tell us everything you know about any femicide case</p>

      <form onSubmit={handleSubmit}>
        <h2>Incident Report</h2>

        {/* Date of Incident */}
        <label>Do you know the date of the incident? <span className="required">*</span></label>
        <div className="inline-options">
          <label><input type="radio" name="dateKnown" value="yes" onChange={(e) => setFormData({...formData, dateKnown: e.target.value })} /> Yes</label>
          <label><input type="radio" name="dateKnown" value="no" onChange={(e) => setFormData({...formData, dateKnown: e.target.value })} /> No</label>
        </div>

        {formData.dateKnown === "yes" && (
          <div className="date-fields">
            <div>
              <label>Month <span className="required">*</span></label>
              <select required>
                <option value="">Select</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                  <option key={index} value={index + 1}>{month}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Year <span className="required">*</span></label>
              <select required>
                <option value="">Select</option>
                {[...Array(new Date().getFullYear() - 1989).keys()].map((i) => (
                  <option key={i} value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Day <span className="required">*</span></label>
              <select required>
                <option value="">Select</option>
                {[...Array(31).keys()].map((d) => (
                  <option key={d} value={d + 1}>{d + 1}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        {errors.date && <p className="error">{errors.date}</p>}

        {/* Upload File */}
        <label>Upload Evidence</label>
        <input type="file" className="file-upload" accept=".png, .jpg, .jpeg, .doc, .pdf, .mp3, .mp4" />
        <p className="file-info">Accepted file types: png, jpg, jpeg, doc, pdf, mp3, mp4.</p>

        {/* Description */}
        <label>Description of the Incident <span className="required">*</span></label>
        <textarea maxLength="2000" placeholder="Provide as many details as possible..." required></textarea>
        {errors.description && <p className="error">{errors.description}</p>}

        {/* Submit */}
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}

export default ReportForm;

