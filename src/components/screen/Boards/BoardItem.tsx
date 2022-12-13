import React, { FC } from 'react'
import { useNavigate } from 'react-router'
import { useActions } from '../../../hooks/useActions'
import { IBoard } from '../../../types/board.types'
import styles from './Boards.module.scss'

interface BoardItemProps {
  board: IBoard
}

const BoardItem:FC<BoardItemProps> = ({board}) => {
  const {deleteBoard} = useActions()
  const navigate = useNavigate()

  return (
    <div className={styles.boardItem} onClick={() => navigate(`board/${board.id}`)}>
      <h2>{board.titleBoard}</h2>
      <button className={styles.closeBtn} onClick={(e) => {
        e.stopPropagation()
        deleteBoard(board.id)
      }}>X</button>
    </div>
  )
}

export default BoardItem