
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Insights from "./components/Insights.jsx";
import Manage from "./components/Manage.jsx";
import Transactions from "./components/Transactions.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { UserContext } from "./contexts/UserContext.jsx";
import { useContext } from "react";
import PageNotFound from "./components/PageNotFound.jsx";
function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Login/>} />
        <Route path="/insights" element={user ? <Insights /> : <Login/>} />
        <Route path="/manage" element={user ? <Manage /> : <Login/>} />
        <Route path="/transactions" element={user ? <Transactions /> : <Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </>
  );
}

export default App;
