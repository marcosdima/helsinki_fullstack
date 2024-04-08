export const filterChange = newFilter => {
    return {
        type: 'CHANGE',
        payload: { newFilter }
    }
}

const reducer = (state='', action) => {
    switch(action.type) {
    case 'CHANGE': return action.payload.newFilter.toLowerCase()
    default: return state
    }
}

export default reducer