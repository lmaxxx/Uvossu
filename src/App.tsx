import { Switch, Route } from 'react-router-dom';
import Auth from './Components/Auth/Auth'
import Main from './Components/Main/Main'

function App() {
  return (
    <Switch>
      <Route path='/' exact component={Main} />
      <Route path="/auth" component={Auth} />
    </Switch>
  )


}



export default App;
