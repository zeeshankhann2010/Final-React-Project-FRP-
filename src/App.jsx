import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/navbar/navbar.jsx";
import Home from "./components/home/home.jsx";
import Login from "./components/loginpage/login.jsx";
import Signup from "./components/signup/signup.jsx";
import Footer from "./components/footer/footer.jsx";
import Donate from "./components/donate/donate.jsx";
import Donor from "./components/donor/donor.jsx";
import About from "./components/about/about.jsx";
import AdminRoute from "./components/routes/AdminRoute.jsx";
import Admin from "./components/admin/admin.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

import { auth } from "./services/firebase";


function App() {

  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();

  }, []);


  if (loading) {
    return null;
  }


  const publicPages = [
    "/",
    "/home",
    "/login",
    "/signup"
  ];


  const showLayout =
    publicPages.includes(location.pathname) || user;


  return (
    <>

      {showLayout && <Navbar />}


      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        {/* Protected Pages */}

        <Route
          path="/donate"
          element={
            <ProtectedRoute>
              <Donate />
            </ProtectedRoute>
          }
        />


        <Route
          path="/donor"
          element={
            <ProtectedRoute>
              <Donor />
            </ProtectedRoute>
          }
        />


        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Admin />
              </AdminRoute>
            </ProtectedRoute>
          }
        />


      </Routes>


      {showLayout && <Footer />}

    </>
  );
}


export default App;