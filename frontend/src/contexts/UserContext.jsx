import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "../components/Login";
export const UserContext = createContext(null);

function UserProvider({ children }) {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("http://localhost:3000/user/", {
          withCredentials: true,
        });

        if (res.data.success) {
          setUser(res.data.user);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error.response.data);
        setUser(null);
        navigate("/login");
        setLoading(false);
      }
      
    }
    fetchUser();
  }, []);

  if (loading) {
    
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
