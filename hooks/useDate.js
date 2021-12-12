const getShortDate = (date = new Date()) => {
    return new Date(date).toJSON().slice(0, 10);
}
 
export { getShortDate };