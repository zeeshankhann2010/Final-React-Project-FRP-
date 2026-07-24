import { useEffect, useState } from "react";
import "./admin.css";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../services/firebase";

// Blood group distribution
const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

export default function AdminDashboard() {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchDonors();
    fetchRequests();
  }, []);

  const fetchDonors = async () => {
    try {
      const snapshot = await getDocs(collection(db, "donors"));

      const donorList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDonors(donorList);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const snapshot = await getDocs(collection(db, "requests"));

      const requestList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRequests(requestList);
    } catch (error) {
      console.log(error);
    }
  };

  const totalDonors = donors.length;
  const totalRequests = requests.length;
  const activeRequests = requests.filter(
    (r) => !r.isFulfilled
  ).length;

  const distribution = bloodGroups.map((group) => {
    const count = donors.filter(
      (d) => d.bloodGroup === group
    ).length;

    const percent = totalDonors
      ? Math.round((count / totalDonors) * 100)
      : 0;

    return {
      group,
      count,
      percent,
    };
  });

  const handleDeleteDonor = async (id) => {
    try {
      await deleteDoc(doc(db, "donors", id));

      setDonors((prev) =>
        prev.filter((d) => d.id !== id)
      );

      alert("Donor deleted successfully.");
    } catch (error) {
      console.log(error);
      alert("Failed to delete donor.");
    }
  };
  return (
    <section className="admin">
      <div className="admin__container">
        {/* ===== Header ===== */}
        <div className="admin__header">
          <div>
            <span className="admin__eyebrow">
              <i className="fas fa-shield-halved"></i> Admin Only
            </span>
            <h1 className="admin__title">Management Dashboard</h1>
            <p className="admin__subtitle">
              Oversee donor records and urgent blood requests across the platform.
            </p>
          </div>
        </div>

        {/* ===== Summary Stats ===== */}
        <div className="admin__stats">
          <div className="admin__stat-card">
            <div className="admin__stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div>
              <p className="admin__stat-count">{totalDonors}</p>
              <p className="admin__stat-label">Total Donors</p>
            </div>
          </div>

          <div className="admin__stat-card">
            <div className="admin__stat-icon">
              <i className="fas fa-triangle-exclamation"></i>
            </div>
            <div>
              <p className="admin__stat-count">{totalRequests}</p>
              <p className="admin__stat-label">Total Requests</p>
            </div>
          </div>

          <div className="admin__stat-card">
            <div className="admin__stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div>
              <p className="admin__stat-count">{activeRequests}</p>
              <p className="admin__stat-label">Active Requests</p>
            </div>
          </div>
        </div>

        {/* ===== Blood Group Distribution ===== */}
        <div className="admin__panel">
          <h2 className="admin__panel-title">Blood Group Distribution</h2>
          <div className="admin__distribution">
            {distribution.map((item) => (
              <div className="admin__drop-item" key={item.group}>
                <div className="admin__drop">
                  <i
                    className="fas fa-droplet admin__drop-bg"
                    aria-hidden="true"
                  ></i>
                  <i
                    className="fas fa-droplet admin__drop-fill"
                    style={{ clipPath: `inset(${100 - item.percent}% 0 0 0)` }}
                    aria-hidden="true"
                  ></i>
                </div>
                <span className="admin__drop-group">{item.group}</span>
                <span className="admin__drop-percent">{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Donors Table ===== */}
        <div className="admin__panel">
          <h2 className="admin__panel-title">Registered Donors</h2>
          <div className="admin__table-wrap">
            <table className="admin__table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>City</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor) => (
                  <tr key={donor.id}>
                    <td>{donor.name}</td>
                    <td className="admin__group">{donor.bloodGroup}</td>
                    <td>{donor.city}</td>
                    <td>{donor.phone}</td>
                    <td>
                      <span
                        className={`admin__badge ${donor.isAvailable
                          ? "admin__badge--available"
                          : "admin__badge--unavailable"
                          }`}
                      >
                        {donor.isAvailable ? "Available" : "Unavailable"}
                      </span>
                      {donor.flagged && (
                        <span className="admin__badge admin__badge--flagged">
                          Flagged
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        className="admin__delete-btn"
                        onClick={() => handleDeleteDonor(donor.id)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {donors.length === 0 && (
                  <tr>
                    <td colSpan="6" className="admin__empty">
                      No donor records remaining.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== Requests Table ===== */}
        <div className="admin__panel">
          <h2 className="admin__panel-title">Urgent Blood Requests</h2>
          <div className="admin__table-wrap">
            <table className="admin__table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Blood Group</th>
                  <th>City</th>
                  <th>Hospital</th>
                  <th>Contact</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.patientName}</td>
                    <td className="admin__group">{req.bloodGroup}</td>
                    <td>{req.city}</td>
                    <td>{req.hospital}</td>
                    <td>{req.contact}</td>
                    <td>
                      <span
                        className={`admin__badge ${req.isFulfilled
                          ? "admin__badge--fulfilled"
                          : "admin__badge--active"
                          }`}
                      >
                        {req.isFulfilled ? "Fulfilled" : "Active"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}