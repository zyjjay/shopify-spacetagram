import { useEffect, useState } from "react"

export const useFetch = (url, start_date) => {

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [data, setData] = useState(null)
    // const [isList, setIsList] = useState(false)

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async (start_date) => {
            setIsPending(true)
            // setIsList(false)
            try{
                const res = await fetch(`${url}&start_date=${start_date}`, { signal: controller.signal })
                if(!res.ok) throw new Error(res.statusText)
                let dataJson = await res.json()
                console.log(dataJson.length)
                // if(dataJson.length > 0) setIsList(true)

                setIsPending(false)
                setData(dataJson)
                setError(null)
            } catch(err) {
                if(err.name === "AbortError") {
                    console.log("The fetch was aborted")
                } else { //other error not due to error 404 
                    setIsPending(false)
                    setError('Could not fetch the data')
                }
            }
        }

        if(start_date) fetchData(start_date)
        else fetchData('')
        // console.log(data)
        
        return () => {
            controller.abort()
        }

    }, [url, start_date])

    return { data, isPending, error }
}
