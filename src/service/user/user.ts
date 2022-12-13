import { axiosPublic } from "../../api/interceptors"
import { getBoardsUrl, getUsersUrl } from "../../constant/serverPath"
import { IBoard } from "../../types/board.types"
import { IUser } from "../../types/user.types"

export const userService = {
  async getUsersOnBoard(boardId: string) {
    const {data: board} = await axiosPublic.get<IBoard>(getBoardsUrl(boardId))
    const {data: users} = await axiosPublic.get<IUser[]>(getUsersUrl())
    const filteredUsers = users.filter(user => board.usersOnBoard.some(userOnBoard => user.id === userOnBoard))
    const resultUsers = filteredUsers.map(user => {
      return {
        value: String(user.id),
        label: user.name,
      }
    })
    return resultUsers
  },

  async getUsersAvatar(boardId: string) {
    const {data: board} = await axiosPublic.get<IBoard>(getBoardsUrl(boardId))
    const {data: users} = await axiosPublic.get<IUser[]>(getUsersUrl())
    const filteredUsers = users.filter(user => board.usersOnBoard.some(userOnBoard => user.id === userOnBoard))
    const resultUsers = filteredUsers.map(user => {
      return {
        id: user.id ,
        name: user.name,
        avatar: user.avatar
      }
    })
    return resultUsers
  },

  async getUsersNotOnTheBoard(boardId: string) {
    const {data: board} = await axiosPublic.get<IBoard>(getBoardsUrl(boardId))
    const {data: users} = await axiosPublic.get<IUser[]>(getUsersUrl())
    const filteredUsers = users.filter(user => !board.usersOnBoard.some(userOnBoard => user.id === userOnBoard))
    const resultUsers = filteredUsers.map(user => {
      return {
        value: String(user.id),
        label: user.name,
      }
    })
    return resultUsers
  }
}