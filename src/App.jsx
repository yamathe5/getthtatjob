import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

import Homepage from "./pages/HomePage.jsx";
import Login from "./pages/LoginPage.jsx";
import SignUp from "./pages/SignUpPage.jsx";
import FindThatJobPage from "./candidate/pages/FindThatJobPage.jsx";
import YourAplicationsPage from "./candidate/pages/YourAplicationsPage.jsx";
import FollowingPage from "./candidate/pages/FollowingPage.jsx";
import ProfilePage from "./candidate/pages/ProfilePage.jsx";

import JobPostingPage from "./company/pages/JobPostingPage.jsx";
import CreateNewJobPage from "./company/pages/CreateNewJobPage.jsx";
import CompanyProfilePage from "./company/pages/ProfilePage.jsx";
import { useAuth } from "./contexts/auth.jsx";

// import { useAuth } from "./contexts/auth.jsx";



function App() {
  const { currentUser, userType } = useAuth();
  function SelectRoute(){
    console.log("xd")
    if(userType == "company"){
      return <Navigate to={"/company/job-posting"} />
    }else if (userType == "professional"){
      return <Navigate to={"/professional/find-that-job"} />
    }else return <Navigate to={"/professional/find-that-job"} />
  }
  return (
    <Routes>

      <Route
        path="/"
        element={
          !currentUser ? (
            <Homepage />
          ) : (
            <SelectRoute/>
            
          )
        }
      />
      <Route
        path="/login"
        element={
          !currentUser ? (
            <Login />
          ) : (
            <SelectRoute/>
          )
        }
      />
      <Route
        path="/signup"
        element={
          !currentUser ? (
            <SignUp />
          ) : (
            <SelectRoute/>
          )
        }
      />

      {/* Rutas protegidas para reclutadores */}

      <Route
        path="/company/*"
        element={
          <ProtectedRoute requiredUserType="company" redirectTo="/login">
            <Routes>
              <Route path="job-posting" element={<JobPostingPage />} />
              <Route path="create-new-job" element={<CreateNewJobPage />} />
              <Route path="profile" element={<CompanyProfilePage />} />
            </Routes>
          </ProtectedRoute>
        }
      ></Route>

      {/* Rutas protegidas para candidatos */}
      <Route
        path="/professional/*"
        element={
          <ProtectedRoute requiredUserType="professional" redirectTo="/login">
            <Routes>
              <Route path="find-that-job" element={<FindThatJobPage />} />
              <Route
                path="your-applications"
                element={<YourAplicationsPage />}
              />
              <Route path="following" element={<FollowingPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Routes>
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

function ProtectedRoute({ children, requiredUserType }) {
  const { currentUser, userType } = useAuth();
  if (!currentUser || userType !== requiredUserType) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // children debe ser un nodo React
  requiredUserType: PropTypes.string.isRequired // requiredUserType debe ser un string
};


export default App;
