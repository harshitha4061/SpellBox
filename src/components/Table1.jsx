import React, { useState, useEffect, useRef } from 'react';
import { db } from "../config/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table1 = () => {
    const [houseCounts, setHouseCounts] = useState({});
    const hasFetched = useRef(false);  
    const isFirstLoad = useRef(true);  

    const fetchInitialData = async () => {
        const docRef = doc(db, "Count", import.meta.env.VITE_FIREBASE_DOCID1);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setHouseCounts(docSnap.data());
        } else {
            console.log("No such document!");
            toast.error("Failed to fetch initial house counts!");
        }
    };

    useEffect(() => {
        if (!hasFetched.current) {
            fetchInitialData();
            hasFetched.current = true;
        }

        const docRef = doc(db, "Count", import.meta.env.VITE_FIREBASE_DOCID1);

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setHouseCounts(docSnap.data());

                if (!isFirstLoad.current) {
                    toast.success("House counts updated!");
                } else {
                    isFirstLoad.current = false; 
                }
            } else {
                console.log("No such document!");
                toast.error("Failed to fetch house counts!");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-center py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                🏆 Hogwarts Sorting Leaderboard
            </h2>

            <div className="w-full max-w-md mx-auto overflow-x-auto">
                <table className="w-full border border-gray-300 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-800 text-white text-lg">
                            <th className="py-3 px-4">House</th>
                            <th className="py-3 px-4">Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(houseCounts).map((house) => (
                            <tr key={house} className="bg-gray-100 border-b hover:bg-gray-200">
                                <td className="py-3 px-4 text-center font-semibold">{house}</td>
                                <td className="py-3 px-4 text-center font-semibold">{houseCounts[house]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table1;
