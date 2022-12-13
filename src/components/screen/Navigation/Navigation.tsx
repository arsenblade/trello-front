import { useEffect, useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { useAuth } from '../../../hooks/useAuth'
import Button from '../../ui/Button/Button'
import MySelect from '../../ui/Select/Select'
import { IOptions } from '../../ui/Select/select.interface'
import styles from './Navigation.module.scss'
import cn from 'classnames'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { Link, useNavigate } from 'react-router-dom'
import { userService } from '../../../service/user/user'
import { MyToast } from '../../ui/MyToast/MyToast'
import { getRandomAvatar } from '../../../utils/randomAvatar'

const optionsTheme: IOptions[] = [
  {
    value: 'classic',
    label: 'Класическая'
  },
  {
    value: 'black',
    label: 'Темная'
  },
  {
    value: 'space',
    label: 'Космос'
  }
]

const Navigation = () => {
  const {user, isLoading} = useAuth()
  const {logout} = useActions()
  const {changeColor, addUserOnBoard} = useActions()
  const {colorTheme} = useTypedSelector(state => state.theme)
  const {currentBoard} = useTypedSelector(state => state.board)
  const [sortType, setSortType] = useState({value: 'black', label: 'Темная'})
  const navigate = useNavigate()
  const [isHiddenSelect, setIsHiddenSelect] = useState(true)
  const [usersNotOnTheBoard, setUsersNotOnTheBoard] = useState<{value: string, label: string}[]>([])
  const [userNotOnTheBoard, setUserNotOnTheBoard] = useState<{value: string, label: string}>({value: '', label: ''})

  useEffect(() => {
    changeColor(sortType.value)
  }, [sortType])

  useEffect(() => {    
    fetchUsers()
    if(!currentBoard) {
      setIsHiddenSelect(true)
    }
  }, [currentBoard])


  const fetchUsers = async () => {
    if(user && currentBoard) {
      const response = await userService.getUsersNotOnTheBoard(currentBoard.id)
      setUsersNotOnTheBoard(response)
    }
  }

  const handleAddUserOnBoard = async () => {
    if(currentBoard && userNotOnTheBoard.value !== '') {
      addUserOnBoard({userId: Number(userNotOnTheBoard.value), boardId: currentBoard.id})
      setUserNotOnTheBoard({value: '', label: ''})
      setIsHiddenSelect(true)
      const response = await userService.getUsersNotOnTheBoard(currentBoard.id)
      setUsersNotOnTheBoard(response)
    }
    else if(userNotOnTheBoard.value === '') {
      MyToast('Нужно назначить пользователя', false)
    }
  }

  if(isLoading) {
    return (
      <div className={cn(styles.navigation, {
        [styles.blackTheme]: colorTheme === 'black' || colorTheme === 'space',
        [styles.classicTheme]: colorTheme === 'classic'
      })}>

      </div>)
  }

  return (
  !user ? 
    <div className={cn(styles.navigation, {
      [styles.blackTheme]: colorTheme === 'black' || colorTheme === 'space',
      [styles.classicTheme]: colorTheme === 'classic'
    })}>
      <span className={styles.selectLabel}>Тема: </span>
      <MySelect options={optionsTheme} setValue={setSortType} value={sortType} />
    </div> :
    <div className={cn(styles.navigation, {
      [styles.blackTheme]: colorTheme === 'black' || colorTheme === 'space',
      [styles.classicTheme]: colorTheme === 'classic'
    })}>
      {currentBoard && <Link to='/'><Button className={styles.backBtn}>Назад</Button></Link>}
      <span className={styles.selectLabel}>Тема: </span>
      <div className={styles.containerSelectTheme}>
        <MySelect options={optionsTheme} setValue={setSortType} value={sortType} />
      </div>
      {isHiddenSelect && currentBoard && <Button onClick={() => setIsHiddenSelect(false)}>Добавить пользователя на доску</Button>}
      {!isHiddenSelect && currentBoard && <MySelect options={usersNotOnTheBoard} setValue={setUserNotOnTheBoard} value={userNotOnTheBoard}/>}
      {!isHiddenSelect && currentBoard && <Button className={styles.addUserOnBoard} onClick={() => handleAddUserOnBoard()}>Добавить на доску</Button>}
      <Button className={styles.btnLogout} onClick={() => {
        logout()
        navigate('/login')
      }}>Выйти</Button>
      <div className={styles.containerImgWorker}>
        <div className={styles.userName}>{user.name}</div>
        <img className={styles.imgWorker} src={`/icon-user/${user.avatar}.png`} alt='userIcon' width={32} height={32} />
      </div>
    </div>
  )
}

export default Navigation