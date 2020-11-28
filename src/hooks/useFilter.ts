import { useEffect, useState} from 'react'

interface Filter{
    start: number,
    end: number
}

const useFilter = (dateStart?:string,dateEnd?:string):[Filter,any] => {
    const [start,setStart] = useState(0)
    const [end,setEnd] = useState(0)

    const setFilter = (dateStart?:string,dateEnd?:string) => {
        let dStart = new Date()
        let dEnd = new Date()
        if(dateStart){
            dStart = new Date(dateStart)
        }
        if(dateEnd){
            dEnd = new Date(dateEnd)
        }
    
        dStart.setHours(0,0)
        dEnd.setHours(23,59)
    
        setStart(dStart.getTime())
        setEnd(dEnd.getTime())
    }

    useEffect(()=>{
        setFilter(dateStart,dateEnd)
    },[])
    
    
    return [
        {start,end},
        setFilter
    ]
}

export default useFilter