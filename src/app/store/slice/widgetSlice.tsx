import { AxiosInstance } from "@/app/hooks/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { WidgetDTO, WidgetResponse } from "@/types/widget";

const compareResponseWidget = (widget: any): WidgetResponse => ({
    id: widget.id,
    widget_name: widget.widget_name,
    widget_type: typeof widget.widget_type === "number" ? "Ligth Control" : widget.widget_type,
    widget_setting: typeof widget.widget_setting === "string"
        ? JSON.parse(widget.widget_setting)
        : widget.widget_setting,
    status: widget.status,
});

export const createNewWidget = createAsyncThunk("widgetSlice/createNewWidget", async(data: WidgetDTO) => {
    try {
        const response = await AxiosInstance.post("/widget_service/create", data);

         return { status: true, data: compareResponseWidget(response.data.body) };
    } catch (error: any) {
        return { status: false, error: error?.response.data.error.message };
    }
});

export const findAllWidgets = createAsyncThunk("widgetSlice/findAllWidgets", async() => {
    try {
        const response = await AxiosInstance.get("/widget_service/finds");

         return { status: true, data: response.data.body.map((widget: any) => compareResponseWidget(widget)) };
    } catch (error: any) {
        return { status: false, error: error?.response.data.error.message };
    }
});

interface widgetType {
    widgets: WidgetResponse[];
    loading: boolean;
    error: unknown;
}
  
const initialState: widgetType = {
    widgets: [],
    loading: false,
    error: null,
};

const widgetSlice = createSlice({
    name: 'widgetSlice',
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
                if (action.type.includes('createNewWidget')) {
                    state.widgets = [action.payload.data, ...state.widgets];
                }
                if (action.type.includes('findAllWidgets')) {
                    state.widgets = action.payload.data;
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

export default widgetSlice.reducer;
export const widgetSelector = (state:RootState) => state.widget
