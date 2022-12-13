import {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import SectionsItem from './SectionsItem'
import styles from './Sections.module.scss'
import { useActions } from '../../../../hooks/useActions'
import { useAuth } from '../../../../hooks/useAuth'

import cn from 'classnames'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { userService } from '../../../../service/user/user'
import { IUsersAvatar } from '../../../../types/user.types'

const SectionsList = () => {
  const {id} = useParams()
  const {boards} = useTypedSelector(state => state.board)
  const {user, isLoading} = useAuth()
  const findBoard = boards.find(board => board.id === id)
  const {getBoards, changeCurrentBoard, openModal, clearCurrentBoard, DNDTaskServer, DNDTaskClient} = useActions()
  const {colorTheme} = useTypedSelector(state => state.theme)
  const [idDrag, setIdDrag] = useState('')
  const [usersOnTheBoard, setUsersOnTheBoard] = useState<IUsersAvatar[]>([])
  const [isLoadingSection, setIsLoadingSection] = useState(true)

  const fetchUsers = async () => {
    if(user && findBoard) {
      const users = await userService.getUsersAvatar(findBoard.id) 
      setUsersOnTheBoard(users)
    }
  }

  useEffect(() => {
    if(user && !isLoading) {
      getBoards(user.id)
      setIsLoadingSection(false)
    }
  }, [isLoading])

  useEffect(() => {
    if(findBoard) {
      changeCurrentBoard(findBoard)
    }
  }, [findBoard])

  useEffect(() => {
    return () => {
      clearCurrentBoard()
    };
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [boards])

  const handleDND = (e: DropResult) => {
    if(findBoard && e.destination?.droppableId) {
      DNDTaskClient({boardId: findBoard.id, sectionSourceId: e.source.droppableId, sectionDestinationId: e.destination.droppableId, indexDestinationTask: e.destination.index, taskId: e.draggableId})
      DNDTaskServer({boardId: findBoard.id, sectionSourceId: e.source.droppableId, sectionDestinationId: e.destination.droppableId, indexDestinationTask: e.destination.index, taskId: e.draggableId})
    }
  }

  if(isLoadingSection) {
    return (
      <DragDropContext onDragEnd={(e) => handleDND(e)}>
      <div className={cn(styles.sectionList, {
        [styles.blackTheme]: colorTheme === 'black' || colorTheme === 'space',
        [styles.classicTheme]: colorTheme === 'classic'
      })}>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    </DragDropContext>
    )
  }

  return (
    <DragDropContext onDragEnd={(e) => handleDND(e)}>
      <div className={cn(styles.sectionList, {
        [styles.blackTheme]: colorTheme === 'black' || colorTheme === 'space',
        [styles.classicTheme]: colorTheme === 'classic'
      })}>
        {findBoard?.sections.map(section =>  <SectionsItem key={section.idSection} users={usersOnTheBoard} section={section} boardId={findBoard.id} idDrag={idDrag} setIdDrag={setIdDrag} />)}
        <div className={styles.columnAdd} onClick={() => openModal({title: 'Добавить колонку', type: 'section'})}><span>Добавить колонку</span></div>
      </div>
    </DragDropContext>
  )
}

export default SectionsList