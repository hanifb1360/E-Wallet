import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

export const fetchRandomUser = createAsyncThunk(
  "card/fetchRandomUser",
  async () => {
    return fetch("https://randomuser.me/api").then((res) => res.json());
  }
);



const initialState = {
  activeObject: null,
  loading: false,
  error: false,
  cardList: [],
  cardInformation: [
    {
      id: "1",
      cardFirst: "",
      cardLast: "",
      cardNumber: "1230067891000121",
      cardMonth: "03",
      cardYear: "22",
      ccv: "115",
      bankName: "visa",
      cardStateActive: true,
    },
  ],
};


const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addNewCard: (state, action) => {
      state.cardInformation = state.cardInformation.concat(action.payload);
    },
    activeCardFn: (state, action) => {
      let index = state.cardInformation.findIndex(
        (e) => e.id === action.payload.id
      );
      for (let index = 0; index < state.cardInformation.length; index++) {
        state.cardInformation[index].cardStateActive = false;
      }
      if (index != -1) {
        state.cardInformation[index].cardStateActive = true;
      }
    },
  },
  extraReducers: {
    [fetchRandomUser.pending]: (state) => {
      state.status = "loading...";

      console.log("pending", state.status);
    },

    [fetchRandomUser.fulfilled]: (state, action) => {
      state.status = "success";

      
      const { first } = action.payload.results[0].name;
      const { last } = action.payload.results[0].name;
      // let wholeName = first + " " + last;

      // for (let i = 0; i < state.cardInformation.length; i++) {
      let newState = [...state.cardInformation];
      newState[0].cardFirst = first;
      newState[0].cardLast = last;
      state.cardInformation = newState;

      // }
    },
    [fetchRandomUser.rejected]: (state) => {
      state.status = "rejected";
      console.log(state.status);
    },
  },
});

export const { addNewCard, activeCardFn } = cardSlice.actions;
export default cardSlice.reducer;
