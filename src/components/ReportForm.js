import React, { useState, useEffect } from "react";
import "../global.css";

const statesOfNigeria = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
  "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
  "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const ReportForm = () => {
  const [dateKnown, setDateKnown] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [victimKnown, setVictimKnown] = useState(null);
  const [perpetratorKnown, setPerpetratorKnown] = useState(null);
  const [locationKnown, setLocationKnown] = useState(null);
  const [followUp, setFollowUp] = useState(null);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const days = new Date(selectedYear, selectedMonth, 0).getDate();
      setDaysInMonth([...Array(days).keys()].map((d) => d + 1));
    }
  }, [selectedMonth, selectedYear]);

  return (
    <div className="form-container">
      <h1>Report</h1>
      <p>Tell us everything you know about the femicide case.</p>

      <form>
        {/* Date of Incident */}
        <div className="form-group">
          <label>Do you know the date of the incident?<span className="required">*</span></label>
          <div className="inline-options">
            <label><input type="radio" name="dateKnown" onChange={() => setDateKnown(true)} /> Yes</label>
            <label><input type="radio" name="dateKnown" onChange={() => setDateKnown(false)} /> No</label>
          </div>
        </div>

        {dateKnown && (
          <div className="form-group date-fields">
            <div>
              <label>Month<span className="required">*</span></label>
              <select onChange={(e) => setSelectedMonth(e.target.value)}>
                <option value="">Select Month</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                  .map((month, index) => <option key={index} value={index + 1}>{month}</option>)}
              </select>
            </div>
            <div>
              <label>Year<span className="required">*</span></label>
              <select onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="">Select Year</option>
                {Array.from({ length: new Date().getFullYear() - 1989 }, (_, i) => 1990 + i)
                  .map((year) => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>
            <div>
              <label>Day<span className="required">*</span></label>
              <select disabled={!selectedMonth || !selectedYear} onChange={(e) => setSelectedDay(e.target.value)}>
                <option value="">Select Day</option>
                {daysInMonth.map((day) => <option key={day} value={day}>{day}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Nature of Incident */}
        <div className="form-group">
          <label>Nature of Incident<span className="required">*</span></label>
          <select onChange={(e) => setIncidentType(e.target.value)}>
            <option value="">Select Incident</option>
            <option value="femicide">Femicide (victim is dead)</option>
            <option value="attempted-femicide">Attempted Femicide (victim survived)</option>
          </select>
        </div>

        {/* Victim's Name */}
        <div className="form-group">
          <label>Do you know the victim's name?<span className="required">*</span></label>
          <div className="inline-options">
            <label><input type="radio" name="victimKnown" onChange={() => setVictimKnown(true)} /> Yes</label>
            <label><input type="radio" name="victimKnown" onChange={() => setVictimKnown(false)} /> No</label>
          </div>
          {victimKnown && <input type="text" placeholder="Enter victim's name" />}
        </div>

        {/* Perpetrator's Name */}
        <div className="form-group">
          <label>Do you know the perpetrator's name?<span className="required">*</span></label>
          <div className="inline-options">
            <label><input type="radio" name="perpetratorKnown" onChange={() => setPerpetratorKnown(true)} /> Yes</label>
            <label><input type="radio" name="perpetratorKnown" onChange={() => setPerpetratorKnown(false)} /> No</label>
          </div>
          {perpetratorKnown && <input type="text" placeholder="Enter perpetrator's name" />}
        </div>

        {/* Location */}
        <div className="form-group">
          <label>Do you know where it happened?<span className="required">*</span></label>
          <div className="inline-options">
            <label><input type="radio" name="locationKnown" onChange={() => setLocationKnown(true)} /> Yes</label>
            <label><input type="radio" name="locationKnown" onChange={() => setLocationKnown(false)} /> No</label>
          </div>
          {locationKnown && (
            <div className="form-group location-fields">
              <div>
                <label>State<span className="required">*</span></label>
                <select>
                  <option value="">Select State</option>
                  {statesOfNigeria.map((state, index) => <option key={index} value={state}>{state}</option>)}
                </select>
              </div>
              <div>
                <label>Additional Information</label>
                <textarea placeholder="Enter City/LGA/Address"></textarea>
              </div>
            </div>
          )}
        </div>

        {/* Describe Incident */}
        <div className="form-group">
          <label>Describe the Incident<span className="required">*</span></label>
          <textarea placeholder="Enter details"></textarea>
        </div>

        {/* Follow Up */}
        <div className="form-group">
          <label>Can we follow up with you?<span className="required">*</span></label>
          <div className="inline-options">
            <label><input type="radio" name="followUp" onChange={() => setFollowUp(true)} /> Yes</label>
            <label><input type="radio" name="followUp" onChange={() => setFollowUp(false)} /> No</label>
          </div>
          {followUp && (
            <>
              <input type="text" placeholder="Your Name" />
              <div className="form-group contact-fields">
                <input type="text" placeholder="Phone Number" />
                <input type="email" placeholder="Email Address" />
              </div>
            </>
          )}
        </div>

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportForm;

