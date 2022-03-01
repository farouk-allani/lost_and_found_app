
import React from 'react';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../../router/PrivateRoute";
import AdminRoute from "../../router/AdminRoute";
import Home from "../../pages/Home/Home";
import SignUP from "../../pages/SignUp/SignUP";
import SignIn from "../../pages/SignIn/SignIn";
import Profile from "../../pages/Profile/Profile";
import Errors from "../../pages/Errors/Errors";
import CreateProfile from "../../pages/CreateProfile/CreateProfile";
import PostDetails from "../../pages/PostDetails/PostDetails";
import AddPost from "../../pages/AddPost/AddPost";
import EditPost from "../../pages/EditPost/EditPost";
import CommentList from "../../pages/CommentList/CommentList";
import Comment from "../Comment/Comment";
import DemandList from "../../pages/DemandList/DemandList";
import Demand from "../Demand/Demand";
import Posts from "../../pages/Posts/Posts";
import Admin from "../../pages/Admin/Admin";
import ProfileList from "../../pages/ProfileList/ProfileList";
import Maps from "../Maps/Maps";
import Chart from "../Chart/Chart";


export const Body = () => {
  return (
    <div>

<Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signUp" component={SignUP} />
        <Route path="/signIn" component={SignIn} />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/maps" component={Maps} />
        <PrivateRoute
          exact
          path={["/myprofile", "/profile/:id"]}
          component={Profile}
        />
        <PrivateRoute
          path={["/createProfile", "/profile/edit/:id"]}
          component={CreateProfile}
        />
        <PrivateRoute exact path="/post/edit/:id" component={EditPost} />
        <PrivateRoute exact path="/post/add" component={AddPost} />
        <PrivateRoute
          exact
          path="/post/comment/edit/:id/:id"
          component={Comment}
        />
        <PrivateRoute
          exact
          path="/post/comment/of/:id"
          component={CommentList}
        />
        <PrivateRoute path="/post/:id" component={PostDetails} />
        <PrivateRoute exact path="/demand/about/:id" component={DemandList} />
        <PrivateRoute exact path="/demand/edit/:id/:id" component={Demand} />
        <AdminRoute exact path="/admin" component={Admin} />
        <AdminRoute exact path="/admin/profiles" component={ProfileList} />
        <AdminRoute exact path="/admin/addchart" component={Chart} />
        <Route path="/*" component={Errors} />
      </Switch>
    </div>
  )
}
export default Body
