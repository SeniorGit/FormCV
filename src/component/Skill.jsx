import "./styles/Skill.css"
export function Skills({currentData, onUpdate}){
    const handleChange = (index, field, value) => {
        const updateSkill = [...currentData];
        updateSkill[index][field] = value;
        onUpdate(updateSkill)
    }
    return(
        <div className="Project">
            <div className="ProjectHeader">
                <h1>Skill</h1>
            </div>
            {currentData.map((skill, index)=>(
                <form key={skill.id} className="ProjectForm">
                    <label htmlFor={`SkillName-${index}`}>Skills</label>
                    <input type="text" id={`SkillName-${index}`} name="SkillName" 
                        value={skill.SkillName}
                        onChange={(e)=> handleChange(index, 'SkillName', e.target.value)}
                    />
                </form> 
            ))}
        </div>
    )
}