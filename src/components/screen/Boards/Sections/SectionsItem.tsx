import {FC, useState} from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useAuth } from '../../../../hooks/useAuth'
import { ISection } from '../../../../types/board.types'
import { IUsersAvatar } from '../../../../types/user.types'
import styles from './Sections.module.scss'
import TaskList from './Task/TaskList'

interface SectionsItemProps {
  section: ISection,
  boardId: string
  idDrag: string,
  setIdDrag: React.Dispatch<React.SetStateAction<string>>
  users: IUsersAvatar[]
}

const SectionsItem:FC<SectionsItemProps> = ({section, boardId, idDrag, setIdDrag, users}) => {
  const {openModal, addSectionId, deleteSection} = useActions()

  const handleTaskAdd = () => {
    addSectionId(section.idSection)
    openModal({title: 'Добавить карточку', type: "task"})
  }

  return (
    <div className={styles.sectionItem} onMouseDown={() => setIdDrag(section.idSection)}  style={{zIndex: section.idSection === idDrag ? 10 : 0}}>
      <div className={styles.header}>
        <h2 className={styles.titleSection}>{section.titleSection}</h2>
        <button className={styles.closeBtn} onClick={() => deleteSection({boardId, sectionId: section.idSection})}>X</button>
      </div>
      <TaskList tasks={section.tasks} boardId={boardId} sectionId={section.idSection} users={users}/>
      <button className={styles.btnAddTask} onClick={() => handleTaskAdd()}>Добавить карточку</button>
    </div>
  )
}

export default SectionsItem