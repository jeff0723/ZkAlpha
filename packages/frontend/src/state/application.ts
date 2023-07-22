import { createSlice } from '@reduxjs/toolkit'

export interface ApplicationState {
}
export const initialState: ApplicationState = {

}

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {

    }
})

export const {
} = applicationSlice.actions
export default applicationSlice.reducer