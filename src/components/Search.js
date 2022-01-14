import Home from "./Home"
import { useState } from "react"
import "./Search.css"

export default function Search() {
    const [madeChoice, setMadeChoice] = useState(false)
    const [inputDate, setinputDate] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setMadeChoice(true)
        setinputDate(inputDate)
    }

    return (
        <>
            <h1 className="title">Spacetagram</h1>
            <p className="api_ref">Powered by NASA's APOD API</p>
            <div className="container">
                <form className="search-form" onSubmit={handleSubmit}>
                    <label>
                        <span>
                            To start, enter a start date to search for all images captured since that date to today below!
                        </span>
                        <br />
                        <input 
                        type="date"
                        value={inputDate}
                        onChange={(e) => setinputDate(e.target.value)}
                        />
                    </label>
                    <button className="find-img-btn">Show Collection</button>
                </form>
                {/* <div className="generate">
                    <p>Or</p>
                    <button className="find-img-btn" onClick={handleClick}>Image captured today</button>
                </div> */}
            </div>

            {madeChoice &&<Home startDate={inputDate} />}
        </>
    )
}
