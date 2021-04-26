import './App.scss';
import { Nav } from './Components/Nav/Nav';
import { Question } from './Components/Question/Question';
import { AnswerModal } from './Modals/AnswerModal/AnswerModal';
import { AskModal } from './Modals/AskModal/AskModal';
import { LoginScreen } from './Screens/LoginScreen/LoginScreen';
import { QuestionScreen } from './Screens/QuestionScreen/QuestionScreen';
import { QuestionsScreen } from './Screens/QuestionsScreen/QuestionsScreen';
import { RegisterScreen } from './Screens/RegisterScreen/RegisterScreen';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from './State/ModalState/ModalProvider';
import axios from 'axios'
import { AuthContext } from './State/AuthState/AuthProvider';
import { Loading } from './Components/Loading/Loading';
import { api } from './Util/api';
import { UserModal } from './Modals/UserModal/UserModal';
import { MyQuestionsScreen } from './Screens/MyQuestionsScreen/MyQuestionsScreen';

function App() {
  const {modalState} = useContext(ModalContext)
  const {authDispatch} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  //creates an Error when user does not have an authentication cookie as it is supposed to
  const checkIfLoggedIn = async() => {
    setLoading(true)
    await axios.get(api + "auth", {
      withCredentials: true
    }).then(
      async(res) => {
        const data = res.data
        if(data.Error){
          setLoading(false)
          return console.log(data.Error)
        }
        await authDispatch({type: "authenticate", data: data})
        setLoading(false)
        return
      }
    )
  }

  useEffect(() => {
    checkIfLoggedIn()
  }, [])


  return (
    <div className="App">
      <Router>
        <Nav/>
        <Switch>
          <Route path="/" exact component={QuestionsScreen}/>
          <Route path="/login" exact component={LoginScreen}/>
          <Route path="/register" exact component={RegisterScreen}/>
          <Route path="/question/:id" component={QuestionScreen}/>
          <Route path="/user/:username" exact component={MyQuestionsScreen}/>
        </Switch>
        { modalState.userModal && <UserModal/>}
      </Router>
      {modalState.questionModal ? <AskModal/> : null}
    </div>
  );
}

export default App;
