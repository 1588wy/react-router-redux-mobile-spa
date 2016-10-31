import * as actionTypes from '../constants/types'
import { get } from '../fetch/request'

//获取广告数据列表，promise形式
export const getUserInfo = () => {
    return {
        type: actionTypes.GET_USERINFO,
        promise: get('/api/user')
    }
}

// 更新 global
export function addressUpdate(data) {
    return {
        type: actionTypes.ADRESS_UPDATE,
        data
    }
}

