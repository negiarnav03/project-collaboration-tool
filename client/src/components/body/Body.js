import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './auth/Login';
import Register from './auth/Register';
import ActivationEmail from './auth/ActivationEmail';
import NotFound from '../utils/notFound/NotFound';
import AdminNotFound from '../utils/notFound/AdminNotFound';
import ForgotPassword from '../body/auth/ForgotPassword';
import ResetPassword from '../body/auth/ResetPassword';
import Home from '../body/home/Home';
import UploadProject from '../body/projects/UploadProject';
import Projects from '../body/projects/Projects';
import JoinProject from '../body/joinproject/JoinProjectProfile';
import Contact from './about/Contact';
import About from './about/About';
import InputUserProfileInfo from './profile/InputUserProfileInfo';
import UserProfile from './profile/UserProfile';
import MyProjects from './myprojects/MyProjects';
import ViewProject from './myprojects/ViewProject';
import UpdateProject from './myprojects/UpdateProject';
import Admin from './admin/Admin';
import UserResetPassword from './auth/UserResetPassword';

import { useSelector } from 'react-redux';

function Body() {
    const auth = useSelector(state => state.auth);
    const { isLogged, isAdmin } = auth;
    return (
        <div>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />
                <Route path="/forgotpassword" component={isLogged ? NotFound : ForgotPassword} exact />
                <Route path="/user/resetpassword/:token" component={isLogged ? NotFound : ResetPassword} exact />
                <Route path="/resetpassword" component={isLogged ? UserResetPassword : NotFound} exact />
                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
                <Route path="/dashboard" component={isLogged ? UserProfile : NotFound} exact />
                <Route path="/projects/postproject" component={isLogged ? UploadProject : NotFound} exact />
                <Route path="/joinproject/:id" component={isLogged ? JoinProject : NotFound} exact />
                <Route path="/projects" component={Projects} exact />
                <Route path="/about" component={About} exact />
                <Route path="/contact" component={Contact} exact />
                <Route path="/profile" component={isLogged ? InputUserProfileInfo : NotFound} exact />
                <Route path="/myprojects" component={isLogged ? MyProjects : NotFound} exact />
                <Route path="/viewproject/:id" component={isLogged ? ViewProject : NotFound} exact />
                <Route path="/updateproject/:id" component={isLogged ? UpdateProject : NotFound} exact />
                <Route path="/admin" component={isAdmin ? Admin : AdminNotFound} exact />
            </Switch>
        </div>
    );
}

export default Body;