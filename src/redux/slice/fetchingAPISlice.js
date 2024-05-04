import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { APICONSTANT } from '../../constant/apiConstant';

// Async thunk for fetching API data
export const fetchApiJSON = createAsyncThunk(
  'sampleJd/fetchSampleJdJSON',
  async (limit) => {
    // API request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        limit: limit,
        offset: 0
      })
    };

    // Fetch data from API
    const response = await fetch(APICONSTANT, requestOptions);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  }
);

// Create slice for API data management
const fetchApiSlice = createSlice({
  name: 'candidateApp-Json',
  initialState: {
    data: [],
    loading: false,
    error: null,
    originalData: [],
    filters: {
      experience: null,
      salary: null,
      jobRole: [],
      location: [],
    },
  },
  reducers: {
    // Action function for adding filters
    filterData: (state, action) => {
      const { key, filterValue, data } = action.payload;
      // Switch case for updating filter values
      switch (key) {
        case 'minExp':
          state.filters = { ...state.filters, experience: filterValue !== undefined ? filterValue : null };
          break;
        case 'minJdSalary':
          state.filters = { ...state.filters, salary: filterValue !== undefined ? filterValue : null }
          break;
        case 'jobRole':
          state.filters = { ...state.filters, jobRole: filterValue }
          break;
        case 'location':
          state.filters = { ...state.filters, location: filterValue }
          break;
        default:
      }
      // Filtering data based on applied filters
      const filteredArray = data?.jdList?.filter(item => {
        if ((state.filters.experience === null || item.minExp <= state.filters.experience) &&
          (state.filters.salary === null || item.minJdSalary >= state.filters.salary) &&
          (state.filters.jobRole.length === 0 || state.filters.jobRole.includes(item.jobRole)) &&
          (state.filters.location.length === 0 || state.filters.location.includes(item.location))) {
          return true; 
        }
        return false; 
      });

      // Update state with filtered data
      const newData = {
        "jdList": filteredArray,
        "totalCount": data?.totalCount
      };
      state.data = newData
    }, 
    // Action function for searching data
    searchData: (state, action) => {
      let { data, searchValue } = action.payload;

      // Search function
      if (searchValue.length > 0) {
        const filteredData = data?.jdList.filter(item => {
          if (item.companyName.toLowerCase().includes(searchValue.toLowerCase())) {
            if (item.companyName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 &&
              searchValue.length >= 1) {
              return true;
            }
          }
          return false;
        });

        // Update state with filtered data
        const newData = {
          "jdList": filteredData,
          "totalCount": data?.totalCount
        };
        state.data = newData
      } else {
        state.data = data;
      }
    }
  },
  // Extra reducers for handling async actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiJSON.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiJSON.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.originalData = action.payload;
      })
      .addCase(fetchApiJSON.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Export actions and reducer
export const { filterData, searchData } = fetchApiSlice.actions;
export default fetchApiSlice.reducer;
