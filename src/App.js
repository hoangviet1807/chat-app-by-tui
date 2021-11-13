import "./App.css";
import SignInSide from "./components/Login";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import AuthProvider from "./context/authProvider";
import AddRoom from "./components/Modal/AddRoom";
import AppProvider from "./context/appProvider";
import InviteUser from "./components/Modal/InviteUser";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route component={SignInSide} path="/login" />
            <Route component={ChatRoom} path="/" />
          </Switch>
          <AddRoom />
          <InviteUser />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

// eslint-disable-next-line
