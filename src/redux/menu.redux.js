const MENU_CLICK = 'MENU_CLICK'
const MENU_DATA = 'MENU_DATA'

//reducer
const initState = {
    currentKey: '',
    fatherKey: '',
    menuData: []
}
export function menuKey(state=initState,action){
    switch (action.type) {
        case MENU_CLICK:
            return {...state,...action.payload}
        case MENU_DATA:
            return {...state,menuData:action.payload}
        default:
           return state
    }
}

//action
export function getMenuKey(data){
    return {type:MENU_CLICK,payload:data}
}

export function getMenuData(data){
    return {type:MENU_DATA,payload:data}
}