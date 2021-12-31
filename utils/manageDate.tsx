const getShortDate = (date: Date | string = new Date()) => {
    return new Date(date).toJSON().slice(0, 10);
}

const addDaysToDate = (date: Date | string = new Date(), days: number) => {
    return new Date((new Date(date)).setDate((new Date(date)).getDate() + days)).toJSON().slice(0, 10)
}

const reverseDate = (date: Date | string = new Date()) => {
    date = new Date(date).toJSON().slice(0, 10)
    return date.slice(8, 10) + '-' + date.slice(5, 7) + '-' + date.slice(0, 4)
}

const reverseDateDotes = (date: Date | string = new Date()) => {
    date = new Date(date).toJSON().slice(0, 10)
    return date.slice(8, 10) + '.' + date.slice(5, 7) + '.' + date.slice(0, 4)
}

const getDirrentBetweenDays = (a, b) => (new Date(a) - new Date(b)) / 864e5 | 0;

export { getShortDate, addDaysToDate, reverseDate, reverseDateDotes, getDirrentBetweenDays };