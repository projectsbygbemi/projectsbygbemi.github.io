import React, { useState } from "react";
import "./global.css";

const Home = () => {
  const [showDateFields, setShowDateFields] = useState(false);
  const [showVictimName, setShowVictimName] = useState(false);
  const [showPerpetratorName, setShowPerpetratorName] = useState(false);
  const [showReporterDetails, setShowReporterDetails] = useState(false);

  return (
    <div className="form-container">
      <h1>Report</h1>
      <p>Tell us everything you know about any femicide case.</p>

      <form>
        {/* Incident Date */}
        <label>Do you know the date of the incident?</label>
        <input type="radio" name="dateKnown" onChange={() => setShowDateFields(true)} /> Yes
        <input type="radio" name="dateKnown" onChange={() => setShowDateFields(false)} /> No

        {showDateFields && (
          <div className="date-fields">
            <label>Day</label>
            <input type="number" min="1" max="31" />
            <label>Month</label>
            <input type="number" min="1" max="12" />
            <label>Year</label>
            <input type="number" min="1900" max="2025" />
          </div>
        )}

        {/* Nature of Incident */}
        <label>Nature of Incident</label>
        <input type="checkbox" /> Femicide (victim was killed)
        <input type="checkbox" /> Attempted femicide (victim survived)
        <input type="checkbox" /> Other sexual & gender-based violence (SGBV)

        {/* Victim Name */}
        <label>Do you know the victim’s name?</label>
        <input type="radio" name="victimNameKnown" onChange={() => setShowVictimName(true)} /> Yes
        <input type="radio" name="victimNameKnown" onChange={() => setShowVictimName(false)} /> No
        {showVictimName && <input type="text" placeholder="Victim's name" />}

        {/* Perpetrator Name */}
        <label>Do you know the perpetrator’s name?</label>
        <input type="radio" name="perpNameKnown" onChange={() => setShowPerpetratorName(true)} /> Yes
        <input type="radio" name="perpNameKnown" onChange={() => setShowPerpetratorName(false)} /> No
        {showPerpetratorName && <input type="text" placeholder="Perpetrator's name" />}

        {/* Upload Evidence */}
        <label>Upload Evidence</label>
        <input type="file" />

        {/* Description */}
        <label>Description of the Incident</label>
        <textarea placeholder="Describe what happened..." required></textarea>

        {/* Reporter Information */}
        <label>Can we follow up with you?</label>
        <input type="radio" name="followUp" onChange={() => setShowReporterDetails(true)} /> Yes
        <input type="radio" name="followUp" onChange={() => setShowReporterDetails(false)} /> No

        {showReporterDetails && (
          <div>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <input type="tel" placeholder="Your Phone Number" />
          </div>
        )}

        {/* Submit Button */}
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default Home;
