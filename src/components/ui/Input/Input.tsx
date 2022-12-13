import React, { FC, InputHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './Input.module.scss'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {}


const Input:FC<IInput> = ({className, ...rest}) => {
  return (
    <input className={cn(styles.input, className)} {...rest}/>
  )
}

export default Input