import { IUser } from "../../types/user.types";

export interface IUserState extends Omit<IUser, 'email' | 'password'> {}

export interface IUserRegistration extends Omit<IUser, 'id'> {}

export interface IUserLogin extends Omit<IUser, 'id' | 'name' | 'avatar'> {}

export interface IInitialState {
  isLoading: boolean;
  error: string;
  user: IUserState | null
}
