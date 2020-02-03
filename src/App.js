import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

// 导入组件
import Home from './pages/Home'
import Map from './pages/Map'
import Search from './pages/Search'
import CityList from './pages/CityList'
import HouseDetail from './pages/HouseDetail'

function App() {
  return (
    // 组件路由
    <Router>
      <Switch>
      <Route path="/" exact render={ ()=> <Redirect to="/home" /> }/>
      <Route path="/home" component={Home} />
      <Route path="/map" component={Map} />
      <Route path="/search" component={Search} />
      <Route path="/cityList" component={CityList} />
      <Route path="/houseDetail" component={HouseDetail} />
      </Switch>
    </Router>
  );
}

export default App;
