import React, { useEffect, useState } from "react";
import "./donor.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const FindDonor = () => {
  const [donors, setDonors] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "donors"), (snapshot) => {
      const donorList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDonors(donorList);
    });

    return () => unsubscribe();
  }, []);

  const cities = [...new Set(donors.map((donor) => donor.city))];

  const handleReset = () => {
    setSearchName("");
    setSelectedBloodGroup("");
    setSelectedCity("");
    setOnlyAvailable(false);
  };

  const filteredDonors = donors.filter((donor) => {
    if (
      searchName &&
      !donor.name.toLowerCase().includes(searchName.toLowerCase())
    )
      return false;

    if (
      selectedBloodGroup &&
      donor.bloodGroup !== selectedBloodGroup
    )
      return false;

    if (selectedCity && donor.city !== selectedCity) return false;

    if (onlyAvailable && !donor.isAvailable) return false;

    return true;
  });

  return (
    <section className="find-donor">
      <div className="find-donor__container">

        {/* Page Header */}
        <div className="find-donor__header">
          <h1 className="find-donor__title">Find a Donor</h1>
          <p className="find-donor__subtitle">
            Search verified blood donors near you by blood group, city, or availability.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="find-donor__filters">
          <div className="find-donor__search-box">
            <i className="fas fa-search find-donor__search-icon"></i>
            <input
              type="text"
              className="find-donor__search-input"
              placeholder="Search donor by name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          <select
            className="find-donor__select"
            value={selectedBloodGroup}
            onChange={(e) => setSelectedBloodGroup(e.target.value)}
          >
            <option value="">All Blood Groups</option>
            {BLOOD_GROUPS.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>

          <select
            className="find-donor__select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <label className="find-donor__checkbox-label">
            <input
              type="checkbox"
              className="find-donor__checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
            />
            Available Only
          </label>

          <button className="find-donor__reset-btn" onClick={handleReset}>
            <i className="fas fa-rotate-right"></i> Reset
          </button>
        </div>

        {/* Result Count */}
        <div className="find-donor__result-count">
          {filteredDonors.length} donor{filteredDonors.length !== 1 ? 's' : ''} found
        </div>

        {/* Donor Cards Grid */}
        {filteredDonors.length > 0 ? (
          <div className="find-donor__grid">
            {filteredDonors.map((donor) => (
              <div className="donor-card" key={donor.id}>
                <div className="donor-card__top">
                  <div className="donor-card__blood-badge">{donor.bloodGroup}</div>
                  <span
                    className={`donor-card__status ${donor.isAvailable ? 'donor-card__status--available' : 'donor-card__status--unavailable'
                      }`}
                  >
                    {donor.isAvailable ? 'Available' : 'Not Available'}
                  </span>
                </div>

                <h3 className="donor-card__name">{donor.name}</h3>

                <div className="donor-card__info">
                  <p className="donor-card__info-item">
                    <i className="fas fa-map-marker-alt"></i> {donor.city}
                  </p>
                  <p className="donor-card__info-item">
                    <i className="fas fa-phone"></i> {donor.phone}
                  </p>
                  <p className="donor-card__info-item">
                    <i className="fas fa-calendar-days"></i> Last donated: {donor.lastDonated}
                  </p>
                </div>

                <button
                  className="donor-card__contact-btn"
                  onClick={() => alert(`Blood request sent to ${donor.name}`)}
                >
                  <i className="fas fa-hand-holding-heart"></i> Request Blood
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="find-donor__empty">
            <i className="fas fa-droplet-slash find-donor__empty-icon"></i>
            <p>No donors match your search. Try adjusting the filters.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FindDonor;