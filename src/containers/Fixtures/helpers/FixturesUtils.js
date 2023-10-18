// Generic function to group an array of objects by a specific property
export const groupByProperty = (itemsArray, propertyPath) => {
    return itemsArray.reduce((acc, item) => {
      const key = propertyPath.split('.').reduce((o, p) => o && o[p], item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
}

// Generic function to toggle the value of a property in an object
export const toggleProperty = (prev, propertyName) => ({
    ...prev,
    [propertyName]: !prev[propertyName]
});