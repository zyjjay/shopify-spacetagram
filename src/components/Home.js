import "./Home.css"
import { useFetch } from "../hooks/useFetch"
import { useState, useEffect } from "react"

export default function Home(props) {

    const { startDate } = props
    console.log(startDate)
    const URL = "https://api.nasa.gov/planetary/apod"
    const APIKey = process.env.REACT_APP_NASA_KEY

    const { data, isPending, error } = useFetch(`${URL}?api_key=${APIKey}&start_date=${startDate}`)
    const [liked, setLiked] = useState(false)
    const [ displayData, setDisplayData ] = useState(null)

    useEffect(() => {
        setDisplayData(data)
    }, [data, setDisplayData])

    console.log(data)


    return (
        <div className="gallery">
            
            {isPending && <p>Loading...</p>}

            {!isPending && error && <p>{error}</p>}

            {displayData && !isPending && startDate && !error &&
                <ul className="collection">
                    {displayData.map((entry) => (
                        <li key={entry.url} className="collection-card">
                            <h2>{entry.title}</h2>
                            <img src={entry.url} alt="APOD"/>
                            <p style={ {fontStyle: "italic"} }>Taken on {entry.date}</p>
                            <p className="description">{entry.explanation}</p>
                            {!liked && <button className="like-btn" style={ liked ? {backgroundColor: "#89A894"} : {backgroundColor: "#6B4D57"} } onClick={() => setLiked(true)}>Like!</button>}
                            {liked && <button className="like-btn" style={ liked? {backgroundColor: "#89A894"} : {backgroundColor: "#6B4D57"} } onClick={() => setLiked(false)}>Unlike :(</button>}
                        </li>
                    ))}
                </ul>
            }

            {/* {!isList && displayData && !isPending && !error &&
                <div className="collection-card">
                    <h2>{displayData.title}</h2>
                    <img src={displayData.url} alt="APOD"/>
                    <p style={ {fontStyle: "italic"} }>Taken on {displayData.date}</p>
                    <p className="description">{displayData.explanation}</p>
                    {!liked && <button className="like-btn" style={ liked ? {backgroundColor: "#89A894"} : {backgroundColor: "#6B4D57"} } onClick={() => setLiked(true)}>Like!</button>}
                    {liked && <button className="like-btn" style={ liked? {backgroundColor: "#89A894"} : {backgroundColor: "#6B4D57"} } onClick={() => setLiked(false)}>Unlike :(</button>}
                </div>
            } */}
        </div>
    )
}
