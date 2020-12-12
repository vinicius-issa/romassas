export const formatDate = (date:Date) => {
    const year = date.getUTCFullYear()
    const month = formatNumber(date.getMonth() + 1)
    const day = formatNumber(date.getDate())
    const hour = formatNumber(date.getHours())
    const minute = formatNumber(date.getMinutes())

    const formated = `${year}-${month}-${day}T${hour}:${minute}`

    return formated   
}

export const getDate = (date:Date) => {
    const year = date.getUTCFullYear()
    const month = formatNumber(date.getMonth() + 1)
    const day = formatNumber(date.getDate())
 
    const formated = `${year}-${month}-${day}`

    return formated   
}

export const formatNumber = (value:number) => {
    if(value<10){
        return `0${value}`
    }

    return value.toString()
}

export const formatTime = (timestamp:number|Date|string) => {
    const date = new Date(timestamp)
    const hour = formatNumber(date.getHours())
    const minute = formatNumber(date.getMinutes())

    return `${hour}:${minute}`
}