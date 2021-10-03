import { Switch, Route } from 'react-router-dom';
import Auth from './Components/Auth/Auth'
import Main from './Components/Main/Main'
import UserSettings from './Components/UserSettings/UserSettings'

function App() {
  return (
    <Switch>
      <Route path='/' exact component={Main} />
      <Route path="/auth" component={Auth} />
      <Route path="/settings" component={UserSettings} />
    </Switch>
  )
}



export default App;
