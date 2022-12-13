import Navigation from "./components/screen/Navigation/Navigation";
import AppRouter from "./router/AppRouter";
import './styles/global.scss'
import './styles/react-select.scss'
import cn from 'classnames'
import { useTypedSelector } from "./hooks/useTypedSelector";
import Modal from "./components/screen/Modal/Modal";
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import MyToastContainer from "./components/ui/MyToast/MyToastContainer";



function App() {
  const {colorTheme} = useTypedSelector(state => state.theme)

  return (
    <div className={cn('app', {
      'blackTheme': colorTheme === 'black',
      'classicTheme': colorTheme === 'classic',
      'spaceTheme': colorTheme === 'space',
    })}>
      <Navigation />
      <AppRouter />
      <Modal/>
      <MyToastContainer />
    </div>
  );
}

export default App;
