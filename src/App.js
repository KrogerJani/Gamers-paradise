import { NavLink, Link, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import About from "./components/About";
import Error from "./components/Error";
import MainView from "./components/FrontPage";
import GuessingGame from "./components/GuessingGame";
import Register from "./components/Register";
import FindAPair from "./components/FindAPair";
import Lottery from "./components/Lottery";



const Index = () => {


    return (
        <div>
            <Router>
                <Routes>
                    <Route path={'/'} element={<MainView />} />
                    <Route path={'/home'} element={<MainView />} />
                    <Route path={'/about'} element={<About />} />
                    <Route path={'/guessinggame'} element={<GuessingGame />} />
                    <Route path={'/lottery'} element={<Lottery />} />
                    <Route path="/findapair" element={<FindAPair />} />
                    <Route path={'/register'} element={<Register />} />
                    <Route path={'*'} element={<Error />} />
                </Routes>
            </Router>
        </div>


    )
}



export default Index;