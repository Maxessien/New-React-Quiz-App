import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { create } from "zustand";

const useUserData = create((set) => ({
  userData: {},
  userAccountData: {},
  loggedIn: false,
  isLoading: false,
  setUserData: (data) => {
    set({ userData: data });
  },
  fetchUsersData: async (data, type) => {
    try {
      set({isLoading: true})
      const response = await axios.post(`http://127.0.0.1:5000/${type}`, data);
      if (response.data) {
        set({ userData: response.data });
        type === 'login' ? set({ loggedIn: true }) : set({ loggedIn: false });
        return response
      } else {
        set({ loggedIn: false });
        set({ userData: {} });
        return false
      }
    } catch (error) {
      toast.error(error);
      return false;
    }finally{
      set({isLoading: false})
    }
  },
  fetchUserAccountData: async (data)=>{
    try {
      // console.log(data, 'stta')
      const response = await axios.post('http://127.0.0.1:5000/account_data', data)
      console.log('fetching', response)
      
      set({userAccountData: response.data})
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  setUserAccountData:  (data)=>{
    set({userAccountData: data})
  },
  logOut: ()=>{
        set({ loggedIn: false });
        set({ userData: {} });
  }
}));

export default useUserData;
