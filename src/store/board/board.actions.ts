import { createAsyncThunk } from "@reduxjs/toolkit"
import { boardService } from "../../service/board/board"
import { IBoard } from "../../types/board.types"
import { IAddSections, IAddTask, IAddUserOnBoard, ICreateBoards, IDeleteSection, IDeleteTask, IDNDTask, ITaskCompleted } from "./board.interface"


export const getBoards = createAsyncThunk<IBoard[], number>('getBoards', async (userId, thunkApi) => {
  try {
    const response = await boardService.getBoards(userId)
    return response
  } catch (e) {
    return thunkApi.rejectWithValue(e)
  }
})

export const createBoard = createAsyncThunk<IBoard, ICreateBoards>('createBoard', async ({titleBoard, userId}, thunkApi) => {
  try {
    const response = await boardService.createBoard(userId, titleBoard)
    return response
  } catch (e) {
    return thunkApi.rejectWithValue(e)
  }
})

export const deleteBoard = createAsyncThunk<string, string>('deleteBoard', async (boardId, thunkApi) => {
  try {
    const response = await boardService.deleteBoard(boardId)
    return response
  } catch (e) {
    return thunkApi.rejectWithValue(e)
  }
})

export const addSection = createAsyncThunk<IBoard, IAddSections>('addSection', async ({boardId, titleSection}, thunkApi) => {
  try {
    const response = await boardService.addSection(boardId, titleSection)
    return response
  } catch (e) {
    return thunkApi.rejectWithValue(e)
  }
})

export const deleteSection = createAsyncThunk<IDeleteSection, IDeleteSection>('deleteSection', async ({boardId, sectionId}, thunkApi) => {
  try {
    const response = await boardService.deleteSection(boardId, sectionId)
    return response
  } catch (e) {
    return thunkApi.rejectWithValue(e)
  }
})

export const addTask = createAsyncThunk<IBoard, IAddTask>('addTask', async ({userId, boardId, idSection, description, titleTask, deadLineDate}, thunkApi) => {
  try {
    const response = await boardService.addTask(userId, boardId, idSection, titleTask, description, deadLineDate)
    return response
  } catch (e) {
    return thunkApi.rejectWithValue(e)
  }
})

export const deleteTask = createAsyncThunk<IDeleteTask, IDeleteTask>('deleteTask', async ({boardId, sectionId, taskId}, thunkApi) => {
  try {
    const response = await boardService.deleteTask(boardId, sectionId, taskId)
    return response
  } catch (e) {
    return thunkApi.rejectWithValue(e)
  }
})

export const DNDTaskServer = createAsyncThunk<IBoard, IDNDTask>('DNDTaskServer', async ({boardId, sectionSourceId, sectionDestinationId, taskId, indexDestinationTask}, thunkApi) => {
  try {
    const response = await boardService.DNDTask(boardId, sectionSourceId, sectionDestinationId, taskId, indexDestinationTask)
    return response
  } catch (e) {
    return thunkApi.rejectWithValue(e)
  }
})

export const taskCompleted = createAsyncThunk<IBoard, ITaskCompleted>('TaskCompleted', async ({boardId, sectionId, taskId}, thunkApi) => {
  try {
    const response = await boardService.taskCompleted(boardId, sectionId, taskId)
    return response
  } catch (e) {
    return thunkApi.rejectWithValue(e)
  }
})

export const addUserOnBoard = createAsyncThunk<IBoard, IAddUserOnBoard>('AddUserOnBoard', async ({userId, boardId}, thunkApi) => {
  try {
    const response = await boardService.addUserOnBoard(userId, boardId)
    console.log(response)
    return response
  } catch (e) {
    return thunkApi.rejectWithValue(e)
  }
})