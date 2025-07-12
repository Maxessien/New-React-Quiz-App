import { create } from "zustand";
import { toast } from "react-toastify";

const useQuizData = create((set) => ({
    allTitles: [],
    titlesFetch: async ()=>{
    try {
      const fetched = await fetch(
        "https://raw.githubusercontent.com/Maxessien/Test-API-Fetch-/main/all-quiz-data.json"
      );
      const data = await fetched.json();
      const titles = data.map((item) => item.title);
      set({ allTitles: titles });
    } catch (err) {
      err.message.toLowerCase().includes("failed to fetch")
        ? toast.error("Network error, please check your internet connection")
        : toast.error("Server Error, please try again later");
    }
  },
  allData: [],
  setAllData: (value) => {
    set({ allData: value });
  },
  fetchData: async () => {
    try {
      const fetched = await fetch(
        "https://raw.githubusercontent.com/Maxessien/Test-API-Fetch-/main/all-quiz-data.json"
      );
      const data = await fetched.json();
        console.log(data)
      set({ allData: data });
    } catch (err) {
      err.message.toLowerCase().includes("failed to fetch")
        ? toast.error("Network error, please check your internet connection")
        : toast.error("Server Error, please try again later");
    }
  },
}));

export default useQuizData;
