import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebase";

function AdminRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    if (userData.role === "admin") {
                        setIsAdmin(true);
                    }
                }
            } catch (error) {
                console.log(error);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Jab tak auth + role check complete nahi hota, full-page loader dikhao
    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
                <p>loading...</p>
            </div>
        );
    }

    return isAdmin ? children : <Navigate to="/home" replace />;
}

export default AdminRoute;