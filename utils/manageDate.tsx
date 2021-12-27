const getShortDate = (date: Date = new Date()) => {
    return new Date(date).toJSON().slice(0, 10);
}

const addDaysToDate = (date: Date = new Date(), days: number) => {
    return new Date((new Date(date)).setDate((new Date(date)).getDate() + days)).toJSON().slice(0, 10)
}

const reverseDate = (date: any = new Date()) => {
    date = new Date(date).toJSON().slice(0, 10)
    return date.slice(8,10) + '-' + date.slice(5,7) + '-' + date.slice(0, 4)
}

const reverseDateDotes = (date: any = new Date()) => {
    date = new Date(date).toJSON().slice(0, 10)
    return date.slice(8,10) + '.' + date.slice(5,7) + '.' + date.slice(0, 4)
}
 
export { getShortDate, addDaysToDate, reverseDate, reverseDateDotes };