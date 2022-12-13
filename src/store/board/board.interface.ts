
export interface ICreateBoards {
  userId: number, 
  titleBoard: string
}

export interface IAddSections {
  boardId: string, 
  titleSection: string
}

export interface IAddTask {
  userId: number,
  boardId: string,
  idSection: string,
  titleTask: string,
  description: string,
  deadLineDate: string | null
}

export interface IDeleteSection {
  boardId: string ,sectionId: string
}

export interface IDeleteTask {
  boardId: string, sectionId: string, taskId: string
}

export interface IDNDTask {
  boardId: string,
  sectionSourceId: string,
  sectionDestinationId: string,
  taskId: string, 
  indexDestinationTask: number
}

export interface ITaskCompleted {
  boardId: string,
  sectionId: string,
  taskId: string
}

export interface IAddUserOnBoard {
  userId: number ,boardId: string
}