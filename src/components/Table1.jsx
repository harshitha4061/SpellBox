import React,{useState,useEffect} from 'react';
import {db} from "../config/firebase"
import {getDoc,doc} from "firebase/firestore";

const Table1 = () => {
    const [houseCounts, setHouseCounts] = useState({});
  
    useEffect(() => {
      const fetchData = async () => {
        const docRef = doc(db, "Count", import.meta.env.VITE_FIREBASE_DOCID1);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          setHouseCounts(docSnap.data());
        } else {
          console.log("No such document!");
        }
      };
  
      fetchData();
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