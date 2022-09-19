import "./components/styles/App.css";
import Card from "./components/card/Card";
import Ewallet from "./components/pages/Ewallet";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRandomUser } from "./components/redux/cardSlice";
import { useEffect } from "react";
import Header from "./components/headers/Header";
import SecondHeader from "./components/headers/SecondHeader";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRandomUser());
  }, []);

  return (
    <div className="App">

    <Header/>
    <SecondHeader/>
    

      

      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/Addcard" element={<Card />} />
        <Route path="/ewallet" element={<Ewallet />} />
      </Routes>
    </div>
  );
}

export default App;
