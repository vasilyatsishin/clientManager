import { createSlice } from "@reduxjs/toolkit"

interface generalState {
    theme: string,
    safeViewColor: string,
    sectors: string[]
}

const initialState: generalState = {
    theme: "",
    safeViewColor: "white",
    sectors: []
}

const generalSlice = createSlice({
    name: "General",
    initialState,
    reducers:{
        changeTheme: (state, action: {payload: string}) => {
            state.theme = action.payload
        },
        changeSafeViewColor: (state, action: {payload: string}) => {
            state.safeViewColor = action.payload
        },
        changeSectors: (state, action: {payload: string[]}) => {
            state.sectors = action.payload
        }
    }
,})

export const {changeTheme, changeSafeViewColor, changeSectors} = generalSlice.actions
export default generalSlice.reducer