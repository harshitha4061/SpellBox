import React, { useState, useEffect, useRef } from 'react';
import { db } from "../config/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table2 = () => {
    const [houseCounts, setHouseCounts] = useState({});
    const hasFetched = useRef(false); 

    const fetchData = async () => {
        const docRef = doc(db, "Winner", import.meta.env.VITE_FIREBASE_DOCID2);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setHouseCounts(docSnap.data());
        } else {
            console.log("No such document!");
        }
    };

    useEffect(() => {
        if (!hasFetched.current) {
            fetchData();
            hasFetched.current = true; 
        }
    }, []);

    const setValue = async (house) => {
        const docRef = doc(db, "Winner", import.meta.env.VITE_FIREBASE_DOCID2);

        await updateDoc(docRef, {
            [house]: (houseCounts[house] || 0) + 1
        });

        setHouseCounts(prev => ({
            ...prev,
            [house]: (prev[house] || 0) + 1
        }));

        toast.success(`${house} vote counted!`);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                🏆 Hogwarts Winner Leaderboard
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

            <div className="flex flex-wrap gap-4 mt-5">
                <button onClick={() => setValue("Gryffindor 🦁")} className="border rounded-2xl text-lg w-32 bg-black text-white px-4 py-2 hover:text-black hover:border hover:bg-white">Gryffindor 🦁</button>
                <button onClick={() => setValue("Hufflepuff 🦡")} className="border rounded-2xl text-lg w-32 bg-black text-white px-4 py-2 hover:text-black hover:border hover:bg-white">Hufflepuff 🦡</button>
                <button onClick={() => setValue("Ravenclaw 🦅")} className="border rounded-2xl text-lg w-32 bg-black text-white px-4 py-2 hover:text-black hover:border hover:bg-white">Ravenclaw 🦅</button>
                <button onClick={() => setValue("Slytherin 🐍")} className="border rounded-2xl text-lg w-32 bg-black text-white px-4 py-2 hover:text-black hover:border hover:bg-white">Slytherin 🐍</button>
            </div>
        </div>
    );
};

export default Table2;
