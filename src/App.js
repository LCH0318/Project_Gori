import React from "react";
import  { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import redirect from "react-router-dom";
import Login from "./pages/Login";
import SignupStep1 from "./pages/SignupStep1";
import SignupStep2 from "./pages/SignupStep2";
import SignupStep3 from "./pages/SignupStep3";
import SignupStep4 from "./pages/SignupStep4";
import SignupStep5 from "./pages/SignupStep5";
import Verification from "./pages/Verification";
import FindAccount from "./pages/FindAccount";
import RedirectURI from "./pages/auth/RedirectURI";
import NickNameScreen from "./pages/NickNameScreen";
import FindAccountResult from "./pages/FindAccountResult"
import CreateSquad from "./pages/CreateSquad"
import Main from "./pages/Main"
import HomeHeader from "./components/home_header/HomeHeader";
import Sesion from "./components/Sesion";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/SignupStep1" element={<SignupStep1 />} />
        {/* <Route path=":name" element={<SignupStep2/>}/> */}
        <Route path="/SignupStep2" element={<SignupStep2 />} />
        <Route path="/SignupStep3" element={<SignupStep3 />} />
        {/* <Route path=":birth" element={<SignupStep3/>}/>
        <Route path=":gender" element={<SignupStep4/>}></Route> */}
        <Route path="SignupStep4" element={<SignupStep4/>}/>
        <Route path="/auth/signin/naver" Component={<RedirectURI/>}></Route>
        <Route path="SignupStep5" element={<SignupStep5/>}/>
        <Route path="Verification" element={<Verification/>}/>
        <Route path="FindAccount" element={<FindAccount/>}/>
        <Route path="NickNameScreen" element={<NickNameScreen/>}/>
        <Route path="FindAccountResult/:token" element={<FindAccountResult/>}/>
        <Route path="CreateSquad" element={<CreateSquad/>}/>
        <Route path="Main" element={<Main/>}/>
        <Route path="HomeHeader" element={<HomeHeader/>}/>
        <Route path="Sesion" element={<Sesion/>}/>
      </Routes>
    </Router>
  );  
}

export default App;