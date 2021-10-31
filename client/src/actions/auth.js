import * as api from '../api/index';
import { AUTH } from '../constans/actionTypes';

export const signin = (formData, history) => async (dispatch) => {  //this async use fromredux-thunk
    try {
        const { data } = await api.signIn(formData); // this {data} is comming from database. that is very amazing

        dispatch({ type: AUTH, data });

        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, history) => async (dispatch) => {  //this async use fromredux-thunk
    try {
        const { data } = await api.signUp(formData); // this {data} is comming from database. that is very amazing

        dispatch({ type: AUTH, data });

        history.push('/');
    } catch (error) {
        console.log(error);
    }
};