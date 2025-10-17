// ...existing code...
import React, { useState } from "react";
import './Body.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Element() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("https://api-house-0gx6.onrender.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="page-shell">
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
                            <span className="prompt">$</span> <span className="prompt-text">cat welcome.txt</span>
                            <br />
                            <span className="text">
                                Welcome to API House
                                A curated collection of free APIs for your next project.
                                No authentication required. No rate limiting hassles. Just APIs.
                            </span>
                            <br /><br />
                            <span className="prompt">$</span> <span className="prompt-text">api-house --search</span>
                        </pre>
                    </div>
                </section>
            </main>


            <div className="head-text">
                Available API's
            </div>

            <main className="content">
                <section className="terminal-wrapper">
                    <div className="terminal">
                        <div className="dots">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot cyan"></span>
                        </div>

                        <pre className="terminal-text">
                            <span className="prompt">-</span> <span className="prompt-text">Random User Generator</span> 
                            <span className="status"> new </span>
                            <br />
                            <span className="text">
                                This API is used to generate random names for both girls and boys. You can also generate all the name that are present in the API. 
                            </span>
                            <br />
                              <span className="prompt">-</span> <span className="prompt-text">Methods: </span> 
                            <br />
                            <span className="text">
                              - Get All the records for Girls <span className="status">  /api/getAllGirls </span>
                            </span>
                            <br />
                            <span className="text">
                              - Get All the records for Boys  <span className="status">  /api/getAllBoys </span>
                            </span>

                            <div className="copy-field">
                                <input
                                    type="text"
                                    value="https://api-house-0gx6.onrender.com"
                                    readOnly
                                />
                                <div className="icons">
                                    <button onClick={handleCopy} title="Copy URL">
                                        {copied ? "✔️" : "◼️"}
                                    </button>
                                  
                                </div>
                            </div>

                            <br />
                            <span className="prompt">$</span> <span className="prompt-text">curl -i <span className="status">https://api-house-0gx6.onrender.com</span></span>
                        </pre>
                    </div>
                </section>
            </main>

        <center> <a href="https://github.com/vatsal-verma" target="_blank" rel="noopener noreferrer">
                <i
                    className="fa-brands fa-github"
                    style={{ color: "white", fontSize: "36px", marginBottom: "50px"}}
                ></i>
            </a>
        </center>  
        </div>


    );
}
