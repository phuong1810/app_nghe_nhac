const {createSlice} = require('@reduxjs/toolkit')

const counterSlice = createSlice({
    name: 'counter',
    initialState: 0, //Gia tri khoi tao
    reducers: { //Chi dinh cac hanh dong co the xay ra
        increase(state,action){
            return state + 1
        },
        decrease(state,action){
            return state - 1
        }
    }
})

const {actions, reducer} = counterSlice;
export const { increase, decrease } = actions //named export
export default reducer; //default export