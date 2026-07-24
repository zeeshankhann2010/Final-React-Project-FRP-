import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import "./protectedroute.css";

function ProtectedRoute({ children }) {
    // null = abhi pata nahi, true/false = confirm ho gaya
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Firebase se auth status sunte hain
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setIsLoading(false); // data aa gaya, loading band
        });

        // cleanup - component hatte waqt listener band karo
        return () => unsubscribe();
    }, []);

    // Jab tak Firebase reply nahi deta, loader dikhao
    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
                <p>Loading...</p>
            </div>
        );
    }

    // Login nahi hai to home bhej do
    if (!isLoggedIn) {
        alert("Please login or create an account to access this page.");
        return <Navigate to="/home" replace />;
    }

    // Login hai to page dikhao
    return children;
}

export default ProtectedRoute;