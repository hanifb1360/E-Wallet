import "./components/styles/App.css";
import Card from "./components/card/Card";
import Ewallet from "./components/pages/Ewallet";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRandomUser } from "./components/redux/cardSlice";
import { useEffect } from "react";
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRandomUser());
  }, []);

  return (
    <div className="App">

    <Header/>

      <div className="btn-container">
      <Link to="/ewallet">
        <button className="btn"> E-wallet </button>
      </Link>
      <Link to="/addcard">
        <button className="btn"> AddCard</button>
      </Link>
      </div>

      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/Addcard" element={<Card />} />
        <Route path="/ewallet" element={<Ewallet />} />
      </Routes>
    </div>
  );
}

export default App;
