import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Details  from './components/details';
import Header from './components/header';
import List from './components/list';
import { authenticateUser, createSession, validateWithLogin, getAccount } from './services';


const RouterIndex = () => {

    useEffect(() => {
        
        (async () => {
            let session = localStorage.getItem('session_id');
            if(!session) {
                const requestToken = await authenticateUser();
                const res = await validateWithLogin(requestToken.data.request_token);
                if(res.data.success === true) {
                    let sessionData = await createSession(res.data.request_token);
                    let account = sessionData.data.session_id && await getAccount(sessionData.data.session_id)
                    sessionData.data.session_id && localStorage.setItem('session_id', sessionData.data.session_id);
                    account.data.id && localStorage.setItem('account_id', account.data.id);
                }  
            }
          })();
    }, [])
    const RenderComponent = ({children}) => {
        return <div>
            <Header/>
            {children}
        </div>
    }

    return <Router>
        <Routes>
            <Route path="/"  element={<RenderComponent><Home/></RenderComponent>} />
            <Route path="/watch-list"  element={<RenderComponent><List/></RenderComponent>}/>
            <Route path="/favorite-list"  element={<RenderComponent><List/></RenderComponent>}/>
            <Route path="/movie/:id"  element={<RenderComponent><Details/></RenderComponent>}/>
        </Routes>

    </Router>
}

export default RouterIndex;