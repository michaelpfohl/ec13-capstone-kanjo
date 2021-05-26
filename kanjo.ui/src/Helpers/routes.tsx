import { Switch, Route } from 'react-router-dom';

import NotFound from '../Views/NotFound';
import Home from '../Views/Home';

export default function Routes(): JSX.Element {
    return (
        <Switch>
            <Route exact path="/" component={() => <Home />}/>
            <Route exact path="/new-entry"/>
            <Route component={NotFound}/>
        </Switch>
    );  
}