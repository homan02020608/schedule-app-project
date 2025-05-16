import { createSlice } from "@reduxjs/toolkit";

interface InitialUserState {
    user : null | {
        id : string;
        email : string;
        first_name : string;
        last_name : string;
    }
}

const initialState : InitialUserState = {
    user : null 
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        signIn : (state , action) => {
            state.user = action.payload
        },
        signOut : (state) => {
            state.user = null
        }
    }
});

export default userSlice.reducer;
export const { signIn , signOut } = userSlice.actions;