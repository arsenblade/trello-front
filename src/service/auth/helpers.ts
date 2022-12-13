import { IUserState } from "../../store/user/user.interface"
import { IUser } from "../../types/user.types"

export const saveTokenStorage = (token: string, user: IUser) => {
  localStorage.setItem('accessToken', token)
  localStorage.setItem('user', JSON.stringify({
    avatar: user.avatar,
    name: user.name,
    id: user.id
  }))
}

export const removeTokenStorage = () => {
  localStorage.removeItem('accessToken')
}