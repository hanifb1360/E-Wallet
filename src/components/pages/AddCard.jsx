import { useDispatch } from "react-redux";
import Card from "../card/Card"
import { getNames } from "../../redux/cardSlice";
import { useEffect } from "react";

const AddCard = () => {
  return (
    <>
      <h1>Add a new bank card</h1>

      <Card/>
    </>
  );
};

export default AddCard;