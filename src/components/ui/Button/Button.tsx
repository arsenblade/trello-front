import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import cn from 'classnames'
import styles from './Button.module.scss'

interface IInput extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}


const Button:FC<IInput> = ({className, children, ...rest}) => {
  return (
    <button className={cn(styles.btn, className)} {...rest}>{children}</button>
  )
}

export default Button