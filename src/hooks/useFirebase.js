import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();


    const googleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                setUser(result);
            })
            .catch(error => {
                setError(error.message);
            })
    }

    useEffect(() => {
        // observe current user
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in,
                setUser(user);
            } else {
                setError('user is signed out');
            }
        });
    }, [auth])

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser({});
            }).catch((error) => {
                setError(error);
            });
    }

    return {
        user,
        error,
        googleSignIn,
        userSignOut
    }
}

export default useFirebase;