import { AxiosInstance } from "@/app/hooks/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface credentialAuthProps {
    credential: string;
    password:   string;
}

export const credentialAuth = createAsyncThunk("authSlice/credentialAuth", async(data: credentialAuthProps) => {
    try {
        const response = await AxiosInstance.post("/auth_service/credential", data);

        console.log(response.status);

        return { status: true, data: response.data.body };
    } catch (error: any) {
        return { status: false, error: error?.response.data.error.message };
    }
});

interface authType {
    userInfo: object | null;
    loading: boolean;
    error: unknown;
}
  
const initialState: authType = {
    userInfo: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state) => {
                state.loading = true;
                state.error = null;
            },
        )
        .addMatcher(
            (action) => action.type.endsWith("/fulfilled"),
            (state, action: PayloadAction<{ data?: any }>) => {
                state.loading = false;
                if (action.type.includes('credentialAuth')) {
                    state.userInfo = action.payload.data;
                }
            }
        )
        .addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state, action: PayloadAction) => {
                state.loading = false;
                state.error = action.payload;
            }
        )
    }
});

export default authSlice.reducer;
export const authSelector = (state:RootState) => state.auth