import React, { useEffect, useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { useAuth } from '../../../hooks/useAuth'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import BoardItem from './BoardItem'
import styles from './Boards.module.scss'
import cn from 'classnames'

const BoardsList = () => {
  const {getBoards, openModal } = useActions()
  const {user, isLoading} = useAuth()
  const {boards} = useTypedSelector(state => state.board)
  const {colorTheme} = useTypedSelector(state => state.theme)
  const [isLoadingBoards, setIsLoadingBoards] = useState(true)


  useEffect(() => {
    if(user && !isLoading) {
      getBoards(user.id)
      setIsLoadingBoards(false)
    }
  }, [isLoading])

  if(isLoadingBoards) {
    return (
      <div className={cn(styles.boardContainer, {
        [styles.blackTheme]: colorTheme === 'black' || colorTheme === 'space',
        [styles.classicTheme]: colorTheme === 'classic'
      })}>
        <h1>Мои доски</h1>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  return (
    <div className={cn(styles.boardContainer, {
      [styles.blackTheme]: colorTheme === 'black' || colorTheme === 'space',
      [styles.classicTheme]: colorTheme === 'classic'
    })}>
      <h1>Мои доски</h1>
      <div className={styles.boardsList}>
        {boards.map(board => <BoardItem key={board.id} board={board} />)}
        <div className={styles.boardAdd} onClick={() => openModal({title: 'Создать доску', type: 'board'})}>
          <h2 className={styles.titleBoardAdd}>Добавить доску</h2>
        </div>
      </div>
    </div>
  )
}

export default BoardsList