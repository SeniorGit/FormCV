import "./styles/Experience.css"
export function Experience ({currentData, onUpdate}){
    const handleChange = (index, field, value) => {
        const UpdateExperiences = [...currentData];
        UpdateExperiences[index][field] = value;
        onUpdate(UpdateExperiences);
    }
    return(
        <div className="Experience">
            <div>
                <h1>Experience</h1>
            </div>
            {currentData.map((experience, index)=>(
                <div key={experience.id} className="ExperieceForm">
                    <form className="ExperieceForm" >

                        <label htmlFor={`Position-${index}`}>Position</label>
                        <input type="text" id={`Position-${index}`} name="Position" 
                            value={experience.Position}
                            onChange={(e)=> handleChange(index, 'Position', e.target.value)}
                        />

                        <label htmlFor={`Company-${index}`}>Company</label>
                        <input type="text" id={`Company-${index}`} name="Company" 
                            value={experience.Company}
                            onChange={(e)=> handleChange(index, 'Company', e.target.value)}
                            autoComplete="Company"
                        />
                        <div className="ExperiDate">
                            <div>
                                 <label htmlFor={`SDate-${index}`}>Start Date</label>
                                <input type="date" id={`SDate-${index}`} name="SDate" 
                                    value={experience.SDate}
                                    onChange={(e)=> handleChange(index, 'SDate', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor={`EDate-${index}`}>End Date</label>
                                <input type="date" id={`EDate-${index}`} name="EDate" 
                                    value={experience.EDate}
                                    onChange={(e)=> handleChange(index, 'EDate', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="Worked">
                            <label htmlFor={`Working-${index}`}  >
                                <div>
                                    <input type="checkbox" name="Working" id={`Working-${index}`}
                                        checked={experience.Working}
                                        onChange={(e)=> handleChange(index, 'Working', e.target.checked)}
                                    /> 
                                </div>
                                <div>
                                    I'm Still Working at this company
                                </div>
                            </label>
                        </div>
                        <label htmlFor={`Description-${index}`}>Description</label>
                        <textarea name="Description" id={`Description-${index}`}
                            value={experience.Description}
                            onChange={(e)=> handleChange(index, 'Description', e.target.value)}
                        />
                    </form>
                </div>
            ))}
        </div>
    )
}