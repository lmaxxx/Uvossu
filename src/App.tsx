import { Switch, Route } from 'react-router-dom';
import Auth from './Components/Auth/Auth'
import Main from './Components/Main/Main'
import UserSettings from './Components/UserSettings/UserSettings'
import GroupConstructor from "./Components/GroupConstructor/GroupConstructor";

function App() {
  return (
    <Switch>
      <Route path='/' exact component={Main} />
      <Route path="/auth" component={Auth} />
      <Route path="/settings" component={UserSettings} />
      <Route path="/createGroup"><GroupConstructor newGroup /></Route>
    </Switch>
  )
}



export default App;
