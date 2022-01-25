import './App.css';
import {Route, Routes} from "react-router-dom";
import TextCardTablesPage from "./pages/TextCardTablesPage";
import GraphicalCardTablePage from "./pages/GraphicalCardTablePage";
import TextCardTablePage from "./pages/TextCardTablePage";

function App({signOut}) {
    return (
        <Routes>
            <Route path="/" element={<TextCardTablesPage signOut={signOut}/>}/>
            <Route path="/table" element={<TextCardTablePage/>}/>
            <Route path="/gtable" element={<GraphicalCardTablePage/>}/>
        </Routes>
    );
}

export default App;
