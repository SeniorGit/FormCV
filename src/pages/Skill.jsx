import "../styles/Skill.css"
export function Skills({currentData, onUpdate}){
    const handleChange = (index, field, value) => {
        const updateSkill = [...currentData];
        updateSkill[index][field] = value;
        onUpdate(updateSkill)
    }
    const addNewSkill = () => {
        const newSkill = {
            id: Date.now(),
            SkillName: '',
            Level: 'Intermediate' 
        };
        onUpdate([...currentData, newSkill]);
    };

    const removeSkill = (index) => {
        const updatedSkills = currentData.filter((_, i) => i !== index);
        onUpdate(updatedSkills);
    };
    return(
         <div className="Project">
            <div className="ProjectHeader">
                <h1>Skills</h1>
            </div>
            
            {currentData.length === 0 ? (
                <div className="no-skills">
                    No skills added yet. Click the button below to add your skills.
                </div>
            ) : (
                currentData.map((skill, index) => (
                    <form key={skill.id} className="ProjectForm">
                        <div className="form-header">
                            <h3>Skill #{index + 1}</h3>
                            {currentData.length > 1 && (
                                <button 
                                    type="button" 
                                    className="remove-btn"
                                    onClick={() => removeSkill(index)}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        
                        <label htmlFor={`SkillName-${index}`}>Skill Name</label>
                        <input 
                            type="text" 
                            id={`SkillName-${index}`} 
                            name="SkillName" 
                            value={skill.SkillName}
                            onChange={(e) => handleChange(index, 'SkillName', e.target.value)}
                            placeholder="e.g., JavaScript, React, Project Management"
                        />
                        
                        {/* Optional: Skill Level Selector */}
                        <div className="skill-level">
                            <label htmlFor={`Level-${index}`}>Proficiency:</label>
                            <select 
                                id={`Level-${index}`}
                                name="Level"
                                value={skill.Level || 'Intermediate'}
                                onChange={(e) => handleChange(index, 'Level', e.target.value)}
                                className="skill-level-select"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </div>
                    </form> 
                ))
            )}
            
            <button type="button" className="add-skill-btn" onClick={addNewSkill}>
                + Add Skill
            </button>
        </div>
    )
}