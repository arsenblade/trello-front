import { axiosPublic } from "../../api/interceptors"
import { getLoginUrl, getRegisterUrl, getUsersUrl } from "../../constant/serverPath"
import { IUserRegistration } from "../../store/user/user.interface"
import { IUser } from "../../types/user.types"
import { removeTokenStorage, saveTokenStorage } from "./helpers"
const uuid = require('uuid')




export const authService = {
  async register(email: string, password: string, name: string, avatar: string) {
    const {data} = await axiosPublic.get<IUser[]>(getUsersUrl(), {
      params: {
        email_like: email
      }
    })

    if(data.length > 0) {
      throw new Error('There is already a user registered');
    }
 
    const defaultUser: IUserRegistration = {
      email,
      password,
      name,
      avatar,
    }

    const response = await axiosPublic.post<IUser>(getRegisterUrl(), defaultUser)

    if(response.data) saveTokenStorage(uuid.v4(), response.data)

    return response;
  },

  async login(email: string, password: string) {
    const response = await axiosPublic.post<IUser>(getLoginUrl(), {email, password})
    if(response.data) saveTokenStorage(uuid.v4(), response.data)

    return response
  },

  logout() {
    removeTokenStorage()
    localStorage.removeItem('user')
  }
}