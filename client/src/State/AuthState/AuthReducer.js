export const AuthReducer = (state, action) => {

    switch(action.type){
        case "authenticate":{
            const data = action.data
            return{
                isAuth: true,
                data
            }
        }
        default:{
            return state
        }
    }
}