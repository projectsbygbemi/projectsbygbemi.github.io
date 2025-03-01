import React, { useState } from "react";
import "../global.css";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    incidentDateKnown: "",
    incidentMonth: "",
    incidentYear: "",
    incidentDay: "",
    natureOfIncident: "",
    victimNameKnown: "",
    victimName: "",
    perpetratorNameKnown: "",
    perpetratorName: "",
    locationKnown: "",
    state: "",
    additionalInfo: "",
    evidence: null,
    incidentDescription: "",
    followUp: "",
    reporterName: "",
    reporterPhone: "",
    reporterEmail: "",
  });

  const [errors, setErrors] = useState({});
  const [daysInMonth, setDaysInMonth] = useState([]);

  const statesOfNigeria = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
    "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
    "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
    "Yobe", "Zamfara"
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });

    if (name === "incidentMonth" || name === "incidentYear") {
      const month = name === "incidentMonth" ? value : formData.incidentMonth;
      const year = name === "incidentYear" ? value : formData.incidentYear;
      updateDays(month, year);
    }
  };

  const updateDays = (month, year) => {
    if (!month || !year) return;
    const days = new Date(year, month, 0).getDate();
    setDaysInMonth([...Array(days).keys()].map((d) => d + 1));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.incidentDateKnown) newErrors.incidentDateKnown = "Required";
    if (formData.incidentDateKnown === "Yes" && (!formData.incidentMonth || !formData.incidentYear || !formData.incidentDay)) {
      newErrors.incidentDate = "Please select a complete date.";
    }
    if (!formData.natureOfIncident) newErrors.natureOfIncident = "Required";
    if (!formData.victimNameKnown) newErrors.victimNameKnown = "Required";
    if (formData.victimNameKnown === "Yes" && !/^[A-Za-z\s]{4,}$/.test(formData.victimName)) {
      newErrors.victimName = "At least 4 characters, letters only.";
    }
    if (!formData.perpetratorNameKnown) newErrors.perpetratorNameKnown = "Required";
    if (formData.perpetratorNameKnown === "Yes" && !/^[A-Za-z\s]{4,}$/.test(formData.perpetratorName)) {
      newErrors.perpetratorName = "At least 4 characters, letters only.";
    }
    if (!formData.locationKnown) newErrors.locationKnown = "Required";
    if (formData.locationKnown === "Yes" && !formData.state) {
      newErrors.state = "Required";
    }
    if (!formData.incidentDescription) newErrors.incidentDescription = "Required";
    if (!formData.followUp) newErrors.followUp = "Required";
    if (formData.followUp === "Yes") {
      if (!/^[A-Za-z\s]{4,}$/.test(formData.reporterName)) newErrors.reporterName = "At least 4 characters, letters only.";
      if (!/^\d{11}$/.test(formData.reporterPhone)) newErrors.reporterPhone = "Phone number must be exactly 11 digits.";
      if (!/^\S+@\S+\.\S+$/.test(formData.reporterEmail)) newErrors.reporterEmail = "Please enter a valid email address.";
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
    <form className="form-container" onSubmit={handleSubmit}>
      {/* Do you know the date of the incident? */}
      <label>Do you know the date of the incident?<span className="required">*</span></label>
      <div className="inline-options">
        <input type="radio" name="incidentDateKnown" value="Yes" onChange={handleChange} /> Yes
        <input type="radio" name="incidentDateKnown" value="No" onChange={handleChange} /> No
      </div>
      {errors.incidentDateKnown && <p className="error">{errors.incidentDateKnown}</p>}

      {formData.incidentDateKnown === "Yes" && (
        <div className="date-fields">
          <div>
            <label>Month</label>
            <select name="incidentMonth" onChange={handleChange}>
              <option value="">Select</option>
              {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                .map((month, index) => <option key={index} value={index + 1}>{month}</option>)}
            </select>
          </div>
          <div>
            <label>Year</label>
            <select name="incidentYear" onChange={handleChange}>
              <option value="">Select</option>
              {Array.from({ length: new Date().getFullYear() - 1989 }, (_, i) => 1990 + i)
                .map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
          <div>
            <label>Day</label>
            <select name="incidentDay" onChange={handleChange}>
              <option value="">Select</option>
              {daysInMonth.map(day => <option key={day} value={day}>{day}</option>)}
            </select>
          </div>
        </div>
      )}
      
      {/* Nature of Incident */}
      <label>Nature of Incident<span className="required">*</span></label>
      <select name="natureOfIncident" onChange={handleChange}>
        <option value="">Select</option>
        <option value="Femicide">Femicide (victim is dead)</option>
        <option value="Attempted Femicide">Attempted Femicide (victim survived)</option>
      </select>
      {errors.natureOfIncident && <p className="error">{errors.natureOfIncident}</p>}

      {/* Upload Evidence */}
      <label>Upload Evidence</label>
      <input type="file" name="evidence" onChange={handleChange} className="file-upload" />
      <p className="file-info">Allowed file types: PNG, JPG, JPEG, DOC, PDF, MP3, MP4</p>

      {/* Describe Incident */}
      <label>Describe Incident<span className="required">*</span></label>
      <textarea name="incidentDescription" onChange={handleChange}></textarea>
      {errors.incidentDescription && <p className="error">{errors.incidentDescription}</p>}

      {/* Submit Button */}
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default ReportForm;

