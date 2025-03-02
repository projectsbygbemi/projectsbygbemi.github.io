import React, { useState, useEffect } from "react";
import "../global.css";
import uploadIcon from "../assets/upload.svg";

const statesOfNigeria = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
  "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
  "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const ReportForm = () => {
  const [formData, setFormData] = useState({
    dateKnown: null,
    selectedMonth: "",
    selectedYear: "",
    selectedDay: "",
    incidentType: "",
    victimKnown: null,
    victimName: "",
    perpetratorKnown: null,
    perpetratorName: "",
    locationKnown: null,
    state: "",
    additionalInfo: "",
    evidence: null,
    describeIncident: "",
    followUp: null,
    userName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    if (formData.selectedMonth && formData.selectedYear) {
      const days = new Date(formData.selectedYear, formData.selectedMonth, 0).getDate();
      setDaysInMonth([...Array(days).keys()].map((d) => d + 1));
    }
  }, [formData.selectedMonth, formData.selectedYear]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    const allowedTypes = ["image/png", "image/jpeg", "image/webp", "audio/mpeg", "video/mp4", "application/pdf", "application/msword"];
    let totalSize = 0;

    for (let file of files) {
      totalSize += file.size;
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, evidence: "Invalid file type selected." });
        return;
      }
    }

    if (totalSize > 100 * 1024 * 1024) {
      setErrors({ ...errors, evidence: "Total file size cannot exceed 100MB." });
      return;
    }

    setFormData({ ...formData, evidence: files });
    setErrors({ ...errors, evidence: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.incidentType) newErrors.incidentType = "Required";
    if (formData.victimKnown && !formData.victimName.match(/^[a-zA-Z\s]+$/)) newErrors.victimName = "Only letters allowed";
    if (formData.perpetratorKnown && !formData.perpetratorName.match(/^[a-zA-Z\s]+$/)) newErrors.perpetratorName = "Only letters allowed";
    if (formData.followUp && !formData.userName.match(/^[a-zA-Z\s]+$/)) newErrors.userName = "Only letters allowed";
    if (formData.followUp && !formData.phone.match(/^\d{11}$/)) newErrors.phone = "Must be 11 digits";
    if (formData.followUp && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email format";
    if (!formData.describeIncident) newErrors.describeIncident = "Required";

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
      <p>Tell us everything you know about the femicide case.</p>

      <form onSubmit={handleSubmit}>
  <div className="form-group">
  <label>Do you know the date of the incident?<span className="required">*</span></label>
  <div className="inline-options">
    <label>
      <input type="radio" name="dateKnown" value="yes" onChange={() => setDateKnown(true)} /> Yes
    </label>
    <label>
      <input type="radio" name="dateKnown" value="no" onChange={() => setDateKnown(false)} /> No
    </label>
  </div>
  {errors.dateKnown && <p className="error">{errors.dateKnown}</p>}
</div>

{dateKnown && (
  <div className="form-group date-fields">
    <div>
      <label>Month<span className="required">*</span></label>
      <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
        <option value="">Select Month</option>
        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
          .map((month, index) => <option key={index} value={index + 1}>{month}</option>)}
      </select>
      {errors.selectedMonth && <p className="error">{errors.selectedMonth}</p>}
    </div>

    <div>
      <label>Year<span className="required">*</span></label>
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="">Select Year</option>
        {Array.from({ length: new Date().getFullYear() - 1989 }, (_, i) => 1990 + i)
          .map((year) => <option key={year} value={year}>{year}</option>)}
      </select>
      {errors.selectedYear && <p className="error">{errors.selectedYear}</p>}
    </div>

    <div>
      <label>Day<span className="required">*</span></label>
      <select 
        value={selectedDay} 
        disabled={!selectedMonth || !selectedYear} 
        onChange={(e) => setSelectedDay(e.target.value)}
      >
        <option value="">Select Day</option>
        {daysInMonth.map((day) => <option key={day} value={day}>{day}</option>)}
      </select>
      {errors.selectedDay && <p className="error">{errors.selectedDay}</p>}
    </div>
  </div>
)}
      
        <div className="form-group">
          <label>Nature of Incident<span className="required">*</span></label>
          <select name="incidentType" onChange={handleChange}>
            <option value="">Select Incident</option>
            <option value="femicide">Femicide (victim is dead)</option>
            <option value="attempted-femicide">Attempted Femicide (victim survived)</option>
          </select>
          {errors.incidentType && <p className="error">{errors.incidentType}</p>}
        </div>

<div className="form-group">
  <label>Do you know the victim's name?<span className="required">*</span></label>
  <div className="inline-options">
    <label>
      <input type="radio" name="victimKnown" value="yes" onChange={() => setVictimKnown(true)} /> Yes
    </label>
    <label>
      <input type="radio" name="victimKnown" value="no" onChange={() => setVictimKnown(false)} /> No
    </label>
  </div>
  {victimKnown && (
    <>
      <input
        type="text"
        name="victimName"
        placeholder="Enter victim's name"
        value={formData.victimName}
        onChange={handleChange}
      />
      {errors.victimName && <p className="error">{errors.victimName}</p>}
    </>
  )}
</div>

<div className="form-group">
  <label>Do you know the perpetrator's name?<span className="required">*</span></label>
  <div className="inline-options">
    <label>
      <input type="radio" name="perpetratorKnown" value="yes" onChange={() => setPerpetratorKnown(true)} /> Yes
    </label>
    <label>
      <input type="radio" name="perpetratorKnown" value="no" onChange={() => setPerpetratorKnown(false)} /> No
    </label>
  </div>
  {perpetratorKnown && (
    <>
      <input
        type="text"
        name="perpetratorName"
        placeholder="Enter perpetrator's name"
        value={formData.perpetratorName}
        onChange={handleChange}
      />
      {errors.perpetratorName && <p className="error">{errors.perpetratorName}</p>}
    </>
  )}
</div>

<div className="form-group">
  <label>Do you know where it happened?<span className="required">*</span></label>
  <div className="inline-options">
    <label>
      <input 
        type="radio" 
        name="locationKnown" 
        value="yes" 
        onChange={() => setLocationKnown(true)} 
      /> 
      Yes
    </label>
    <label>
      <input 
        type="radio" 
        name="locationKnown" 
        value="no" 
        onChange={() => setLocationKnown(false)} 
      /> 
      No
    </label>
  </div>
  {errors.locationKnown && <p className="error">{errors.locationKnown}</p>}
</div>

{locationKnown && (
  <div className="form-group location-fields">
    <div>
      <label>State<span className="required">*</span></label>
      <select name="state" value={formData.state} onChange={handleChange}>
        <option value="">Select State</option>
        {statesOfNigeria.map((state, index) => (
          <option key={index} value={state}>{state}</option>
        ))}
      </select>
      {errors.state && <p className="error">{errors.state}</p>}
    </div>

    <div>
      <label>Additional Information</label>
      <textarea 
        name="additionalInfo" 
        placeholder="Enter City/LGA/Address" 
        value={formData.additionalInfo} 
        onChange={handleChange}
      />
    </div>
  </div>
)}

        <div className="form-group">
          <label>Describe the Incident<span className="required">*</span></label>
          <textarea name="describeIncident" onChange={handleChange}></textarea>
          {errors.describeIncident && <p className="error">{errors.describeIncident}</p>}
        </div>

        <div className="form-group">
          <label>Do you have evidence?<span className="required">*</span></label>
          <div className="inline-options">
            <label><input type="radio" name="evidence" value="yes" onChange={() => setFormData({ ...formData, evidence: true })} /> Yes</label>
            <label><input type="radio" name="evidence" value="no" onChange={() => setFormData({ ...formData, evidence: null })} /> No</label>
          </div>
          {formData.evidence && (
            <>
              <label className="file-upload">
                <img src={uploadIcon} alt="Upload" className="upload-icon" />
                <span>Upload Evidence</span>
                <input type="file" accept=".png, .jpg, .jpeg, .webp, .mp3, .mp4, .doc, .pdf" multiple onChange={handleFileUpload} />
              </label>
              <p className="file-info">Allowed file types: PNG, JPG, JPEG, WEBP, MP3, MP4, DOC, PDF. Max: 100MB</p>
              {errors.evidence && <p className="error">{errors.evidence}</p>}
            </>
          )}
        </div>

        <div className="form-group">
          <label>Can we follow up with you?<span className="required">*</span></label>
          <div className="inline-options">
            <label><input type="radio" name="followUp" value="yes" onChange={() => setFormData({ ...formData, followUp: true })} /> Yes</label>
            <label><input type="radio" name="followUp" value="no" onChange={() => setFormData({ ...formData, followUp: null })} /> No</label>
          </div>
          {formData.followUp && (
            <>
              <input type="text" name="userName" placeholder="Your Name" onChange={handleChange} />
              {errors.userName && <p className="error">{errors.userName}</p>}
              <div className="form-group contact-fields">
                <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email Address" onChange={handleChange} />
              </div>
              {errors.phone && <p className="error">{errors.phone}</p>}
              {errors.email && <p className="error">{errors.email}</p>}
            </>
          )}
        </div>

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportForm;

