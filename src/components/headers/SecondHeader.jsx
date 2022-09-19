
import { Link } from "react-router-dom";
import "../styles/Header.css"

function SecondHeader() {
  return (
    <div className="secondHeader">
      <Link to="/ewallet" className="btnBox">
        <button className="btn"> CARDS </button>
      </Link>
      <Link to="/addcard" className="btnBox">
        <button className="btn"> ADD CARD</button>
      </Link>
    </div>
  );
}

export default SecondHeader;
