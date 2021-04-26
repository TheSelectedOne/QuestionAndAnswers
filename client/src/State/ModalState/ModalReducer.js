export const ModalReducer = (state, action) => {

    switch(action.type){

        case "toggleQuestionModal":{
            if(state.questionModal === false){
                return{
                    ...state,
                    questionModal: true
                }
            }
            return{
                ...state,
                questionModal: false
            }
        }

        case "toggleAnswerModal":{
            if(state.answerModal === false){
                return{
                    ...state,
                    answerModal: true
                }
            }
            return{
                ...state,
                answerModal: false
            }
        }

        case "toggleUserModal":{
            if(state.userModal === false){
                return{
                    ...state,
                    userModal: true
                }
            }
            return{
                ...state,
                userModal: false
            }
        }

        default:{
            return state
        }
    }
}