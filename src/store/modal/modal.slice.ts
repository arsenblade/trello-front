import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IInitialStateModal {
  isVisible: boolean;
  type: 'board' | 'section' | 'task';
  title: string;
}


const initialState: IInitialStateModal = {
  isVisible: false,
  type: 'board',
  title: ''
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{type: 'board' | 'section' | 'task', title: string}>) => {
      state.isVisible = true;
      state.type = action.payload.type;
      state.title = action.payload.title;
    },
    closeModal: (state) => {
      state.isVisible = false;
      state.type = 'board';
      state.title = ''
    },
  },
})


export const {reducer} = modalSlice;