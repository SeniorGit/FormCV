import "../styles/Education.css"
export function Education({currentData, onUpdate}){
    const handleChange = (index, field, value) => {
        const updateEducation = [...currentData];
        updateEducation[index][field] = value;
        onUpdate(updateEducation)
    }
    const addNewEducation = () => {
        const newEducation = {
            id: Date.now(),
            LEducation: '',
            NInstitution: '',
            Major: '',
            Start: '',
            End: ''
        };
        onUpdate([...currentData, newEducation]);
    };
    return(
        <div className="Education">
            <div>
                <h1>Education</h1>
            </div>
            {currentData.map((education, index)=>(
                <div key={education.id}>
                    <form className="EducationForm" >
                        <label htmlFor={`LEducation-${index}`}>Last Education</label>
                        <input type="text" id={`LEducation-${index}`} name="LEducation"
                            value={education.LEducation}
                            onChange={(e)=> handleChange(index, 'LEducation', e.target.value)}
                        />
                        <div className="EducationName">
                            <div>
                                <label htmlFor={`NInstitution-${index}`}>Institution Name</label>
                                <input type="text" id={`NInstitution-${index}`} name="NInstitution" 
                                    value={education.NInstitution}
                                    onChange={(e)=> handleChange(index, 'NInstitution', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor={`Major-${index}`}>Major</label>
                                <input type="text" id={`Major-${index}`} name="Major" 
                                    value={education.Major}
                                    onChange={(e)=> handleChange(index, 'Major', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="edutDate">
                            <div>
                                <label htmlFor={`Start-${index}`}>Start</label>
                                <input type="date" id={`Start-${index}`} name="Start" 
                                    value={education.Start}
                                    onChange={(e)=> handleChange(index, 'Start', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor={`End-${index}`}>End</label>
                                <input type="date" id={`End-${index}`} name="End"
                                    value={education.End}
                                    onChange={(e)=> handleChange(index, 'End', e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            ))}
            <button type="button" className="add-education-btn" onClick={addNewEducation}>
                + Add Another Education
            </button>
        </div>
    )
}