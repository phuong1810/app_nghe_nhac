import React from 'react';
import { Link, Route, Switch} from 'react-router-dom';
import {AdminRoute} from './AdminRoute';

export default function AdminRouter(){
    return (
        <div>
            {AdminRoute.map(item =>{
                return <li>
                    <Link to={item.path}>Test</Link>
                </li>
            })}

            <Switch>
                {AdminRoute.map(item =>{
                    return <Route path={item.path}>
                        {item.component}
                    </Route>
                })}
            </Switch>
        </div>
    )
}