import React, { useState } from 'react';
import {db} from "../config/firebase"
import {updateDoc,doc,getDoc} from "firebase/firestore";

const Header = () => {
  const [h, setH] = useState("");

  const sortHouse = async () => {
    const houses = ["Gryffindor 🦁", "Hufflepuff 🦡", "Ravenclaw 🦅", "Slytherin 🐍"];
    const house = houses[Math.floor(Math.random() * houses.length)];
    setH(house);
    await setValue(house);
  };

  const setValue = async (house) => {
    const docRef = doc(db, "Count", import.meta.env.VITE_FIREBASE_DOCID1);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [house]: docSnap.data()[house] + 1, 
      });
      window.location.reload();
    } else {
      console.error("Document does not exist!");
    }
  };
    
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4 mt-6">
        🧙‍♂️ Welcome to the Hogwarts Sorting Ceremony! 🎩
      </h1>
      <button
        onClick={sortHouse}
        className="border rounded-2xl text-lg w-32 bg-black text-white px-4 py-2 
                   hover:text-black hover:border hover:bg-white mt-2 mb-2"
      >
        Sort Me!
      </button>
      {h && (
        <p className="text-xl text-center">
          🎩 You have been sorted into... <span className="font-bold">{h}</span>!
        </p>
      )}
    </div>
  );
};

export default Header;
