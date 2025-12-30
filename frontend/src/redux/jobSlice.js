import {createSlice} from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    adminAllJobs: [],
    singalJob: null,
    jobSearchInput: "",
    appliedJobs: [],
    filterQuery: "",
    searchQuery: "",
    savedJobs: [],
    jobsLoading: false,
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingalJob: (state, action) => {
      state.singalJob = action.payload;
    },
    setAdminAllJobs: (state, action) => {
      state.adminAllJobs = action.payload;
    },
    setJobSearchInput: (state, action) => {
      state.jobSearchInput = action.payload;
    },
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
    },
    setFilterQuery: (state, action) => {
      state.filterQuery = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload;
    },
    setJobsLoading: (state, action) => {
      state.jobsLoading = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingalJob,
  setAdminAllJobs,
  setJobSearchInput,
  setAppliedJobs,
  setFilterQuery,
  setSearchQuery,
  setSavedJobs,
  setJobsLoading,
} = jobSlice.actions;
export default jobSlice.reducer;
