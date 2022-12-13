import { themeSlice } from './theme/theme.slice'
import { modalSlice } from './modal/modal.slice'
import { boardSlice } from './board/board.slice'
import * as userActions from './user/user.actions'
import * as boardActions from './board/board.actions'

export const allActions = {
  ...userActions,
  ...themeSlice.actions,
  ...boardActions,
  ...modalSlice.actions,
  ...boardSlice.actions
}