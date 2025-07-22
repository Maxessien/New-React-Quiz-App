import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { create } from "zustand";

const useUserData = create((set) => ({
  userData: {},
  userAccountData: {},
  loggedIn: false,
  isLoading: false,
  quizzesTaken: [],
  setUserData: (data) => {
    set({ userData: data });
  },
  fetchUsersData: async (data, type) => {
    console.log("inside");
    try {
      set({ isLoading: true });
      // const response = await axios.post(`http://127.0.0.1:5000/${type}`, data);
      const response = await axios.post(`https://max-quiz-app-backend.onrender.com/${type}`, data);
      if (response.data) {
        set({ userData: response.data });
        type === "login" ? set({ loggedIn: true }) : set({ loggedIn: false });
        console.log(response.data, "end if");
        return response.data;
      } else {
        console.log("inside else");
        set({ loggedIn: false });
        set({ userData: {} });
        return false;
      }
    } catch (error) {
      toast.error(error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  fetchUserAccountData: async (data) => {
    try {
      // const response = await axios.get(
      //   `http://127.0.0.1:5000/results_data/${data.userId}`
      // );
      const response = await axios.get(
        `https://max-quiz-app-backend.onrender.com/results_data/${data.userId}`
      );
      // console.log('fetching', response)
      set({ userAccountData: response.data });
      if (response.data.length > 0) {
        const attemptedArray = [];
        const newData = response.data.map((resp) => {
          if (!attemptedArray.includes(resp.course_code)) {
            attemptedArray.push(resp.course_code);
          }
          return {
            ...resp,
            quiz_data: JSON.parse(resp.quiz_data),
            selected_answers: JSON.parse(resp.selected_answers),
            correct_answers: JSON.parse(resp.correct_answers),
          };
        });
        set({ quizzesTaken: attemptedArray });
        return newData;
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  setUserAccountData: (data) => {
    set({ userAccountData: data });
  },
  logOut: () => {
    set({ loggedIn: false });
    set({ userData: {} });
    set({ quizzesTaken: [] });
  },
}));

export default useUserData;
