import "../styles/Profile.css";
export function Profile({currentData, onUpdate}){
    const handleChange = (e) => {
        onUpdate({
            ...currentData,
            [e.target.name]: e.target.value
        })
    }
    const charCount = currentData.Description?.length || 0;
    const maxChars = 500;
    return(
        <div className="Profile">
            <div className="ProfileHeader">
                <h1>Profile Summary</h1>
            </div>
            <div className="ProfileForm">
                <form>
                    <label htmlFor="Description">Profile</label>
                    <textarea name="Description" id="Description"
                        value={currentData.Description}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Describe your professional background..."
                    />
                    <div className="character-count">
                        {charCount}/{maxChars} characters
                    </div>
                </form>
            </div>
        </div>
    )
}