import { create } from "zustand";
import { toast } from "react-toastify";

const useQuizData = create((set) => ({
  allData: [],
  fetchData: async () => {
    try {
      // const fetched = await fetch(
      //   "https://raw.githubusercontent.com/Maxessien/Test-API-Fetch-/main/all-quiz-data.json"
      // );
      const fetched = await fetch(
        "/all-quiz-data.json"
      );
      const data = await fetched.json();
      set({ allData: data });
      return data;
    } catch (err) {
      err.message.toLowerCase().includes("failed to fetch")
        ? toast.error("Network error, please check your internet connection")
        : toast.error("Server Error, please try again later");
        console.log(err)
      return [];
    }
  },
}));

export default useQuizData;
