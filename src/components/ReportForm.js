import React, { useState } from "react";
import "./ReportForm.css";

const statesOfNigeria = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
  "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const ReportForm = () => {
  const [dateKnown, setDateKnown] = useState(false);
  const [victimKnown, setVictimKnown] = useState(false);
  const [perpetratorKnown, setPerpetratorKnown] = useState(false);
  const [contactConsent, setContactConsent] = useState(false);

  return (
    <main className="form-container">
      <section className="form-header">
        <h1>Report</h1>
        <p>Tell us everything you know about any femicide case.</p>
      </section>

      <section className="form-box">
        <h2>Incident Report</h2>

        {/* Date of Incident */}
        <div className="form-group">
          <label>Do you know the date of incident?</label>
          <div className="radio-group">
            <input type="radio" name="dateKnown" onChange={() => setDateKnown(true)} required /> Yes
            <input type="radio" name="dateKnown" onChange={() => setDateKnown(false)} required /> No
          </div>
        </div>

        {dateKnown && (
          <div className="date-fields">
            <label>Day</label>
            <select>
              {[...Array(31)].map((_, i) => <option key={i + 1}>{i + 1}</option>)}
            </select>

            <label>Month</label>
            <select>
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, i) => (
                <option key={i}>{month}</option>
              ))}
            </select>

            <label>Year</label>
            <select>
              {[...Array(50)].map((_, i) => <option key={i}>{2024 - i}</option>)}
            </select>
          </div>
        )}

        {/* Nature of Incident */}
        <div className="form-group">
          <label>Nature of Incident (select all that apply)</label>
          <div className="checkbox-group">
            <label><input type="checkbox" required /> Femicide <em>(victim was killed)</em></label>
            <label><input type="checkbox" required /> Attempted Femicide <em>(victim survived)</em></label>
            <label><input type="checkbox" required /> Other Sexual & Gender-Based Violence (SGBV)</label>
          </div>
        </div>

        {/* Victim Name */}
        <div className="form-group">
          <label>Do you know the name of the victim?</label>
          <div className="radio-group">
            <input type="radio" name="victimKnown" onChange={() => setVictimKnown(true)} required /> Yes
            <input type="radio" name="victimKnown" onChange={() => setVictimKnown(false)} required /> No
          </div>
        </div>

        {victimKnown && <input type="text" placeholder="Enter victim's name" className="text-input" />}

        {/* Perpetrator Name */}
        <div className="form-group">
          <label>Do you know the name of the perpetrator?</label>
          <div className="radio-group">
            <input type="radio" name="perpetratorKnown" onChange={() => setPerpetratorKnown(true)} required /> Yes
            <input type="radio" name="perpetratorKnown" onChange={() => setPerpetratorKnown(false)} required /> No
          </div>
        </div>

        {perpetratorKnown && <input type="text" placeholder="Enter perpetrator's name" className="text-input" />}

        {/* Perpetrator Details */}
        <div className="form-group">
          <label>Details of Perpetrator</label>
          <div className="radio-group">
            <input type="radio" name="perpetratorDetails" required /> Known to the victim
            <input type="radio" name="perpetratorDetails" required /> Unknown to the victim
            <input type="radio" name="perpetratorDetails" required /> I don't know
          </div>
        </div>

        {/* Location */}
        <div className="form-group">
          <label>Where did it happen?</label>
          <div className="location-fields">
            <select required>
              {statesOfNigeria.map((state, i) => <option key={i}>{state}</option>)}
            </select>
            <input type="text" placeholder="Street/Area/Town" required />
          </div>
        </div>

        {/* Upload Evidence */}
        <div className="form-group upload-center">
          <button className="upload-btn">
            <img src="/images/upload.svg" alt="Upload" />
            Upload Evidence
          </button>
          <p>Allowed file types: pictures and documents (max 5MB).</p>
        </div>

        {/* Incident Description */}
        <div className="form-group">
          <label>Description of Incident</label>
          <textarea required></textarea>
        </div>

        {/* Reporter Consent */}
        <div className="form-group">
          <label>Can we follow up with you?</label>
          <div className="radio-group">
            <input type="radio" name="contactConsent" onChange={() => setContactConsent(true)} required /> Yes, I consent
            <input type="radio" name="contactConsent" onChange={() => setContactConsent(false)} required /> No, I prefer to remain anonymous
          </div>
        </div>

        {contactConsent && (
          <div className="contact-fields">
            <input type="text" placeholder="Your Name" />
            <div className="contact-row">
              <input type="tel" placeholder="Phone Number" />
              <input type="email" placeholder="Email Address" />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="submit-center">
          <button type="submit">Submit Report</button>
        </div>
      </section>
    </main>
  );
};

export default ReportForm;
