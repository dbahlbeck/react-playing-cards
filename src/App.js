import './App.css';
import {Route, Routes} from "react-router-dom";
import TextCardTablesPage from "./pages/TextCardTablesPage";
import GraphicalCardTablePage from "./pages/GraphicalCardTablePage";
import TextCardTablePage from "./pages/TextCardTablePage";
import React from 'react';
import CardAppBar from "./components/CardAppBar";
import {Authenticator} from "@aws-amplify/ui-react";

function App() {
    return (
        <React.Fragment>
            <Authenticator>
                {({signOut, user}) => (
                    <main>
                        <CardAppBar signOut={signOut}/>
                        <Routes>
                            <Route path="/tables" element={<TextCardTablesPage signOut={signOut}/>}/>
                            <Route path="/table" element={<TextCardTablePage/>}/>
                            <Route path="/gtable" element={<GraphicalCardTablePage/>}/>
                        </Routes>
                    </main>
                )}

            </Authenticator>
        </React.Fragment>
    );
}

export default App;
