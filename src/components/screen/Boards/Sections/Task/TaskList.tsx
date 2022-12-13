import {FC} from 'react'
import { ITask } from '../../../../../types/board.types'
import TaskItem from './TaskItem'
import styles from './Task.module.scss'
import cn from 'classnames'
import { useTypedSelector } from '../../../../../hooks/useTypedSelector'
import { Droppable } from 'react-beautiful-dnd'
import { IUsersAvatar } from '../../../../../types/user.types'

interface TaskListProps {
  tasks: ITask[]
  boardId: string,
  sectionId: string,
  users: IUsersAvatar[]
}

const TaskList:FC<TaskListProps> = ({tasks, boardId, sectionId, users}) => {
  const {colorTheme} = useTypedSelector(state => state.theme)

  if(users.length <= 0) {
    return (
      <Droppable droppableId={sectionId}>
      {(provided, snapshot) => (
        <div className={cn(styles.taskList, {
          [styles.blackTheme]: colorTheme === 'black' || colorTheme === 'space',
          [styles.classicTheme]: colorTheme === 'classic'
        })}
        {...provided.droppableProps}
        ref={provided.innerRef}
        >
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    )
  }

  return (
    <Droppable droppableId={sectionId}>
      {(provided, snapshot) => (
        <div className={cn(styles.taskList, {
          [styles.blackTheme]: colorTheme === 'black' || colorTheme === 'space',
          [styles.classicTheme]: colorTheme === 'classic'
        })}
        {...provided.droppableProps}
        ref={provided.innerRef}
        >
          {tasks.map((task, index) => <TaskItem index={index} key={task.idTask} users={users} task={task} boardId={boardId} sectionId={sectionId}/>)}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default TaskList