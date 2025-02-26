import React from 'react';
import Header from './components/Header';
import Table1 from "./components/Table1";
import Table2 from "./components/Table2";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <Header />
      <div className="w-full max-w-3xl">
        <Table1 />
        <Table2 />
      </div>
    </div>
  );
}

export default App;
