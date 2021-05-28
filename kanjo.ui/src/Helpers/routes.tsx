import { Switch, Route } from 'react-router-dom';
import { User } from '../Helpers/Types/UserTypes';
import NotFound from '../Views/NotFound';
import Home from '../Views/Home';
import Emotions from '../Views/Emotions';
import Entry from '../Views/Entry';
import Examine from '../Views/Examine';
import SingleEmotion from '../Views/SingleEmotion';

type RoutesProps = {
    user: User | null;
}

export default function Routes({ user }: RoutesProps): JSX.Element {
    return (
        <Switch>
            <Route exact path="/" component={() => <Home />}/>
            <Route exact path="/emotions" component={() => <Emotions user={user}/>}/>
            <Route exact path="/entry" component={() => <Entry />}/>
            <Route exact path="/examine" component={() => <Examine />}/>
            <Route exact path="/single-emotion" component={() => <SingleEmotion user={user}/>}/>
            <Route component={NotFound}/>
        </Switch>
    );  
}