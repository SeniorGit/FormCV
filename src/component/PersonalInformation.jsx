import "./styles/PersonalInformation.css";
export function PersonalInformation({currentData, onUpdate}){
    const safeData = currentData || {};
    const handleChange = (e) => {
        onUpdate({
            ...safeData,
            [e.target.name]: e.target.value
        })
    }
    return(
        <div className="PersonalInformation">
            <div className="HeaderPersonalInform"><h1>Personal Information</h1></div>
            <div className="FormPersonalInform">
                <form>
                    <div className="Name">
                        <div>
                            <label htmlFor="Fname">First Name</label>
                            <input type="text" id="Fname" name="Fname" 
                                value={currentData.Fname || ""}
                                onChange={handleChange}
                                autoComplete="given-name"
                            />
                        </div>
                        <div>
                            <label htmlFor="Lname">Last Name</label>
                            <input type="text" name="Lname" id="Lname" 
                                value={currentData.Lname || ""}
                                onChange={handleChange}
                                autoComplete="family-name"
                            />
                        </div>
                    </div>
                    <div className="contact">
                        <div>
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" 
                            value={currentData.phone || ""}
                            onChange={handleChange}
                            autoComplete="tel"
                            />
                        </div>
                        <div>
                            <label htmlFor="Email">Email Address</label>
                            <input type="email" id="Email" name="Email" 
                                value={currentData.Email || ""}
                                onChange={handleChange}
                                autoComplete="email"
                            />
                        </div>   
                    </div>
                    <div className="Phorto">
                        <div>
                            <label htmlFor="Linkedin">Linkedin</label>
                            <input type="url" id="Linkedin" name="Linkedin" 
                                value={currentData.Linkedin || ""}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/yourname"
                                autoComplete="url"
                            />
                        </div>
                        <div>
                            <label htmlFor="Proto">Protofolio</label>
                            <input type="url" id="Proto" name="Proto"
                                value={currentData.Proto || ""}
                                onChange={handleChange}
                                placeholder="https://yoursite"
                                autoComplete="url"
                            />
                        </div>
                    </div>
                    <label htmlFor="Address">Address</label>
                    <input type="text" id="Address" name="Address"
                        value={currentData.Address || ""}
                        onChange={handleChange}
                        autoComplete="Address"
                    />
                </form>
            </div>
        </div>
    )
}

