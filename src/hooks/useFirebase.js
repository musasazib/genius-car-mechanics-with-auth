import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";

const auth = getAuth();

const useFirebase = () => {
    const [users, setUsers] = useState({});

    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                setUsers(result.user);
        })
    }

    // Observe user state change 
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                setUsers(user);
            }
            else {
                setUsers({})
            }
        })
        return () => unsubscribed;
    },[])

    const logOut = () => {
        signOut(auth)
            .then(() => {
                
            });
    }
    return {
        users,
        signInUsingGoogle,
        logOut
    }

}

export default useFirebase;