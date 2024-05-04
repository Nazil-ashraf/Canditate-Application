
// function that remove null and duplicate object
export const sortAndCleanArray = (arr, type) => {
    let sortedAndRemoveNullData = arr?.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t[type] === value[type]
        )) && value[type] !== null
    ).sort((a, b) => a[type] - b[type]);

    return sortedAndRemoveNullData
}