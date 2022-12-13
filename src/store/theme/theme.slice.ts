import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStoreLocal } from "../../utils/userLocalStorage";


interface IInitialStateTheme {
  colorTheme: string;
}


const initialState: IInitialStateTheme = {
  colorTheme: 'black'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeColor: (state, action: PayloadAction<string>) => {
      state.colorTheme = action.payload
    },
  },
})


export const {reducer} = themeSlice;