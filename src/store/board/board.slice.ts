import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyToast } from "../../components/ui/MyToast/MyToast";
import { IBoard } from "../../types/board.types";
import { getStoreLocal } from "../../utils/userLocalStorage";
import { addSection, addTask, addUserOnBoard, createBoard, deleteBoard, deleteSection, deleteTask, DNDTaskServer, getBoards, taskCompleted } from "./board.actions";
import { IDNDTask } from "./board.interface";

interface IInitialStateBoard {
  boards: IBoard[],
  currentBoard: IBoard | null
  idCurrentSection: string,
  isLoading: boolean,
  error: '',
}

const initialState: IInitialStateBoard = {
  boards: [],
  currentBoard: null,
  idCurrentSection: '',
  isLoading: false,
  error: ''
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    changeCurrentBoard: (state, action: PayloadAction<IBoard>) => {
      state.currentBoard = action.payload
    },
    clearCurrentBoard: (state) => {
      state.currentBoard = null
    },
    addSectionId: (state, action: PayloadAction<string>) => {
      state.idCurrentSection = action.payload
    },
    clearSectionId: (state) => {
      state.idCurrentSection = ''
    },
    DNDTaskClient: (state, action: PayloadAction<IDNDTask>) => {
      const boardsIndex = state.boards.findIndex(board => board.id === action.payload.boardId)
      const sectionSourceIndex = state.boards[boardsIndex].sections.findIndex(s => s.idSection === action.payload.sectionSourceId)
      const sectionDestinationIndex = state.boards[boardsIndex].sections.findIndex(s => s.idSection === action.payload.sectionDestinationId)
      const currentTask = state.boards[boardsIndex].sections[sectionSourceIndex].tasks.find(t => t.idTask === action.payload.taskId)
      if(currentTask) {
        state.boards[boardsIndex].sections[sectionSourceIndex].tasks =  state.boards[boardsIndex].sections[sectionSourceIndex].tasks.filter(t => t.idTask !== action.payload.taskId)
        state.boards[boardsIndex].sections[sectionDestinationIndex].tasks.splice(action.payload.indexDestinationTask, 0, currentTask)
        state.currentBoard = state.boards[boardsIndex]
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getBoards.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getBoards.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.boards = payload
    })
    .addCase(getBoards.rejected, (state) => {
      state.isLoading = false;
      state.boards = []
    })

    .addCase(createBoard.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createBoard.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.boards.push(payload)
    })
    .addCase(createBoard.rejected, (state) => {
      state.isLoading = false;
      MyToast('Ошибка при создании доски', false)
    })

    .addCase(deleteBoard.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteBoard.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.boards = state.boards.filter(board => board.id !== payload)
    })
    .addCase(deleteBoard.rejected, (state) => {
      state.isLoading = false;
      MyToast('Ошибка при удалении доски', false)
    })

    .addCase(addSection.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addSection.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      const index = state.boards.findIndex(board => board.id === payload.id)
      state.boards[index].sections = payload.sections
    })
    .addCase(addSection.rejected, (state) => {
      state.isLoading = false;
      MyToast('Ошибка при добавлении колонки', false)
    })

    .addCase(deleteSection.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteSection.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      const index = state.boards.findIndex(board => board.id === payload.boardId)
      state.boards[index].sections =  state.boards[index].sections.filter(section => section.idSection !== payload.sectionId)
    })
    .addCase(deleteSection.rejected, (state) => {
      state.isLoading = false;
      MyToast('Ошибка при удалении колонки', false)
    })

    .addCase(addTask.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addTask.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      const index = state.boards.findIndex(board => board.id === payload.id)
      state.boards[index].sections = payload.sections
      MyToast('Карточка успешно добавлена', true)
    })
    .addCase(addTask.rejected, (state) => {
      state.isLoading = false;
      MyToast('Ошибка при добавлении карточки', false)
    })

    .addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteTask.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      const indexBoard = state.boards.findIndex(board => board.id === payload.boardId)
      const indexSection = state.boards[indexBoard].sections.findIndex(section => section.idSection === payload.sectionId)
      state.boards[indexBoard].sections[indexSection].tasks = state.boards[indexBoard].sections[indexSection].tasks.filter(task => task.idTask !== payload.taskId)
    })
    .addCase(deleteTask.rejected, (state) => {
      state.isLoading = false;
      MyToast('Ошибка при удалении карточки', false)
    })

    .addCase(DNDTaskServer.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(DNDTaskServer.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.boards = state.boards.map(board => {
        if(board.id === payload.id) {
          return payload
        }
        else {
          return board
        }
      })
      state.currentBoard = payload
    })
    .addCase(DNDTaskServer.rejected, (state) => {
      state.isLoading = false;
    })

    .addCase(taskCompleted.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(taskCompleted.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.boards = state.boards.map(board => {
        if(board.id === payload.id) {
          return payload
        }
        else {
          return board
        }
      })
    })
    .addCase(taskCompleted.rejected, (state) => {
      state.isLoading = false;
    })

    .addCase(addUserOnBoard.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addUserOnBoard.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.boards = state.boards.map(board => {
        if(board.id === payload.id) {
          return payload
        }
        else {
          return board
        }
      })
      MyToast('Пользователь добавлен на доску', true)
    })
    .addCase(addUserOnBoard.rejected, (state) => {
      state.isLoading = false;
      MyToast('Ошибка при добавлении пользователя', false)
    })
  }
})


export const {reducer} = boardSlice;