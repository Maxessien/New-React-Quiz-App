import { create } from "zustand";

const useMobileView = create((set)=>({
    mobileView: false,
    setMobileView: (value)=>{
        set({mobileView : value})
    }
}))

export default useMobileView