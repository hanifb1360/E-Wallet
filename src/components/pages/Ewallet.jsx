import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Ewallet.css";
import { activeCardFn } from "../redux/cardSlice";

const Ewallet = () => {
  const creditCard = useSelector((state) => state.cardInfo);
  const dispatch = useDispatch();
  const [state, setState] = useState(creditCard);
  console.log("creditCard", creditCard);
  const toggleActive = (index) => {
    setState({ ...state, activeObject: state.cardInformation[index] });
    dispatch(activeCardFn(state.cardInformation[index]));
  };

  const activeCard = state.cardInformation[state.activeObject];

  const inactiveCards = state.cardInformation.filter((c, index) => {
    return state.activeObject !== index;
  });

  const allCards = [activeCard, ...inactiveCards].filter(Boolean);

  const toggleActiveStyle = (index) => {
    if (state.cardInformation[index] === state.activeObject) {
      return "active";
    } else {
      return "inactive";
    }
  };

  // delete function

//   const removeItem =(id) => {
//     const deleted = cards.filter((card) => card.id !== id);
//     setCards(deleted);
//     setTotal(cards.length-1);
  
//   alert("The post has been deleted!")
// };

  
  return (
    <>
      
      <ul className="walletCardsList">
        {allCards.map((credit, index) => {
          return (
            <li
              key={index}
              
              className={toggleActiveStyle(index)}
              onClick={() => {
                toggleActive(index);
              }}
            >
              <div className="creditCard">
                <div className="logo">{credit.bankName}</div>

                <div className="number">{credit.cardNumber}</div>
                <span className="ccv">{credit.ccv}</span>
                <div className="info">
                  <div className="name">
                    <div className="label">
                      CARDHOLDER'S NAME
                    </div>
                    <div className="nameContainer">
                      <p className="card-holder-name"> {credit.cardFirst}</p>
                      <p className="card-holder-name"> {credit.cardLast}</p>
                    </div>
                  </div>

                  <div className="expiry">
                    <div className="label">VALID UP TO</div>
                    <div>
                      {" "}
                      {credit.cardMonth} / {credit.cardYear}
                    </div>
                  </div>
                </div>
              </div>
              {/* <button onClick={removeItem}>Delete card</button> */}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Ewallet;
