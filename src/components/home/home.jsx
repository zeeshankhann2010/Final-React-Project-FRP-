import React, { useEffect, useState } from "react";
import "./home.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";

const compatibilityData = [
    { group: "O-", donateTo: "All", receiveFrom: "O-" },
    { group: "O+", donateTo: "O+, A+, B+, AB+", receiveFrom: "O+, O-" },
    { group: "A+", donateTo: "A+, AB+", receiveFrom: "A+, A-, O+, O-" },
    { group: "A-", donateTo: "A+, A-, AB+, AB-", receiveFrom: "A-, O-" },
    { group: "B+", donateTo: "B+, AB+", receiveFrom: "B+, B-, O+, O-" },
    { group: "B-", donateTo: "B+, B-, AB+, AB-", receiveFrom: "B-, O-" },
    { group: "AB+", donateTo: "AB+", receiveFrom: "All" },
    { group: "AB-", donateTo: "AB+, AB-", receiveFrom: "A-, B-, AB-, O-" },
];

const whyDonateData = [
    {
        id: 1,
        icon: "fa-solid fa-heart",
        title: "Save Lives",
        description: "Your donation can save up to three precious lives.",
    },
    {
        id: 2,
        icon: "fa-solid fa-shield-heart",
        title: "Good For Health",
        description: "Regular donation keeps your heart healthy.",
    },
    {
        id: 3,
        icon: "fa-solid fa-people-group",
        title: "Help Community",
        description: "Be a part of a noble cause and help your community.",
    },
];

function Hero() {
    const [totalDonors, setTotalDonors] = useState(0);
    const [totalRequests, setTotalRequests] = useState(0);

    useEffect(() => {
        const unsubscribeDonors = onSnapshot(
            collection(db, "donors"),
            (snapshot) => {
                setTotalDonors(snapshot.size);
            }
        );
        const unsubscribeRequests = onSnapshot(
            collection(db, "requests"),
            (snapshot) => {
                setTotalRequests(snapshot.size);
            }
        );
        return () => {
            unsubscribeDonors();
            unsubscribeRequests();
        };
    }, []);

    const STATS = [
        {
            icon: "fa-solid fa-user-group",
            value: totalDonors,
            label: "Registered Donors",
        },
        {
            icon: "fa-solid fa-droplet",
            value: totalRequests,
            label: "Blood Requests",
        },
        {
            icon: "fa-solid fa-hospital",
            value: "45+",
            label: "Partner Hospitals",
        },
        {
            icon: "fa-solid fa-heart",
            value: totalDonors,
            label: "Lives Saved",
        },
    ];

    return (
        <>
            <div>
                <section className="hero">
                    <div className="hero-left">
                        <h1>
                            Donate Blood,
                            <br />
                            Save Lives.
                        </h1>

                        <p>
                            Join our blood donor community and help patients find blood
                            quickly in emergencies.
                        </p>

                        <div className="hero-buttons">
                            <a href="/donate#donate-form" className="donate-blood__hero-btn">
                                <i className="fa-solid fa-user-plus"></i> Becoma a donor
                            </a>
                            <a href="/donor">
                                <button className="secondary-btn">Find Donors</button>
                            </a>
                        </div>
                    </div>

                    <div className="hero-right">
                        <img src="right-side.png" alt="Blood Donation" />
                    </div>
                </section>

                <section className="stats">
                    <div className="stats__container">
                        {STATS.map((item) => (
                            <div className="stats__card" key={item.label}>
                                <div className="stats__icon-wrapper">
                                    <i className={`${item.icon} stats__icon`}></i>
                                </div>

                                <div className="stats__info">
                                    <h3 className="stats__count">{item.value}</h3>
                                    <p className="stats__label">{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <section className="blood-compatibility">
                <div className="blood-compatibility__container">
                    <div className="blood-compatibility__table-wrap">
                        <h2 className="blood-compatibility__title">Blood Compatibility</h2>

                        <div className="blood-compatibility__table-card">
                            <table className="blood-compatibility__table">
                                <thead>
                                    <tr>
                                        <th>Blood Group</th>
                                        <th>Donate To</th>
                                        <th>Receive From</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {compatibilityData.map((row) => (
                                        <tr key={row.group}>
                                            <td className="blood-compatibility__group">{row.group}</td>
                                            <td>{row.donateTo}</td>
                                            <td>{row.receiveFrom}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="blood-compatibility__side">
                        <div className="blood-compatibility__info-card blood-compatibility__info-card--donor">
                            <div className="blood-compatibility__info-icon blood-compatibility__info-icon--donor">
                                <i className="fa-solid fa-droplet"></i>
                            </div>
                            <div className="blood-compatibility__info-content">
                                <p className="blood-compatibility__info-label">Universal Donor</p>
                                <p className="blood-compatibility__info-value">O-</p>
                                <p className="blood-compatibility__info-desc">Can donate to all blood groups.</p>
                            </div>
                        </div>

                        <div className="blood-compatibility__info-card blood-compatibility__info-card--recipient">
                            <div className="blood-compatibility__info-icon blood-compatibility__info-icon--recipient">
                                <i className="fa-solid fa-droplet"></i>
                            </div>
                            <div className="blood-compatibility__info-content">
                                <p className="blood-compatibility__info-label">Universal Recipient</p>
                                <p className="blood-compatibility__info-value">AB+</p>
                                <p className="blood-compatibility__info-desc">Can receive from all blood groups.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="why-donate">
                <div className="why-donate__header">
                    <h2 className="why-donate__title">Why Donate Blood?</h2>
                    <span className="why-donate__underline"></span>
                </div>

                <div className="why-donate__grid">
                    {whyDonateData.map((item) => (
                        <div className="why-donate__card" key={item.id}>
                            <div className="why-donate__icon-wrapper">
                                <i className={`${item.icon} why-donate__icon`}></i>
                            </div>
                            <div className="why-donate__content">
                                <h3 className="why-donate__card-title">{item.title}</h3>
                                <p className="why-donate__card-text">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Hero;