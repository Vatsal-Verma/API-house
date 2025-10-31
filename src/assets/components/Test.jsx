import { useEffect, useState } from 'react'
import './Test.css'
import { Placeholder } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Test() {

    const navigate = useNavigate();
    
    const [indata, setInData] = useState("");
    const [api, setApi] = useState("");
    const [data, setData] = useState();


    const fetchData = async() => {
        try{
            const response = await fetch(api);
            const jsonData = await response.json();
            console.log(jsonData);
            setData(jsonData);

        }
        catch(error) {
            console.log("Could not fetch the data: ", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [api])


    const handleSubmit = (e) => {
        e.preventDefault();
        setApi(indata);  
        setInData("");    
    }

    return(<>

            <div id="route" style={{width: "max-content", position: "absolute", left: "60px", top: "90px", cursor: "pointer"}} onClick={() => { navigate("/")}}>back</div>

            <header className="topbar">
                <div className="brand">
                    <div className="logo-arrow">&gt;_</div>
                    <div className="brand-text">
                        <div className="title">API House</div>
                        <div className="subtitle">Free APIs for Students &amp; Developers</div>
                    </div>
                </div>
                <div className="help-cmd">
                    <span className="user">user@apihouse</span>
                    <span className="cmd">~ $ api-house --help</span>
                </div>
            </header>
            <main className="content">
                <section className="terminal-wrapper">
                    <div className="terminal">
                        <div className="dots">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot cyan"></span>
                        </div>

                        <pre className="terminal-text">
                            <span className="prompt">-</span> <span className="prompt-text">TEST API</span>

                            <br />
                        <span></span>  <span className='text'> Enter your API in the text box below: </span> <br />
                        </pre>

                        <input id='paste' type="text" value={indata} placeholder='paste your api' onChange={e => setInData(e.target.value)} /> <button onClick={handleSubmit}>send</button>

                        <pre className="status">
                           <span>    </span> <b>result:</b>    <br />

                            <pre>
                                   {
                                        JSON.stringify(data, null, 2)
                                   }
                            </pre>

                        </pre>
                        <br />
                        
                    </div>
                </section>
            </main>
    </>)
}
export default Test