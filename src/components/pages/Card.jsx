import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewCard, fetchRandomUser } from "../redux/cardSlice";
import Modal from "react-modal";
import "../styles/Card.css";

const cardData = {
  id: Math.round(Math.random() * 1000),
  cardFirst: "",
  cardLast: "",
  cardNumber: "",
  cardMonth: "",
  cardYear: "",
  ccv: "",
  bankName: "",
  cardStateActive: false,
};

const Card = () => {
  const creditCard = useSelector((state) => state.cardInfo);
  const dispatch = useDispatch();
  const [values, setValues] = useState(cardData);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const validation = (fieldName) => {
    switch (fieldName) {
      case "cardFirst":
        return /^([^0-9]*)$/;
      case "cardLast":
        return /^([^0-9]*)$/;
      case "cardNumber":
        return /^[0-9]+$/;

      case "cardMonth":
        return /^(0?[1-9]|1[012])$/;

      case "cardYear":
        return /^[0-9]+$/;

      case "ccv":
        return /^[0-9]+$/;

      case "bankName":
        return /^(?!s*$).+/;

      default:
        break;
    }
  };

  const handleChange = (e) => {
    const nextCard = {
      ...values,
      [e.target.name]: e.target.value,
    };
    const regex = validation(e.target.name);
    const isValid = regex.test(e.target.value);
    if (isValid) {
      setError(false);
      setValues(nextCard);
    } else {
      setError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (creditCard.cardInformation.length <= 3 && !error) {
      dispatch(addNewCard(values));
      setValues(cardData);
      //pop up with thank you message
       setModalIsOpen(true);
      cardData.id = Math.round(Math.random() * 1000);
      console.log(creditCard.cardInformation);
    } else {
      if (error) {
        alert("one or more fields has field validation problem");
      } else {
        alert("Max limit");
      }
    }
  };

  const closeModal = () => {
    navigate("/ewallet");
  };

  return (
    <div className="add-card-container">
      

      <div className="creditCard">
        <div className="logo">{values.bankName}</div>

        <div className="number">{values.cardNumber}</div>
        <span className="ccv">{values.ccv}</span>
        <div className="info">
          <div className="name">
            <div className="card-holder-label">CARDHOLDER'S NAME</div>
            <div className="nameContainer">
              <p className="card-holder-name">{values.cardFirst}</p>
              <p className="card-holder-name">{values.cardLast}</p>
            </div>
          </div>

          <div className="expiry">
            <div className="label">VALID UP TO</div>
            <div>
              {" "}
              {values.cardMonth} / {values.cardYear}
            </div>
          </div>
        </div>
      </div>

      {/* Credit card form */}

      <div>


        <form className="form" onSubmit={handleSubmit}>
          <label className="input-label">
            {" "}
            First Name
            <input
              className="input"
              type="text"
              name="cardFirst"
              value={values.cardFirst || ""}
              onChange={handleChange}
            />
          </label>

          <label className="input-label">
            {" "}
            Last Name
            <input
              className="input"
              type="text"
              name="cardLast"
              value={values.cardLast || ""}
              onChange={handleChange}
            />
          </label>

          <label className="input-label">
            {" "}
            Number
            <input 
            className="input"
            maxLength="16" 
            onChange={handleChange} 
            name="cardNumber" />
          </label>
          
          <section className="expiryContainer">
            <label className="expiry-abel"> Expiration Date</label>

            <div className="expiry-fields-box">

            <div className="expiry-fields"></div>
      
            <label className="input-label">
              {" "}
              Month
              <input
                className="input"
                type="text"
                maxLength="2"
                name="cardMonth"
                onChange={handleChange}
              />
            </label>
            <label className="input-label">
              {" "}
              Year
              <input
                className="input"
                type="text"
                maxLength="2"
                name="cardYear"
                onChange={handleChange}
              />
              
            </label>
            </div>
          </section>

          <label className="input-label ccv">
            CCV
            <input
              className="input"
              type="text"
              maxLength="3"
              name="ccv"
              onChange={handleChange}
            />
          </label>

          <select className="select"  name="bankName" onChange={handleChange}>
            <option value="" disabled selected>
              Select bank name{" "}
            </option>
            <option value="Mastercard"> MasterCard </option>
            <option value="Visa"> Visa </option>
            <option value="American Express"> American Express </option>
          </select>
          {error && <p>Something is wrong</p>}
          <button className="submitBtn"> Submit </button>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Card Added!"
      >
        <h2>Card is added!</h2>
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
};

export default Card;
