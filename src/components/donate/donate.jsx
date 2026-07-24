import React, { useState } from 'react';
import './donate.css';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../services/firebase";

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const WHY_POINTS = [
    { icon: 'fa-heart-pulse', title: 'Save Up to 3 Lives', desc: 'A single donation can be split into red cells, plasma, and platelets to help multiple patients.' },
    { icon: 'fa-stethoscope', title: 'Free Health Check', desc: 'Every donation includes a quick screening of your blood pressure, pulse, and hemoglobin level.' },
    { icon: 'fa-users', title: 'Community Impact', desc: 'You directly support hospitals and patients in your city facing urgent blood shortages.' },
];

const HOW_STEPS = [
    { icon: 'fa-file-pen', title: 'Register', desc: 'Fill out the donor form with your basic and medical details.' },
    { icon: 'fa-clipboard-check', title: 'Get Screened', desc: 'A quick eligibility and health check is done before donation.' },
    { icon: 'fa-droplet', title: 'Donate', desc: 'The actual donation takes only about 10-15 minutes.' },
    { icon: 'fa-mug-hot', title: 'Rest & Recover', desc: 'Relax with a snack and drink before heading out.' },
];

const ELIGIBILITY_POINTS = [
    'Age between 18-60 years',
    'Weight above 50 kg',
    'No donation in last 3 months',
    'Generally healthy, no fever',
];

