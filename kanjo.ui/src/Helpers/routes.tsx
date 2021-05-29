import { Switch, Route } from 'react-router-dom';
import NotFound from '../Views/NotFound';
import Home from '../Views/Home';
import Emotions from '../Views/Emotions';
import Entry from '../Views/Entry';
import Examine from '../Views/Examine';
import SingleEmotion from '../Views/SingleEmotion';

import { EmotionProps } from '../Helpers/Types/EmotionTypes';
import { EntryProps } from '../Helpers/Types/EntryTypes';
import { RoutesProps } from '../Helpers/Types/PropTypes';

export default function Routes({ user, loginClickEvent }: RoutesProps): JSX.Element {
    return (
        <Switch>
            <Route exact path="/" component={() => <Home user={user} loginClickEvent={loginClickEvent}/>}/>
            <Route exact path="/emotions" component={() => <Emotions user={user}/>}/>
            <Route exact path="/entry" component={(props: EntryProps) => <Entry user={user} loginClickEvent={loginClickEvent} entry={props.entry}/>}/>
            <Route exact path="/examine" component={() => <Examine user={user} loginClickEvent={loginClickEvent}/>}/>
            <Route exact path="/single-emotion" component={(props: EmotionProps) => <SingleEmotion{...props}/>}/>
            <Route component={NotFound}/>
        </Switch>
    );  
}