import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewCard, fetchRandomUser } from "../redux/cardSlice";

const cardData = {
  cardName: "",
  cardNumber: "",
  cardMonth: "",
  cardYear: "",
  ccv: "",
  bankName: "",
};

const Card = () => {
  const creditCard = useSelector((state) => state.cardInfo);
  const dispatch = useDispatch();
  const [values, setValues] = useState(cardData);
  console.log(creditCard);

  const handleChange = (e) => {
    const nextCard = {
      ...values,
      [e.target.name]: e.target.value,
    };
    setValues(nextCard);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  

  if (creditCard.cardInformation.length <= 3) {
    dispatch(addNewCard(values));
    setValues(cardData);
    console.log(creditCard.cardInformation);
  } else {
    alert("Max limit");
  }
};

return (
  <>
    <small>New Card</small>

    <div className="credit-card">
      <div className="credit-card-logo">{values.bankName}</div>
      <div className="credit-card-number">{values.cardNumber}</div>
      <span className="credit-ccv">{values.ccv}</span>

      <section className="credit-card-info">
        <div className="credit-card-info-name">
          <div className="credit-card-info-lable">Cradholder's name</div>
          <div value={values.cardName}>{values.cardName}</div>
        </div>

        <div className="credit-card-info-expiry">
          <div className="credit-card-info-label">Valid up to</div>
          <div className="dates">
            {""}
            {values.cardMonth} / {values.cardYear}
          </div>
        </div>
      </section>
    </div>



    <section className="credit-card-form">
    <form action="" className="myForm" onSubmit={handleSubmit}>
        <label>
        {" "}
        Name <input type="text" name="cardName" value={values.cardName || ""} onChange = {handleChange}/>

        </label>
        <label>
            {" "}
            Number
            <input maxLength="16" onChange={handleChange} name="cardNumber"/>

        </label>
        <div>
            <label>Expiration Date</label>
            <div>
                {" "}
                Month
                <input type="text" maxLength="2" name="cardMonth" onChange={handleChange}/>
            </div>

            <div>
                {" "}
                Year
                <input type="text" maxLength="2" name="cardYear" onChange={handleChange}/>
            </div>
            </div>

            <label>
            CCV
            <input
              type="text"
              maxLength="3"
              name="ccv"
              onChange={handleChange}
            />
          </label>

          <select name="bankName" onChange={handleChange}>
          <option value="Mastercard">MasterCard</option>
          <option value="visa">Visa</option>
          <option value="American Express">American Express</option>
          </select>

          <button>Submit</button>
        
    </form>
    </section>
  </>
);
};

export default Card;



