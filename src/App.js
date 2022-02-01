import './App.css';
import {Route, Routes} from "react-router-dom";
import TextCardTablesPage from "./pages/TextCardTablesPage";
import GraphicalCardTablePage from "./pages/GraphicalCardTablePage";
import TextCardTablePage from "./pages/TextCardTablePage";
import React from 'react';
import CardAppBar from "./components/CardAppBar";
import AuthProvider from "./contexts/AuthContext";
import {ThemeProvider} from "@mui/material";
import theme from './theme'
import StartPage from "./pages/StartPage";
function App() {
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}><AuthProvider>
                <main>
                    <CardAppBar/>
                    <Routes>
                        <Route path="/" element={<StartPage/>}/>
                        <Route path="/tables" element={<TextCardTablesPage/>}/>
                        <Route path="/table" element={<TextCardTablePage/>}/>
                        <Route path="/gtable" element={<GraphicalCardTablePage/>}/>
                    </Routes>
                </main>
            </AuthProvider></ThemeProvider>
        </React.Fragment>
    );
}

export default App;
