import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState  ={
    pastes:localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState, 
  reducers: {
    updatePaste: (state, action) => {
        const paste =action.payload;
        const index= state.pastes.findIndex((item)=>item._id === paste._id);
        if(index >=0){
            state.pastes[index] =paste;
            localStorage.setItem("pastes",JSON.stringify(state.pastes)); 
        toast.success("paste updated");
        }
    },
    addPaste: (state, action) => {
        const paste = action.payload; // extract the paste from payload
        if (!paste.title.trim() || !paste.content.trim()) {
            toast("Title and content cannot be empty");
            return;
        }
        state.pastes.push(paste);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success ("paste created successfully")
    
},
    resetPaste: (state, action) => {
        state.pastes = [];
        localStorage.removeItem("pastes");
        toast("pastes reset successfully")
     
    },
    removePaste: (state, action) => {
        const pasteId = action.payload;
        console.log(pasteId);
        const index = state.pastes.findIndex((item) => item._id === pasteId);  
        if (index >= 0) {
            state.pastes.splice(index, 1);  // Remove the paste
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste deleted");
        }
    },
    
  }
})


export const { updatePaste, addPaste, resetPaste , removePaste } = pasteSlice.actions

export default pasteSlice.reducer