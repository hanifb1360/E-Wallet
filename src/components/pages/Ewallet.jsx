import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Ewallet.css";
import { activeCardFn } from "../redux/cardSlice";

const Ewallet = () => {
  const creditCard = useSelector((state) => state.cardInfo);
  const dispatch = useDispatch();
  const [state, setState] = useState(creditCard);
  const [cards, setCards] = useState();

  const toggleActive = (index) => {
    setState({
      ...creditCard,
      activeObject: creditCard.cardInformation[index],
    });
    dispatch(activeCardFn(creditCard.cardInformation[index]));
  };

  const activeCard = creditCard.cardInformation[creditCard.activeObject];

  const inactiveCards = creditCard.cardInformation.filter((c, index) => {
    return creditCard.activeObject !== index;
  });

 

  useEffect(() => {
    setCards([activeCard, ...inactiveCards].filter(Boolean))
  
    
  }, [activeCard, inactiveCards])
  


  const toggleActiveStyle = (index) => {
    if (state.cardInformation[index] === state.activeObject) {
      return "active";
    } else {
      return "inactive";
    }
  };

 

    const removeItem =(id) => {
      const filtered = cards.filter((card) => card.id !== id);
      setCards(filtered);
      
      

    alert("The post has been deleted!")
  };

  return (
    <>
      <ul className="walletCardsList">
        {cards && cards.map((creditCard, index) => {
          return (
            <li
              key={index}
              className={toggleActiveStyle(index)}
              onClick={() => {
                toggleActive(index);
              }}
            >
              <div className="creditCard creditCard-wallet">
                <div className="logo">{creditCard.bankName}</div>

                <div className="number">{creditCard.cardNumber}</div>
                <span className="ccv">{creditCard.ccv}</span>
                <div className="info">
                  <div className="name">
                    <div className="card-holder-label">CARDHOLDER'S NAME</div>
                    <div className="nameContainer">
                      <p className="card-holder-name">
                        {" "}
                        {creditCard.cardFirst}
                      </p>
                      <p className="card-holder-name"> {creditCard.cardLast}</p>
                    </div>
                  </div>

                  <div className="expiry">
                    <div className="label">VALID UP TO</div>
                    <div>
                      {" "}
                      {creditCard.cardMonth} / {creditCard.cardYear}
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={removeItem}>Delete card</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Ewallet;
