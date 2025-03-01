import React, { useState } from "react";
import "../global.css"; // Ensure correct import path

const ReportForm = () => {
  const [formData, setFormData] = useState({
    dateKnown: "",
    date: { month: "", year: "", day: "" },
    natureOfIncident: "",
    victimKnown: "",
    victimName: "",
    perpetratorKnown: "",
    perpetratorName: "",
    locationKnown: "",
    state: "",
    additionalLocationInfo: "",
    file: null,
    description: "",
    followUp: "",
    reporterName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.dateKnown) newErrors.dateKnown = "Required";
    if (formData.dateKnown === "yes") {
      if (!formData.date.month || !formData.date.year || !formData.date.day) {
        newErrors.date = "Please select full date";
      }
    }
    if (!formData.natureOfIncident) newErrors.natureOfIncident = "Required";
    if (!formData.victimKnown) newErrors.victimKnown = "Required";
    if (formData.victimKnown === "yes" && formData.victimName.length < 4) {
      newErrors.victimName = "Enter at least 4 letters, no special characters";
    }
    if (!formData.perpetratorKnown) newErrors.perpetratorKnown = "Required";
    if (formData.perpetratorKnown === "yes" && formData.perpetratorName.length < 4) {
      newErrors.perpetratorName = "Enter at least 4 letters, no special characters";
    }
    if (!formData.locationKnown) newErrors.locationKnown = "Required";
    if (formData.locationKnown === "yes" && !formData.state) {
      newErrors.state = "Required";
    }
    if (!formData.description) newErrors.description = "Required";
    if (!formData.followUp) newErrors.followUp = "Required";
    if (formData.followUp === "yes" && !formData.reporterName) {
      newErrors.reporterName = "Required";
    }
    if (formData.followUp === "yes" && formData.phone.length !== 11) {
      newErrors.phone = "Enter exactly 11 digits";
    }
    if (formData.followUp === "yes" && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="form-container">
      <h1>Report</h1>
      <p>Tell us everything you know about any femicide case.</p>

      <form onSubmit={handleSubmit}>
        {/* Date Known */}
        <div className="form-group">
          <p>Do you know the date of the incident? <span className="required">*</span></p>
          <div className="inline-options">
            <label><input type="radio" name="dateKnown" value="yes" onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="dateKnown" value="no" onChange={handleChange} /> No</label>
          </div>
          {errors.dateKnown && <p className="error-text">{errors.dateKnown}</p>}
        </div>

        {/* Date Fields */}
        {formData.dateKnown === "yes" && (
          <div className="date-fields">
            <label>Month <span className="required">*</span></label>
            <select name="month" onChange={handleChange}>{/* Options */}</select>
            <label>Year <span className="required">*</span></label>
            <select name="year" onChange={handleChange}>{/* Options */}</select>
            <label>Day <span className="required">*</span></label>
            <select name="day" onChange={handleChange}>{/* Options */}</select>
            {errors.date && <p className="error-text">{errors.date}</p>}
          </div>
        )}

        {/* Nature of Incident */}
        <div className="form-group">
          <label>Nature of Incident <span className="required">*</span></label>
          <select name="natureOfIncident" onChange={handleChange}>
            <option value="">Select...</option>
            <option value="Femicide">Femicide (victim is dead)</option>
            <option value="Attempted Femicide">Attempted femicide (victim survived)</option>
          </select>
          {errors.natureOfIncident && <p className="error-text">{errors.natureOfIncident}</p>}
        </div>

        {/* Victim Known */}
        <div className="form-group">
          <p>Do you know the name of the victim? <span className="required">*</span></p>
          <div className="inline-options">
            <label><input type="radio" name="victimKnown" value="yes" onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="victimKnown" value="no" onChange={handleChange} /> No</label>
          </div>
          {formData.victimKnown === "yes" && (
            <input type="text" name="victimName" placeholder="Enter victim's name" onChange={handleChange} />
          )}
          {errors.victimName && <p className="error-text">{errors.victimName}</p>}
        </div>

        {/* Perpetrator Known */}
        <div className="form-group">
          <p>Do you know the name of the perpetrator? <span className="required">*</span></p>
          <div className="inline-options">
            <label><input type="radio" name="perpetratorKnown" value="yes" onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="perpetratorKnown" value="no" onChange={handleChange} /> No</label>
          </div>
          {formData.perpetratorKnown === "yes" && (
            <input type="text" name="perpetratorName" placeholder="Enter perpetrator's name" onChange={handleChange} />
          )}
          {errors.perpetratorName && <p className="error-text">{errors.perpetratorName}</p>}
        </div>

        {/* Location */}
        <div className="form-group">
          <p>Do you know where it happened? <span className="required">*</span></p>
          <div className="inline-options">
            <label><input type="radio" name="locationKnown" value="yes" onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="locationKnown" value="no" onChange={handleChange} /> No</label>
          </div>
          {formData.locationKnown === "yes" && (
            <>
              <select name="state" onChange={handleChange}>{/* Nigerian states */}</select>
              <input type="text" name="additionalLocationInfo" placeholder="Enter City/LGA/Address" onChange={handleChange} />
            </>
          )}
          {errors.state && <p className="error-text">{errors.state}</p>}
        </div>

        {/* Submit */}
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportForm;

