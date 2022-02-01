import {createContext} from "react";
import {Auth} from 'aws-amplify';

export const AuthContext = createContext()

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

function AuthProvider(props) {
    const state = {
        signOut: signOut
    }

    return <AuthContext.Provider value={state}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthProvider;