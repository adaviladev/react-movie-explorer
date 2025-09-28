import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchMovies as searchApi } from "../../api/tmdb";

//Thunk: busca películas
export const fetchMoviesByQuery = createAsyncThunk(
  "movies/fetchByQuery",
  async (query, { rejectWithValue }) => {
    try {
      const res = await searchApi(query);
      return { query, items: res };
    } catch (err) {
      return rejectWithValue(err.message || "Search failed");
    }
  }
);

const initialState = {
  search: { query: "", items: [], status: "idle", error: null },
  details: { byId: {} }, // lo agregaremos en el paso de detalles
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.search.query = action.payload;
    },
    clearResults(state) {
      state.search.items = [];
      state.search.status = "idle";
      state.search.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByQuery.pending, (state) => {
        state.search.status = "loading";
        state.search.error = null;
      })
      .addCase(fetchMoviesByQuery.fulfilled, (state, action) => {
        state.search.status = "success";
        state.search.query = action.payload.query;
        state.search.items = action.payload.items;
      })
      .addCase(fetchMoviesByQuery.rejected, (state, action) => {
        state.search.status = "error";
        state.search.error = action.payload || "Unknown error";
      });
  },
});

export const { setQuery, clearResults } = moviesSlice.actions;
export default moviesSlice.reducer;
