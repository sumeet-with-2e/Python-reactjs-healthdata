import React, { useState, useEffect } from "react";
// import firebase from "firebase/app";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, storage } from "../firebase"; // Adjust path as needed
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { getDownloadURL, ref } from "firebase/storage";

const GroupsPage = () => {
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // No user is signed in
        setUser(null);
        return <Navigate to="/login" />;
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Logout successful, set user state to null
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
  };

  const handleDownload = async () => {
    const fileRef = ref(storage, "patient_data.csv"); // path to your file in Firebase Storage
    try {
      const url = await getDownloadURL(fileRef);
      const link = document.createElement("a");
      link.href = url;
      link.download = "patient_data.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file: ", error);
    }
  };

  return (
    <div className="groups-page-container">
      {user ? (
        <div>
          <div class="w-64 h-screen relative bg-zinc-100">
            <div class="w-50 h-50 left-[1350px] top-[10px] absolute bg-white rounded-3xl shadow">
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div class="w-96 h-108 left-[1050px] top-[203px] absolute">
              <div class="w-96 h-106 left-0 top-10 absolute bg-white rounded-3xl shadow" />
              <div class="left-[20px] top-[18px] absolute text-rose-700 text-xl font-normal font-['Montserrat']">
                Group Members
              </div>
              <div class="w-80 h-96 left-[20px] top-[66px] absolute flex-col justify-start items-start gap-4 inline-flex">
                <div class="self-stretch px-6 py-5 bg-white rounded-lg shadow border border-gray-300 justify-start items-start gap-3 inline-flex">
                  <img
                    class="w-10 h-10 rounded-2xl"
                    src="https://via.placeholder.com/40x40"
                  />
                  <div class="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                    <div class="self-stretch text-gray-900 text-sm font-medium font-['Montserrat'] leading-tight">
                      Leslie Alexander
                    </div>
                    <div class="self-stretch text-gray-500 text-sm font-normal font-['Montserrat'] leading-tight">
                      Patient 1
                    </div>
                  </div>
                </div>
                <div class="self-stretch px-6 py-5 bg-white rounded-lg shadow border border-gray-300 justify-start items-start gap-3 inline-flex">
                  <img
                    class="w-10 h-10 rounded-2xl"
                    src="https://via.placeholder.com/40x40"
                  />
                  <div class="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                    <div class="self-stretch text-gray-900 text-sm font-medium font-['Montserrat'] leading-tight">
                      Michael Foster
                    </div>
                    <div class="self-stretch text-gray-500 text-sm font-normal font-['Montserrat'] leading-tight">
                      Patient 2
                    </div>
                  </div>
                </div>
                <div class="self-stretch px-6 py-5 bg-white rounded-lg shadow border border-gray-300 justify-start items-start gap-3 inline-flex">
                  <img
                    class="w-10 h-10 rounded-2xl"
                    src="https://via.placeholder.com/40x40"
                  />
                  <div class="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                    <div class="self-stretch text-gray-900 text-sm font-medium font-['Montserrat'] leading-tight">
                      Dries Vincent
                    </div>
                    <div class="self-stretch text-gray-500 text-sm font-normal font-['Montserrat'] leading-tight">
                      Patient 3
                    </div>
                  </div>
                </div>
                <div class="self-stretch px-6 py-5 bg-white rounded-lg shadow border border-gray-300 justify-start items-start gap-3 inline-flex">
                  <img
                    class="w-10 h-10 rounded-2xl"
                    src="https://via.placeholder.com/40x40"
                  />
                  <div class="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                    <div class="self-stretch text-gray-900 text-sm font-medium font-['Montserrat'] leading-tight">
                      Lindsay Walton
                    </div>
                    <div class="self-stretch text-gray-500 text-sm font-normal font-['Montserrat'] leading-tight">
                      Patient 4
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div class="w-96 h-full left-[750px] top-[560px] absolute bg-white rounded-3xl shadow" />
            <div class="w-96 h-96 left-[323px] top-[560px] absolute bg-white rounded-3xl shadow" /> */}
            <div class="w-150 h-80 left-[323px] top-[203px] absolute">
              <div class="w-[700px] h-[350px] left-0 top-0 absolute bg-white rounded-3xl shadow" />
              <div class="w-28 left-[30px] top-[20px] absolute text-rose-700 text-xl font-normal font-['Montserrat']">
                Description
              </div>
              <div class="w-[680px] left-[30px] top-[64px] absolute text-black text-xl font-normal font-['Montserrat']">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor <br />
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                <button onClick={handleDownload}>
                  Download patient CSV data
                </button>
              </div>
            </div>
            <div class="left-[333px] top-[138px] absolute">
              <div class="w-96 left-[72px] top-[11px] absolute text-rose-700 text-4xl font-medium font-['Montserrat'] leading-tight">
                Group Name
              </div>
              <div class="origin-top-left -rotate-90 w-10 h-10 left-0 top-[42px] absolute">
                {/* <div class="w-10 h-10 left-0 top-10 absolute origin-top-left -rotate-90 bg-zinc-300" /> */}
                <ArrowUpwardIcon className="text-rose-700" />
              </div>
            </div>
            <div class="w-100 h-50 left-[409px] top-[10px] absolute">
              <div class="w-96 h-20 left-0 top-0 absolute bg-white rounded-3xl shadow" />
              <div class="left-[65px] top-[25px] absolute text-rose-700 text-xl font-normal font-['Montserrat']">
                Search
              </div>
            </div>
            <div class="w-20 h-20 left-[311px] top-[10px] absolute">
              <div class="w-20 h-20 left-0 top-0 absolute bg-white rounded-3xl shadow" />
            </div>
            <div class="w-[250px] h-screen left-[-2px] top-[-2px] absolute">
              <div class="w-[300px] h-screen left-0 top-0 absolute bg-white rounded-tr-3xl rounded-br-3xl shadow" />
              <div class="w-[250px] h-px left-[30px] top-[647px] absolute border border-rose-700" />
              <div class="w-[250px] h-11 left-[30px] top-[408px] absolute">
                <div class="flex items-center justify-center w-48 h-11 left-0 top-0 absolute bg-rose-700 rounded-xl" />
                <div class="flex items-center justify-center left-[65px] top-[16px] absolute text-white text-xl font-bold font-['Montserrat']">
                  Groups
                </div>
              </div>
              <div class="w-40 h-5 left-[40px] top-[355px] absolute">
                <div class="w-24 h-3.5 left-[55px] top-[3px] absolute text-rose-700 text-xl font-normal font-['Montserrat']">
                  Requests
                </div>
              </div>
              <div class="w-48 h-5 left-[40px] top-[292px] absolute">
                <div class="w-7 h-5 px-2.5 py-0.5 left-[157px] top-[1px] absolute bg-stone-200 rounded-lg justify-center items-center inline-flex">
                  <div class="text-center text-rose-900 text-xs font-medium font-['Montserrat'] leading-none">
                    1
                  </div>
                </div>
                <div class="w-16 h-3.5 left-[55px] top-[4px] absolute text-rose-700 text-xl font-normal font-['Montserrat']">
                  Tasks
                </div>
              </div>
              <div class="w-28 h-6 left-[40px] top-[226px] absolute">
                <div class="w-16 h-3.5 left-[55px] top-[5px] absolute text-rose-700 text-xl font-normal font-['Montserrat']">
                  Home
                </div>
              </div>
              <div class="w-[250px] h-px left-[30px] top-[185px] absolute border border-rose-700" />
              <div class="w-[250px] h-16 left-[25px] top-[90px] absolute justify-start items-center gap-7 inline-flex">
                <img
                  class="w-10 h-10 rounded-xl"
                  src="https://via.placeholder.com/40x40"
                />
                <div class="flex-col justify-start items-start inline-flex">
                  <div class="flex items-center justify-center text-gray-700 text-xl font-small font-['Montserrat'] leading-normal">
                    Turmerik
                    {/* {user.displayName || user.email} */}
                  </div>
                  <div class="text-gray-500 text-lg font-light font-['Montserrat'] leading-tight">
                    {user.email}
                  </div>
                </div>
              </div>
              <div class="w-40 h-10 left-[30px] top-[25px] absolute text-black text-3xl font-normal font-['Inter']">
                Cool App
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Please login to view groups.</p>
      )}
    </div>
  );
};

export default GroupsPage;
