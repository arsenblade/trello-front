export interface IBoard {
  id: string,
  titleBoard: string,
  usersOnBoard: number[], 
  sections: ISection[]
}

export interface ISection {
  idSection: string,
  titleSection: string,
  tasks: ITask[]
}

export interface ITask {
  idTask: string,
  titleTask: string,
  description: string,
  deadLineDate: string | null,
  idUser: number,
  isCompleted: boolean
}