import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import "./ProtectedRote.css";
type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="wiki-loading">
        <div className="wiki-loading-content">
          <div className="wiki-loading-logo">W</div>
          <div className="wiki-loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
