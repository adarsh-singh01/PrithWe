import React from "react";

function HouseholdCalc() {
  return (
    <div>
      <div className="login flex justify-center items-center space-x-2 my-16">
        <div className="loginBox flex flex-col bg-gray-400 p-10 space-y-3 rounded-lg justify-center">
          <div className="inputs flex flex-col space-y-2 ">
            <div className="form flex p-4 space-x-8">
              <div className="title space-y-4 flex flex-col font-serif items-end">
                <h1 className="inputTitle p-3">Electricity Usage : </h1>
                <h1 className="inputTitle p-3">Transportation : </h1>
                <h1 className="inputTitle p-3">Gas Cylinder : </h1>
                <h1 className="inputTitle p-3">Water Usage : </h1>
                <h1 className="inputTitle p-3">Waste Generation : </h1>
                <h1 className="inputTitle p-3">No. of Vegetarians : </h1>
                <h1 className="inputTitle p-3">No. of Non-Vegetarians : </h1>
              </div>
              <div className="input flex flex-col space-y-4">
                <input type="number" className="inputData rounded-lg p-3" placeholder="Enter in Kwh" />
                <input type="number" className="inputData rounded-lg p-3" placeholder="Enter in Km" />
                <input type="number" className="inputData rounded-lg p-3" placeholder="Enter in Kg" />
                <input type="number" className="inputData rounded-lg p-3" placeholder="Enter in litres" />
                <input type="number" className="inputData rounded-lg p-3" placeholder="Enter in Kg" />
                <input type="number" className="inputData rounded-lg p-3" placeholder="No. of Vegetarians" />
                <input type="number" className="inputData rounded-lg p-3" placeholder="No. of Non-Vegetarians" />
              </div>
            </div>

            </div>
          <button className="btn  p-2 rounded-full bg-green-300 hover:bg-green-400">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default HouseholdCalc;
