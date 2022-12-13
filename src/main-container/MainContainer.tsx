import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store/store';

interface MainContainerProps {
  children: ReactNode
}

const MainContainer:FC<MainContainerProps> = ({children}) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
      {children}
      </Provider>
    </BrowserRouter>
  )
}

export default MainContainer