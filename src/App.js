import React from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignupStep1 from "./pages/signup/SignupStep1";
import SignupStep2 from "./pages/signup/SignupStep2";
import SignupStep3 from "./pages/signup/SignupStep3";
import SignupStep4 from "./pages/signup/SignupStep4";
import SignupStep5 from "./pages/signup/SignupStep5";
import Verification from "./pages/Verification";
import FindAccount from "./pages/findAccount/FindAccount";
import RedirectURI from "./pages/auth/RedirectURI";
import NickNameScreen from "./pages/NickNameScreen";
import FindAccountResult from "./pages/findAccount/FindAccountResult";
import CreateSquad from "./pages/squad/CreateSquad";
import Main from "./pages/Main";
import { useAppContext } from "./contexts/AppContext";
import CreateFeed from "./pages/feeds/CreateFeed";
import UpdateFeed from "./pages/feeds/UpdateFeed";
import CreateChatting from "./pages/chat/CreateChatting";
import Chatting from "./components/chatting/Chatting";
import Login from "./pages/Login";

function App() {
  const { token } = useAppContext();

  return (
    <Routes>
      {!token ? (
        <>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Navigate to="/feed/new" replace />} /> */}
          <Route path="/SignupStep1" element={<SignupStep1 />} />
          <Route path="/SignupStep2" element={<SignupStep2 />} />
          <Route path="/SignupStep3" element={<SignupStep3 />} />
          <Route path="/SignupStep4" element={<SignupStep4 />} />
          <Route path="/auth/signin/naver" Component={<RedirectURI />}></Route>
          <Route path="/SignupStep5" element={<SignupStep5 />} />
          <Route path="Verification" element={<Verification />} />
          <Route path="FindAccount" element={<FindAccount />} />
          <Route path="NickNameScreen" element={<NickNameScreen />} />
          <Route path="FindAccountResult/:token" element={<FindAccountResult />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Main />} />
          <Route path="/feed/new" element={<CreateFeed />} />
          <Route path="/squad/new" element={<CreateSquad />} />
          <Route path="/feed/edit/:id" element={<UpdateFeed />} />
          <Route path="/chatting/new" element={<CreateChatting />} />
          <Route path="/chatting" element={<Chatting />} />
        </>
      )}
    </Routes>
  );
}

export default App;