const DonateBlood = () => {
    // Separate state per field
    const [fullName, setFullName] = useState('');
    const [cnic, setCnic] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [city, setCity] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [lastDonationDate, setLastDonationDate] = useState('');
    const [medicalNotes, setMedicalNotes] = useState('');

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!cnic.trim()) {
            newErrors.cnic = 'CNIC is required';
        } else if (!/^\d{13}$/.test(cnic.replace(/-/g, ''))) {
            newErrors.cnic = 'CNIC must be 13 digits';
        }
        if (!bloodGroup) newErrors.bloodGroup = 'Please select a blood group';
        if (!city.trim()) newErrors.city = 'City is required';
        if (!contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const user = auth.currentUser;

            if (!user) {
                alert("Please login first.");
                return;
            }

            await addDoc(collection(db, "donors"), {
                userId: user.uid,

                name: fullName,
                cnic: cnic,
                bloodGroup: bloodGroup,
                city: city,
                phone: contactNumber,

                lastDonated: lastDonationDate,
                medicalNotes: medicalNotes,

                isAvailable: true,
                flagged: false,

                createdAt: serverTimestamp(),
            });

            alert("Donor registered successfully!");

            setSubmitted(true);

            // Clear form
            setFullName("");
            setCnic("");
            setBloodGroup("");
            setCity("");
            setContactNumber("");
            setLastDonationDate("");
            setMedicalNotes("");
            setErrors({});
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="donate-blood">

            {/* ===== Hero ===== */}
            <section className="donate-blood__hero">
                <div className="donate-blood__hero-inner">
                    <span className="donate-blood__badge">
                        <i className="fa-solid fa-heart"></i> Become a Lifesaver
                    </span>
                    <h1 className="donate-blood__title">
                        Donate Blood, <span className="donate-blood__title-highlight">Save a Life</span>
                    </h1>
                    <p className="donate-blood__subtitle">
                        Register as a donor in a few minutes and become part of a community that helps
                        hospitals and patients find blood faster.
                    </p>
                    <div className="donate-blood__hero-actions">
                        <a href="#donate-form" className="donate-blood__hero-btn">
                            <i className="fa-solid fa-user-plus"></i> Apply to Donate
                        </a>
                        <a href="#how-it-works" className="donate-blood__hero-link">
                            How it works <i className="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== Why Donate ===== */}
            <section className="donate-blood__why">
                <span className="donate-blood__section-tag">Why It Matters</span>
                <h2 className="donate-blood__section-title">Why Your Donation Is Useful</h2>
                <p className="donate-blood__section-subtitle">Every drop you give makes a real difference</p>

                <div className="donate-blood__why-grid">
                    {WHY_POINTS.map((point, index) => (
                        <div className="donate-blood__why-card" key={index}>
                            <div className="donate-blood__why-icon-wrapper">
                                <i className={`fa-solid ${point.icon} donate-blood__why-icon`}></i>
                            </div>
                            <h3 className="donate-blood__why-title">{point.title}</h3>
                            <p className="donate-blood__why-desc">{point.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== How It Works ===== */}
            <section className="donate-blood__how" id="how-it-works">
                <span className="donate-blood__section-tag">Process</span>
                <h2 className="donate-blood__section-title">How It Works</h2>
                <p className="donate-blood__section-subtitle">Four simple steps to becoming a donor</p>

                <div className="donate-blood__how-steps">
                    {HOW_STEPS.map((step, index) => (
                        <div className="donate-blood__how-step" key={index}>
                            <span className="donate-blood__how-number">{String(index + 1).padStart(2, '0')}</span>
                            <div className="donate-blood__how-icon-wrapper">
                                <i className={`fa-solid ${step.icon} donate-blood__how-icon`}></i>
                            </div>
                            <h3 className="donate-blood__how-title">{step.title}</h3>
                            <p className="donate-blood__how-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Eligibility ===== */}
            <section className="donate-blood__eligibility">
                <span className="donate-blood__section-tag">Requirements</span>
                <h2 className="donate-blood__section-title">Are You Eligible?</h2>
                <p className="donate-blood__section-subtitle">Basic requirements before you donate</p>

                <div className="donate-blood__eligibility-grid">
                    {ELIGIBILITY_POINTS.map((point, index) => (
                        <div className="donate-blood__eligibility-card" key={index}>
                            <i className="fa-solid fa-circle-check donate-blood__eligibility-icon"></i>
                            {point}
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Registration Form ===== */}
            <section className="donate-blood__form-section" id="donate-form">
                <span className="donate-blood__section-tag">Registration</span>
                <h2 className="donate-blood__section-title">Register as a Donor</h2>
                <p className="donate-blood__section-subtitle">Fill in your details to join the donor list</p>

                {submitted ? (
                    <div className="donate-blood__success">
                        <i className="fa-solid fa-circle-check donate-blood__success-icon"></i>
                        <h3 className="donate-blood__success-title">Registration Successful!</h3>
                        <p className="donate-blood__success-text">
                            Thank you for signing up. Your donor profile has been saved.
                        </p>
                    </div>
                ) : (
                    <form className="donate-blood__form" onSubmit={handleSubmit}>

                        <div className="donate-blood__form-group">
                            <label className="donate-blood__form-label">Full Name</label>
                            <input
                                type="text"
                                className="donate-blood__form-input"
                                placeholder="e.g. Ahmed"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            {errors.fullName && <span className="donate-blood__form-error">{errors.fullName}</span>}
                        </div>

                        <div className="donate-blood__form-group">
                            <label className="donate-blood__form-label">CNIC</label>
                            <input
                                type="text"
                                className="donate-blood__form-input"
                                placeholder="e.g. 4210112345671"
                                value={cnic}
                                onChange={(e) => setCnic(e.target.value)}
                            />
                            {errors.cnic && <span className="donate-blood__form-error">{errors.cnic}</span>}
                        </div>

                        <div className="donate-blood__form-row">
                            <div className="donate-blood__form-group">
                                <label className="donate-blood__form-label">Blood Group</label>
                                <select
                                    className="donate-blood__form-select"
                                    value={bloodGroup}
                                    onChange={(e) => setBloodGroup(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {BLOOD_GROUPS.map((group) => (
                                        <option key={group} value={group}>{group}</option>
                                    ))}
                                </select>
                                {errors.bloodGroup && <span className="donate-blood__form-error">{errors.bloodGroup}</span>}
                            </div>

                            <div className="donate-blood__form-group">
                                <label className="donate-blood__form-label">City</label>
                                <input
                                    type="text"
                                    className="donate-blood__form-input"
                                    placeholder="e.g. Karachi"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                {errors.city && <span className="donate-blood__form-error">{errors.city}</span>}
                            </div>
                        </div>

                        <div className="donate-blood__form-row">
                            <div className="donate-blood__form-group">
                                <label className="donate-blood__form-label">Contact Number</label>
                                <input
                                    type="text"
                                    className="donate-blood__form-input"
                                    placeholder="e.g. 0300-1234567"
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                />
                                {errors.contactNumber && <span className="donate-blood__form-error">{errors.contactNumber}</span>}
                            </div>

                            <div className="donate-blood__form-group">
                                <label className="donate-blood__form-label">Last Donation Date (optional)</label>
                                <input
                                    type="date"
                                    className="donate-blood__form-input"
                                    value={lastDonationDate}
                                    onChange={(e) => setLastDonationDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="donate-blood__form-group">
                            <label className="donate-blood__form-label">Medical Notes (optional)</label>
                            <textarea
                                className="donate-blood__form-textarea"
                                placeholder="Any relevant medical conditions..."
                                rows="3"
                                value={medicalNotes}
                                onChange={(e) => setMedicalNotes(e.target.value)}
                            ></textarea>
                        </div>

                        <button type="submit" className="donate-blood__form-submit">
                            <i className="fa-solid fa-user-plus"></i> Register as Donor
                        </button>
                    </form>
                )}
            </section>

            {/* ===== Bottom CTA ===== */}
            <section className="donate-blood__cta">
                <h2 className="donate-blood__cta-title">Every Donation Counts</h2>
                <p className="donate-blood__cta-text">Join our growing community of lifesavers today</p>
                <a href="#donate-form" className="donate-blood__cta-btn">
                    <i className="fa-solid fa-heart"></i> Get Started
                </a>
            </section>

        </div>
    );
};

export default DonateBlood;