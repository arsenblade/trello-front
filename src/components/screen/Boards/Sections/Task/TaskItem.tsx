import {FC} from 'react'
import { useActions } from '../../../../../hooks/useActions'
import { useTypedSelector } from '../../../../../hooks/useTypedSelector'
import { ITask } from '../../../../../types/board.types'
import styles from './Task.module.scss'
import cn from 'classnames'
import { Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd'
import { useAuth } from '../../../../../hooks/useAuth'
import { convertDate } from '../../../../../utils/convertDate'
import { IUsersAvatar } from '../../../../../types/user.types'

interface TaskItemProps {
  task: ITask,
  boardId: string,
  sectionId: string,
  index: number
  users: IUsersAvatar[]
}

const getTaskStyle = (draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => {
  return {
    ...draggableStyle
  }
}

const TaskItem:FC<TaskItemProps> = ({task, boardId, sectionId, index, users}) => {
  const {user} = useAuth()
  let avatarUser: IUsersAvatar | undefined;

  if(users) {
    avatarUser = users.find(u => u.id === task.idUser)
  }

  const {deleteTask, taskCompleted} = useActions()
  const overdue = !task.isCompleted && task.deadLineDate && new Date(task.deadLineDate).getTime() < new Date().getTime()
  let deadLineText = task.deadLineDate ? `Дедлайн - ${convertDate(task.deadLineDate)}` : ''

  if(!task.isCompleted && overdue) {
    deadLineText = 'Срок карточки истек'
  }

  if(task.isCompleted) {
    deadLineText = 'Карточка выполнена'
  }

  const handleTaskCompleted = () => {
    if(user && user.id === task.idUser) {
      taskCompleted({boardId, sectionId, taskId: task.idTask})
    }
  }


  return (
    <Draggable draggableId={task.idTask} index={index} >
      {(provided, snapshot) => (
        <div className={cn(styles.taskItem, {
          [styles.completed]: task.isCompleted,
          [styles.overdue]: overdue
        })}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getTaskStyle(provided.draggableProps.style)}
        >
          <div className={styles.headerTask}>
            <h3 className={styles.titleTask}>{task.titleTask}</h3>
            <button className={styles.closeBtn} onClick={() => deleteTask({boardId, sectionId, taskId: task.idTask})}>X</button>
          </div>
          <p className={styles.description}>{task.description}</p>
          <div className={styles.containerWorkerAndBtn}>
            {(task.deadLineDate || task.isCompleted) && <div className={styles.deadLineText}>{deadLineText}</div>}
            {user && 
            <div className={styles.containerImgWorker}>
              {avatarUser && <div className={styles.userName}>{avatarUser?.name}</div>}
              <img className={styles.imgWorker} src={`/icon-user/${avatarUser?.avatar}.png`} alt='user.' width={32} height={32} />
            </div>}
          </div>
          {(!task.isCompleted && !overdue && user?.id === task.idUser)  && <button className={styles.btnCompleted} onClick={() => handleTaskCompleted()}>Выполнить</button>}
        </div>
      )}
    </Draggable>
  )
}

export default TaskItem