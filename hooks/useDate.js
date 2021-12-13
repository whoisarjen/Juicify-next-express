const getShortDate = (date = new Date()) => {
    return new Date(date).toJSON().slice(0, 10);
}

const addDaysToDate = (date = new Date(), days) => {
    return new Date((new Date(date)).setDate((new Date(date)).getDate() + days)).toJSON().slice(0, 10)
}
 
export { getShortDate, addDaysToDate };