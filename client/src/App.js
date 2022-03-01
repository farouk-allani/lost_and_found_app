import "./App.css";
import { useDispatch } from "react-redux";
import { current } from "./JS/actions/user";
import { useEffect } from "react";
import Appbar from "./components/Appbar/Appbar";
import Body from './components/Body/Body' ;
import Footer from "./components/Footer/Footer";

function App() {
 
 
  return (
    <div className="App">
      <Appbar />
       <Body/>
      <Footer />
    </div>
  );
}

export default App;
