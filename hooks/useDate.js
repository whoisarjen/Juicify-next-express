const useShortDate = (date = new Date()) => {
    return new Date(date).toJSON().slice(0, 10);
}

const useAddDaysToDate = (date = new Date(), days) => {
    return new Date((new Date(date)).setDate((new Date(date)).getDate() + days)).toJSON().slice(0, 10)
}
 
export { useShortDate, useAddDaysToDate };