import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncidents from './pages/NewIncidents';

export default function Routes() {
    return (
       <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Logon} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/incidents/new" component={NewIncidents} />  
        </Switch>
       </BrowserRouter> 
    );
}

/*
BrowserRouter = Precisa estar a volta de tudo 
Switch = Apenas uma rota seja chamada por vez
exact = Tem que ser exatamente do jeito que esta escrito */