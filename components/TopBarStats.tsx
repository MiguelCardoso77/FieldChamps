import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { auth, db } from "@/firebaseConfig";
import TopBar from "@/components/TopBar";

const TopBarStats = () => {
    const [level, setLevel] = useState(0);
    const [progress, setProgress] = useState(0);
    const [games, setGames] = useState(0);
    const [loading, setLoading] = useState(true);

    const userId = auth.currentUser?.uid;

    useEffect(() => {
        const userRef = ref(db, `/users/${userId}/stats`);
        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setLevel(data.level || 0);
                setProgress(data.progress || 0);
                setGames(data.gamesPlayed || 0);
            } else {
                setLevel(0);
                setProgress(0);
                setGames(0);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <TopBar level={level} progress={progress} games={games} />
    );
};

export default TopBarStats;
