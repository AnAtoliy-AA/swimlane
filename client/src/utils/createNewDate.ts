import moment from 'moment'

const DATE_FORMAT_STRING = 'dddd, MMMM Do YYYY, h:mm:ss a'

export const createNewDate = () => moment().format(DATE_FORMAT_STRING)
