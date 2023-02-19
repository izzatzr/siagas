import { LOGIN_SUCCESS, LOGOUT } from "../types"

export const signIn = () => (dispatch) => {
    return dispatch({
        type : LOGIN_SUCCESS
    });
}

export const signOut = () => (dispatch) => {
    return dispatch({
        type : LOGOUT
    })
}