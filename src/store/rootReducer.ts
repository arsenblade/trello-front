import {reducer as userReducer} from './user/user.slice'
import {reducer as themeReducer} from './theme/theme.slice'
import {reducer as boardReducer} from './board/board.slice'
import {reducer as modalReducer} from './modal/modal.slice'

export const reducers = {
  user: userReducer,
  theme: themeReducer,
  board: boardReducer,
  modal: modalReducer
}