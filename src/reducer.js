import { combineReducers } from 'redux'

import { menuKey } from './redux/menu.redux'
import { pagechange } from './redux/page.redux'

export default combineReducers({menuKey,pagechange})