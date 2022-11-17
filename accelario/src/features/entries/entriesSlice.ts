import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchData } from './entriesAPI';



export interface IGridData {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: 'yes' | 'no';
  Link: string;
  Category: string;
}


export interface IEntriesState {
  data: IGridData[];
  status: 'idle' | 'loading' | 'failed';
  count: number;
}

const initialState: IEntriesState = {
  data: [],
  status: 'idle',
  count: 0
};


export const getDataAsync = createAsyncThunk(
  'entries/fetchCount',
  async () => {
    const response = await fetchData();
    const data = await response.json();
    return data;
  }
);

export const entriesSlice = createSlice({
  name: 'entries',
  initialState,

  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload.entries;
        state.count = action.payload.count;
      })
      .addCase(getDataAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});


export const selectData = (state: RootState) => state.entries.data;
export const selectStatus = (state: RootState) => state.entries.status;
export const selectCount = (state: RootState) => state.entries.count;


export default entriesSlice.reducer;
