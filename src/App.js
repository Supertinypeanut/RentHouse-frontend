import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

// 导入组件
import Home from './pages/Home'

function App() {
  return (
    // 组件路由
    <Router>
      <Switch>
      <Route path="/" exact render={ ()=> <Redirect to="/home" /> }/>
      <Route path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
