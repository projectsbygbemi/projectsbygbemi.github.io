import React, { useState } from "react";
import "../global.css";

function ReportForm() {
  const [showDate, setShowDate] = useState(false);
  const [showVictimName, setShowVictimName] = useState(false);
  const [showPerpetratorName, setShowPerpetratorName] = useState(false);
  const [followUp, setFollowUp] = useState(false);

  return (
    <div className="form-container">
      <h1>Report</h1>
      <p>Tell us everything you know about any femicide case</p>

      <form>
        {/* Incident Section */}
        <h2>Incident Report</h2>

        {/* Date of Incident */}
        <label>Do you know the date of the incident?</label>
        <div>
          <input type="radio" name="date" onClick={() => setShowDate(true)} /> Yes
          <input type="radio" name="date" onClick={() => setShowDate(false)} /> No
        </div>

        {showDate && (
          <div className="date-fields">
            <input type="number" placeholder="Day" min="1" max="31" />
            <input type="number" placeholder="Month" min="1" max="12" />
            <input type="number" placeholder="Year" min="1900" max="2099" />
          </div>
        )}

        {/* Nature of Incident */}
        <label>Nature of Incident</label>
        <div>
          <input type="checkbox" /> Femicide (victim was killed)
          <input type="checkbox" /> Attempted femicide (victim survived)
          <input type="checkbox" /> Other sexual & gender-based violence (SGBV)
        </div>

        {/* Victim Name */}
        <label>Do you know the victim's name?</label>
        <div>
          <input type="radio" name="victim" onClick={() => setShowVictimName(true)} /> Yes
          <input type="radio" name="victim" onClick={() => setShowVictimName(false)} /> No
        </div>

        {showVictimName && <input type="text" placeholder="Victim's Name" />}

        {/* Perpetrator Name */}
        <label>Do you know the perpetrator's name?</label>
        <div>
          <input type="radio" name="perpetrator" onClick={() => setShowPerpetratorName(true)} /> Yes
          <input type="radio" name="perpetrator" onClick={() => setShowPerpetratorName(false)} /> No
        </div>

        {showPerpetratorName && <input type="text" placeholder="Perpetrator's Name" />}

        {/* Description */}
        <label>Description of the Incident</label>
        <textarea placeholder="Provide as many details as possible" required></textarea>

        {/* Follow-up */}
        <label>Can we follow up with you?</label>
        <div>
          <input type="radio" name="followUp" onClick={() => setFollowUp(true)} /> Yes
          <input type="radio" name="followUp" onClick={() => setFollowUp(false)} /> No
        </div>

        {followUp && (
          <>
            <input type="text" placeholder="Your Name" />
            <div className="contact-fields">
              <input type="tel" placeholder="Phone Number" />
              <input type="email" placeholder="Email" />
            </div>
          </>
        )}

        {/* Submit */}
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}

export default ReportForm;
