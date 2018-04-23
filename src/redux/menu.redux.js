const MENU_CLICK = 'MENU_CLICK'

//reducer
const initState = {
    currentKey: '',
    fatherKey: ''
}
export function menuKey(state=initState,action){
    switch (action.type) {
        case MENU_CLICK:
            return {...state,...action.payload}
        default:
           return state
    }
}

//action
export function getMenuKey(data){
    return {type:MENU_CLICK,payload:data}
}