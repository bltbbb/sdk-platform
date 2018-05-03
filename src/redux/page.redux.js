const PAGESIZE_CHANGE = 'PAGESIZE_CHANGE'
const PAGE_CHANGE = 'PAGE_CHANGE'

//reducer
const initState = {
    pageSize: 10,
    currentPage: 1,
    menu: ['/RealtimeData','/HistoryTrend','/LoginLog']
}
export function pagechange(state = initState, action) {
    switch (action.type) {
        case PAGESIZE_CHANGE:
            return { ...state, ...action.payload }
        case PAGE_CHANGE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

//action
export function changePageSize(data) {
    return { type: PAGESIZE_CHANGE, payload: data }
}

export function changePage(data) {
    return { type: PAGE_CHANGE, payload: data }
}