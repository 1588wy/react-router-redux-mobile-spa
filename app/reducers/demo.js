import * as actionTypes from '../constants/types'
// import {
//     GET_ADLIST_REQUEST,
//     GET_ADLIST_SUCCESS,
//     GET_ADLIST_FAILURE
// } from '../constants/actionTypes'

const initialState = {
    name: 'demo'
}

export default function demo(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ADLIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_ADLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.json
            }
        case actionTypes.GET_ADLIST_FAILURE:
            return {
                ...state,
                loading: false,
                data: null,
                error: action.error
            }
        default:
            return state
    }
}