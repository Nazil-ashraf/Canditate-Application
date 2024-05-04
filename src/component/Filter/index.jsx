import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { filterData, searchData } from "../../redux/slice/fetchingAPISlice";
import { sortAndCleanArray } from "../../constant/utils";

// Filter component
const Filter = () => {
    const dispatch = useDispatch();
    const { originalData } = useSelector(state => state.JsonData);

    // Handle change for experience filter
    const handleChangeExperience = (event, newValue) => {
        dispatch(filterData({
            filterValue: newValue?.minExp,
            data: originalData,
            key: 'minExp'
        }));
    };

    // Handle change for salary filter
    const handleChangeSalary = (event, newValue) => {
        dispatch(filterData({
            filterValue: newValue?.minJdSalary,
            data: originalData,
            key: 'minJdSalary'
        }));
    };

    // Handle change for job role filter
    const handleChangeJobRole = (event, newValue) => {
        let payload = newValue?.map(i => i?.jobRole)
        dispatch(filterData({ filterValue: payload, data: originalData, key: 'jobRole' }));
    };

    // Handle change for location filter
    const handleChangeLocation = (event, newValue) => {
        let payload = newValue?.map(i => i?.location)
        dispatch(filterData({ filterValue: payload, data: originalData, key: 'location' }));
    };

    // Handle search input
    const handleSearchInput = (e) => {
        dispatch(searchData({ data: originalData, searchValue: e.target.value }))
    }

    return (
        <div className="page-container--flex">
            {/* Autocomplete for job role filter */}
            <Autocomplete
                multiple
                onChange={handleChangeJobRole}
                options={sortAndCleanArray(originalData?.jdList, 'jobRole') || []}
                getOptionLabel={(option) => option?.jobRole}
                renderInput={(params) => (
                    <TextField {...params} placeholder="Roles" />
                )}
                sx={{ width: "200px" }}
            />

            {/* Autocomplete for experience filter */}
            <Autocomplete
                options={sortAndCleanArray(originalData?.jdList, 'minExp') || []}
                getOptionLabel={(option) => option?.minExp + " Year"}
                onChange={handleChangeExperience}
                renderInput={(params) => (
                    <TextField {...params} placeholder="Experience" />
                )}
                sx={{ width: "200px" }}
            />

            {/* Autocomplete for location filter */}
            <Autocomplete
                multiple
                limitTags={2}
                onChange={handleChangeLocation}
                options={sortAndCleanArray(originalData?.jdList, 'location') || []}
                getOptionLabel={(option) => option?.location}
                renderInput={(params) => (
                    <TextField {...params} placeholder="Location" />
                )}
                sx={{ width: "200px" }}
            />

            {/* Autocomplete for salary filter */}
            <Autocomplete
                onChange={handleChangeSalary}
                options={sortAndCleanArray(originalData?.jdList, 'minJdSalary') || []}
                getOptionLabel={(option) => option?.minJdSalary + " " + option?.salaryCurrencyCode}
                renderInput={(params) => (
                    <TextField {...params} placeholder="Minimum Base Pay Salary" />
                )}
                sx={{ width: "200px" }}
            />

            {/* Text field for searching company name */}
            <TextField
                id="outlined-basic"
                variant="outlined"
                onChange={handleSearchInput}
                placeholder="Search Company Name"
                sx={{ width: "250px" }}
            />
        </div>
    )
}

export default Filter;
