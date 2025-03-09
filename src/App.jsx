import { useEffect, useState } from "react"
import "./App.css"

function App() {

  const [input, setInput] = useState("")
  const [prevQue, setPrevQue] = useState("")
  const [reply, setReply]= useState("")
  const [loading , setLoading] = useState(false)

  const generateSolution = async(e) =>{
    setReply("")
    setLoading(true)
    setPrevQue(input)
    console.log(list)
    setInput("")
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBGVwRnCAqvvL6RIYYbrXzMsq5hC0ZPOEE" ,
      {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
          }),  
      }
    )
    const data = await res.json()
    setReply(data.candidates[0].content.parts[0].text)
  }

  return (
        <div className="main">
              <h1 className="title">Welcome Human. Ask me anything</h1>
              <div className="question-box">
                <input type="text" 
                  className="input" 
                  placeholder="Prompt......" 
                  value={input} 
                  onChange={(e)=> setInput(e.target.value)}/>
                <button className="btn" onClick={generateSolution}>Search</button>
              </div>
              <div className="bottom">
                  <div className="answer">
                      {
                        reply == "" && loading == true
                        ?
                          <p>loading....</p>
                        : 
                          <p>{reply}</p>
                      }
                  </div>
                  <div className="prev-question">
                          {prevQue}
                  </div>
              </div>
             
          </div>
  )
}
export default App


// AIzaSyBGVwRnCAqvvL6RIYYbrXzMsq5hC0ZPOEE
