import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

// 导入组件
import Home from './pages/Home'
import Map from './pages/Map'
import Search from './pages/Search'
import CityList from './pages/CityList'
import HouseDetail from './pages/HouseDetail'
import Login from './pages/Login'
import Registe from './pages/Registe'
import Rent from './pages/Rent'
import RentAdd from './pages/Rent/Add'
import RentSearch from './pages/Rent/Search'

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
      <Route path="/houseDetail/:id" component={HouseDetail} />
      <Route path="/login" component={Login} />
      <Route path="/registe" component={Registe} />
      <Route path="/rent" exact component={Rent} />
      <Route path="/rent/add" component={RentAdd} />
      <Route path="/rent/search" component={RentSearch} />
      </Switch>
    </Router>
  );
}

export default App;
