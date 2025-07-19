import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { create } from "zustand";

const useUserData = create((set) => ({
  userData: {},
  loggedIn: false,
  setUserData: (data) => {
    set({ userData: data });
  },
  fetchUsersData: async (data, type) => {
    console.log("sending");
    try {
      // const response = await axios.get(`http://127.0.0.1:5000/login`);
      const response = await axios.get(`https://max-quiz-app-backend.onrender.com/login`);
      const user = response.data.find(({ email, password }) => {
        if (type === "login") {
          return data.email === email && data.password === password;
        } else if (type === "register") {
          return data.email === email;
        }
      });
      console.log("sent");
      if (user) {
        set({ userData: user });
        set({ loggedIn: true });
        if (type==='login') {
          return user
        } else {
          return true;
        }
      } else {
        set({ loggedIn: false });
        set({ userData: {} });
        return false;
      }
    } catch (error) {
      toast.error(error);
      return false;
    }
  },
  logOut: ()=>{
        set({ loggedIn: false });
        set({ userData: {} });
  }
}));

export default useUserData;
