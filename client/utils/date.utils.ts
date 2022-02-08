export const getShortDate = (date: Date | string = new Date()) => {
    return new Date(date).toJSON().slice(0, 10);
}

export const addDaysToDate = (date: Date | string = new Date(), days: number) => {
    return new Date((new Date(date)).setDate((new Date(date)).getDate() + days)).toJSON().slice(0, 10)
}

export const reverseDate = (date: Date | string = new Date()) => {
    date = new Date(date).toJSON().slice(0, 10)
    return date.slice(8, 10) + '-' + date.slice(5, 7) + '-' + date.slice(0, 4)
}

export const reverseDateDotes = (date: Date | string = new Date()) => {
    date = new Date(date).toJSON().slice(0, 10)
    return date.slice(8, 10) + '.' + date.slice(5, 7) + '.' + date.slice(0, 4)
}

export const getAge = (date: Date) => {
    const month_diff = Date.now() - new Date(date).getTime();
    const age_dt = new Date(month_diff);
    const year = age_dt.getUTCFullYear();
    return Math.abs(year - 1970);
}

export const getDailyDate = (date: Date | string = getShortDate()) => new Date(date).toJSON()

// @ts-ignore
export const getDiffrentBetweenDays = (a, b) => (new Date(a) - new Date(b)) / 864e5 | 0;