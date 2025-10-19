import { createContext, useEffect, useState } from "react";
import axios from "axios";


const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [fetchMessage, setFetchMessage] = useState(null);

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:5000/api/login", inputs);
    console.log(res, " :RESPONSE");

    setCurrentUser(res.data.data[0]);
    return res;
    // console.log(res);
  };

//   const logout = async () => {
//     localStorage.removeItem("user");
//     const res = await post("/api/logout");
//     setFetchMessage(res.message);
//     setCurrentUser(null);
//     toast.success("Logout sucessfully");
//   };

  useEffect(() => {
    // Only set the item in localStorage if currentUser is not null
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, fetchMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };