import { Switch, Route } from 'react-router-dom';

import NotFound from '../Views/NotFound';
import Home from '../Views/Home';
import Emotion from '../Views/Emotion';
import Entry from '../Views/Entry';
import Examine from '../Views/Examine';

export default function Routes(): JSX.Element {
    return (
        <Switch>
            <Route exact path="/" component={() => <Home />}/>
            <Route exact path="/emotion" component={() => <Emotion />}/>
            <Route exact path="/entry" component={() => <Entry />}/>
            <Route exact path="/examine" component={() => <Examine />}/>
            <Route component={NotFound}/>
        </Switch>
    );  
}