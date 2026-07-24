import React from 'react';
import './about.css';

// Mission points - easy to edit, just add/remove objects
const MISSION_POINTS = [
  {
    icon: 'fa-users',
    title: 'Donor Registration',
    text: 'A simple way for people to register as blood donors and manage their availability.',
  },
  {
    icon: 'fa-magnifying-glass',
    title: 'Real-Time Search',
    text: 'Find compatible donors instantly by blood group, city, and availability status.',
  },
  {
    icon: 'fa-hospital',
    title: 'Urgent Requests',
    text: 'Patients and hospitals can post urgent blood requests visible to the whole community.',
  },
  {
    icon: 'fa-shield-heart',
    title: 'Trusted & Secure',
    text: 'Sensitive donor information like CNIC is protected and only visible where necessary.',
  },
];

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-us__container">

        {/* Header */}
        <div className="about-us__header">
          <span className="about-us__badge">About Us</span>
          <h1 className="about-us__title">Connecting Donors With Those Who Need Them</h1>
          <p className="about-us__subtitle">
            BloodBan is a centralised, real-time platform built to replace slow, paper-based
            blood donor systems with a modern digital experience.
          </p>
        </div>

        {/* Problem / Background */}
        <div className="about-us__story">
          <div className="about-us__story-text">
            <h2 className="about-us__story-title">Why We Built This</h2>
            <p className="about-us__story-para">
              Access to blood in emergency situations is a critical challenge faced by
              hospitals and patients across Pakistan and beyond. Locating a compatible donor
              in time is often slow, error-prone, and stressful for families.
            </p>
            <p className="about-us__story-para">
              BloodBan digitises the entire process, from donor registration to urgent
              request fulfilment, so that help can be found in minutes, not hours.
            </p>
          </div>
          <div className="about-us__story-stat-box">
            <div className="about-us__stat">
              <h3 className="about-us__stat-number">10,000+</h3>
              <p className="about-us__stat-label">Registered Donors</p>
            </div>
            <div className="about-us__stat">
              <h3 className="about-us__stat-number">150+</h3>
              <p className="about-us__stat-label">Cities Covered</p>
            </div>
            <div className="about-us__stat">
              <h3 className="about-us__stat-number">5,000+</h3>
              <p className="about-us__stat-label">Lives Impacted</p>
            </div>
          </div>
        </div>

        {/* Mission Points */}
        <div className="about-us__mission">
          <h2 className="about-us__mission-title">What We Offer</h2>
          <div className="about-us__mission-grid">
            {MISSION_POINTS.map((point, index) => (
              <div className="mission-card" key={index}>
                <div className="mission-card__icon">
                  <i className={`fas ${point.icon}`}></i>
                </div>
                <h3 className="mission-card__title">{point.title}</h3>
                <p className="mission-card__text">{point.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call To Action */}
        <div className="about-us__cta">
          <h2 className="about-us__cta-title">Ready to Save a Life?</h2>
          <p className="about-us__cta-text">
            Join thousands of donors making emergency blood access faster and easier.
          </p>
          <a href="/donate#donate-form" className="about-us__cta-btn">
            <i className="fas fa-heart-pulse"></i> Become a Donor
          </a>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;