import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRandomUser = createAsyncThunk(
  "card/fetchRandomUser",
  async () => {
    return fetch(`https://randomuser.me/api/`)
      .then((response) => response.json())
      .then((data) => data.results[0]);
  }
);

const initialState = {
  activeObject: null,
  loading: false,
  error: false,
  cardList: [],
  cardInformation: [
    {
      cardName: "",
      cardNumber: "1230067891000121",
      cardMonth: "03",
      cardYear: "22",
      ccv: "115",
      bankName: "visa",
      cardStateActive: false,
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
  },
  extraReducer: {
    [fetchRandomUser.pending]: (state) => {
      state.status = "loading...";

      console.log(state.status);
    },

    [fetchRandomUser.fulfilled]: (state, action) => {
      state.status = "success";
      const { first, last } = action.payload.name;
      let wholeName = first + " " + last;
      for (let i = 0; i < state.cardInformation.length; i++) {
        state.cardInformation[i].cardName = wholeName.toUpperCase();
      }
    },
    [fetchRandomUser.rejected]: (state) => {
      state.status = "rejected";
      console.log(state.status);
    },
  },
});

export const { addNewCard } = cardSlice.actions;
export default cardSlice.reducer;
