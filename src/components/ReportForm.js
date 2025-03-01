import React, { useState } from "react";
import "../global.css";

function ReportForm() {
  const [dateKnown, setDateKnown] = useState(null);
  const [victimKnown, setVictimKnown] = useState(null);
  const [perpetratorKnown, setPerpetratorKnown] = useState(null);
  const [followUp, setFollowUp] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [daysInMonth, setDaysInMonth] = useState([]);
  const currentYear = new Date().getFullYear();

  // Function to get days in a selected month/year
  const updateDays = (month, year) => {
    if (!month || !year) return;
    const days = new Date(year, month, 0).getDate();
    setDaysInMonth([...Array(days).keys()].map((d) => d + 1));
  };

  return (
    <div className="form-container">
      <h1>Report</h1>
      <p>Tell us everything you know about any femicide case</p>

      <form>
        <h2>Incident Report</h2>

        {/* Date of Incident */}
        <label><span className="required">*</span> Do you know the date of the incident?</label>
        <div className="inline-options">
          <input type="radio" name="dateKnown" value="yes" onClick={() => setDateKnown(true)} /> Yes
          <input type="radio" name="dateKnown" value="no" onClick={() => setDateKnown(false)} /> No
        </div>

        {dateKnown && (
          <div className="date-fields">
            <div>
              <label>Day</label>
              <select required>
                {daysInMonth.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Month</label>
              <select required onChange={(e) => {setSelectedMonth(e.target.value); updateDays(e.target.value, selectedYear);}}>
                <option value="">Select</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                  <option key={index} value={index + 1}>{month}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Year</label>
              <select required onChange={(e) => {setSelectedYear(e.target.value); updateDays(selectedMonth, e.target.value);}}>
                <option value="">Select</option>
                {[...Array(currentYear - 1989).keys()].map((i) => (
                  <option key={i} value={currentYear - i}>{currentYear - i}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Nature of Incident */}
        <label><span className="required">*</span> Nature of Incident</label>
        <select required>
          <option value="">Select</option>
          <option value="femicide">Femicide <em>(victim was killed)</em></option>
          <option value="attempted_femicide">Attempted Femicide <em>(victim survived)</em></option>
          <option value="sgbv">Other Sexual & Gender-Based Violence (SGBV)</option>
        </select>

        {/* Victim Name */}
        <label><span className="required">*</span> Do you know the victim's name?</label>
        <div className="inline-options">
          <input type="radio" name="victimKnown" value="yes" onClick={() => setVictimKnown(true)} /> Yes
          <input type="radio" name="victimKnown" value="no" onClick={() => setVictimKnown(false)} /> No
        </div>

        {victimKnown && <input type="text" placeholder="Victim's Name" required />}

        {/* Perpetrator Name */}
        <label><span className="required">*</span> Do you know the perpetrator's name?</label>
        <div className="inline-options">
          <input type="radio" name="perpetratorKnown" value="yes" onClick={() => setPerpetratorKnown(true)} /> Yes
          <input type="radio" name="perpetratorKnown" value="no" onClick={() => setPerpetratorKnown(false)} /> No
        </div>

        {perpetratorKnown && <input type="text" placeholder="Perpetrator's Name" required />}

        {/* Description */}
        <label><span className="required">*</span> Description of the Incident</label>
        <textarea placeholder="Provide as many details as possible" required></textarea>

        {/* Upload Evidence */}
        <label>Upload Evidence</label>
        <input type="file" />

        {/* Follow-up */}
        <label><span className="required">*</span> Can we follow up with you?</label>
        <div className="inline-options">
          <input type="radio" name="followUp" value="yes" onClick={() => setFollowUp(true)} /> Yes
          <input type="radio" name="followUp" value="no" onClick={() => setFollowUp(false)} /> No
        </div>

        {followUp && (
          <>
            <input type="text" placeholder="Your Name" required />
            <div className="contact-fields">
              <input type="tel" placeholder="Phone Number" required />
              <input type="email" placeholder="Email" required />
            </div>
          </>
        )}

        {/* Submit Button */}
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}

export default ReportForm;

