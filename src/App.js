import './App.css';
import {Route, Routes} from "react-router-dom";
import TextCardTablesPage from "./pages/TextCardTablesPage";
import GraphicalCardTablePage from "./pages/GraphicalCardTablePage";
import TextCardTablePage from "./pages/TextCardTablePage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<TextCardTablesPage/>}/>
            <Route path="/table" element={<TextCardTablePage/>}/>
            <Route path="/gtable" element={<GraphicalCardTablePage/>}/>
        </Routes>
    );
}

export default App;
