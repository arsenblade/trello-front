import { async } from "q"
import { axiosPublic } from "../../api/interceptors"
import { getBoardsUrl } from "../../constant/serverPath"
import { IBoard, ISection, ITask } from "../../types/board.types"
import { convertDate } from "../../utils/convertDate"
const uuid = require("uuid")


export const boardService = {
  async getBoards(userId: number) {
    const response = await axiosPublic.get<IBoard[]>(getBoardsUrl())
    const filteredBoards = response.data.filter(board => board.usersOnBoard.some(usOnBoard => usOnBoard === userId))

    return filteredBoards
  },

  async createBoard(userId: number, titleBoard: string) {
    const defaultBoard: IBoard = {
      id: uuid.v4(),
      titleBoard,
      usersOnBoard: [userId],
      sections: []
    }

    const response = await axiosPublic.post<IBoard>(getBoardsUrl(), defaultBoard)

    return response.data
  },

  async deleteBoard(boardId: string) {
    const response = await axiosPublic.delete<IBoard>(getBoardsUrl(boardId))
    return boardId
  },

  async addSection(boardId: string, titleSection: string) {
    const response = await axiosPublic.get<IBoard[]>(getBoardsUrl())
    const filteredBoard = response.data.find(board => board.id === boardId)

    if(filteredBoard) {
      const section: ISection = {
        idSection: uuid.v4(),
        titleSection,
        tasks: []
      }

      filteredBoard.sections.push(section)

      const {data} = await axiosPublic.put<IBoard>(getBoardsUrl(boardId), filteredBoard)

      return data
    }
    else {
      throw new Error('Error server');
    }
  },

  async deleteSection(boardId: string ,sectionId: string) {
    const {data} = await axiosPublic.get<IBoard>(getBoardsUrl(boardId))
    data.sections = data.sections.filter(section => section.idSection !== sectionId)
    const resposne = await axiosPublic.put(getBoardsUrl(boardId), data)
    
    return {boardId, sectionId}
  },

  async addUserOnBoard(userId: number, boardId: string) {
    const {data} = await axiosPublic.get<IBoard>(getBoardsUrl(boardId))
    const findUser = data.usersOnBoard.find(userOnBoard => userOnBoard === userId)
    
    if(!findUser) {
      data.usersOnBoard.push(userId)
      await axiosPublic.put(getBoardsUrl(boardId), data)
    }
    
    return data
  },

  async deleteTask(boardId: string, sectionId: string, taskId: string) {
    const {data} = await axiosPublic.get<IBoard>(getBoardsUrl(boardId))
    const currentSectionId = data.sections.findIndex(section => section.idSection === sectionId)
    data.sections[currentSectionId].tasks = data.sections[currentSectionId].tasks.filter(task => task.idTask !== taskId)
    const resposne = await axiosPublic.put(getBoardsUrl(boardId), data)
    
    return {boardId, sectionId, taskId}
  },

  async addTask(userId: number, boardId: string, idSection: string, titleTask: string, description: string, deadLineDate: string | null) {
    const response = await axiosPublic.get<IBoard[]>(getBoardsUrl())
    const filteredBoard = response.data.find(board => board.id === boardId)
    const filteredSectionId = filteredBoard?.sections.findIndex(section => section.idSection === idSection)

    if(filteredSectionId !== undefined && filteredSectionId >= 0 && filteredBoard) {
      const task: ITask = {
        idTask: uuid.v4(),
        titleTask,
        description,
        idUser: userId,
        deadLineDate: deadLineDate ? deadLineDate : null,
        isCompleted: false
      }

      filteredBoard.sections[filteredSectionId].tasks.push(task)

      const response = await axiosPublic.put<IBoard>(getBoardsUrl(boardId), filteredBoard)

      return response.data
    }
    else {
      throw new Error('Error server');
    }
  },

  async DNDTask(boardId: string, sectionSourceId: string, sectionDestinationId: string, taskId: string, indexDestinationTask: number){
    const {data} = await axiosPublic.get<IBoard>(getBoardsUrl(boardId))
    const sectionSourceIndex = data.sections.findIndex(s => s.idSection === sectionSourceId)
    const sectionDestinationIndex = data.sections.findIndex(s => s.idSection === sectionDestinationId)
    const currentTask = data.sections[sectionSourceIndex].tasks.find(t => t.idTask === taskId)
    if(currentTask) {
      data.sections[sectionSourceIndex].tasks =  data.sections[sectionSourceIndex].tasks.filter(t => t.idTask !== taskId)
      data.sections[sectionDestinationIndex].tasks.splice(indexDestinationTask, 0, currentTask)
      await axiosPublic.put<IBoard>(getBoardsUrl(boardId), data)
    }

    return data
  },

  async taskCompleted(boardId: string, sectionId: string, taskId: string){
    const {data} = await axiosPublic.get<IBoard>(getBoardsUrl(boardId))
    const sectionIndex = data.sections.findIndex(s => s.idSection === sectionId)
    if(sectionIndex !== undefined && sectionIndex >= 0) {
      data.sections[sectionIndex].tasks = data.sections[sectionIndex].tasks.map((task) => {
        if(task.idTask === taskId) {
          task.isCompleted = true
          return task
        }
        else {
          return task
        }
      })

      await axiosPublic.put<IBoard>(getBoardsUrl(boardId), data)
    }

    return data
  },
}