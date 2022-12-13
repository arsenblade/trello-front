import { FC, useState, useEffect } from "react"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import Input from "../../ui/Input/Input"
import styles from './Modal.module.scss'
import cn from 'classnames'
import Button from "../../ui/Button/Button"
import { useAuth } from "../../../hooks/useAuth"
import Calendar from 'react-calendar';
import { convertDate } from "../../../utils/convertDate"
import { userService } from "../../../service/user/user"
import MySelect from "../../ui/Select/Select"
import { MyToast } from "../../ui/MyToast/MyToast"


const Modal:FC = () => {
  const {type, isVisible, title} = useTypedSelector(state => state.modal)
  const [valueName, setValueName] = useState('')
  const [valueDescription, setValueDescription] = useState('')
  const {currentBoard, idCurrentSection} = useTypedSelector(state => state.board)
  const {closeModal, createBoard, addSection, addTask, clearSectionId} = useActions()
  const {user} = useAuth()
  const {colorTheme} = useTypedSelector(state => state.theme)
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const [valueDate, setValueDate] = useState(null)
  const [isAddData, setIsAddData] = useState(false)
  const [usersOnTheBoard, setUsersOnTheBoard] = useState<{value: string, label: string}[]>([])
  const [userOnTheBoard, setUserOnTheBoard] = useState<{value: string, label: string}>({value: '', label: ''})

  const clearAndCloseModal = () => {
    setValueDescription('')
    setValueName('')
    setIsOpenCalendar(false)
    closeModal()
    handleAddDeadLine()
    setIsAddData(false)
    setIsOpenCalendar(false)
    setUserOnTheBoard({value: '', label: ''})
    if(isAddData) {
      setValueDate(null)
    }
  }

  useEffect(() => {    
    fetchUsers()
  }, [currentBoard, isVisible])

  const fetchUsers = async () => {
    if(user && currentBoard) {
      const response = await userService.getUsersOnBoard(currentBoard.id)
      setUsersOnTheBoard(response)
    }
  }

  const handleCreate = () => {
    if(user && type === 'board') {
      createBoard({titleBoard: valueName, userId: user.id})
      clearAndCloseModal()
    }
    if(user && type === 'section') {
      currentBoard && addSection({boardId: currentBoard.id, titleSection: valueName})
      clearAndCloseModal()
    }
    if(user && type === 'task' && userOnTheBoard.value !== '') {
      currentBoard && addTask({userId: Number(userOnTheBoard.value), boardId: currentBoard.id, idSection: idCurrentSection, titleTask: valueName, description: valueDescription, deadLineDate: valueDate})
      clearSectionId()
      clearAndCloseModal()
    }
    else if(userOnTheBoard.value === '') {
      MyToast('Нужно назначить пользователя', false)
    }
  }

  const handleAddDeadLine = () => {
    setIsAddData(!isAddData)
    setIsOpenCalendar(false)
    if(isAddData) {
      setValueDate(null)
    }
  }


  return (
    <div className={cn(styles.modalContainer, {
      [styles.close]: !isVisible,
      [styles.blackTheme]: colorTheme === 'black' || colorTheme === 'space',
      [styles.classicTheme]: colorTheme === 'classic'
    })} onClick={() => clearAndCloseModal()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.btnClose} onClick={() => clearAndCloseModal()}>X</button>
        </div>
        <Input className={styles.nameField} type='text' placeholder="Загаловок" value={valueName} onChange={(e) => setValueName(e.target.value)}/>
        {type === 'task' && <textarea placeholder="Описание" className={styles.descriptionField} value={valueDescription} onChange={(e) => setValueDescription(e.target.value)}></textarea>}
        {type === 'task' && 
          <div className={styles.containerBtnDeadLine}>
            <Button onClick={() => handleAddDeadLine()}>{!isAddData ? 'Добавить' : 'Убрать'} дату дедлайна</Button>
            {isAddData && <Button onClick={() => setIsOpenCalendar(!isOpenCalendar)}>{!isOpenCalendar ? 'Открыть' : 'Закрыть'} календарь</Button>}
          </div>
        }
        {isAddData && type === 'task' && <div className={styles.textDeadLine}>Дата дедлайна: {valueDate ? convertDate(String(valueDate)) : '-'}</div>}
        <div className={styles.calendar} style={{display: !isOpenCalendar ? 'none' : 'block'}}>
          <Calendar onChange={(e: any) => setValueDate(e)} value={valueDate}/>
        </div>
        {type === 'task' &&
        <div className={styles.containerAddUserSelect}>
          <span>Добавить пользователя:</span>
          <MySelect options={usersOnTheBoard} setValue={setUserOnTheBoard} value={userOnTheBoard}/>
        </div>}
        <Button className={styles.btnCreate} onClick={() => handleCreate()}>Создать</Button>
      </div>
    </div>
  )
}

export default Modal