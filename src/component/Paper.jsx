import "./styles/Paper.css"
export function Paper({data}){
    return(
        <div className="A4Paper">
            <div className="PPersonal">
                <div className="Name">
                    <h1>{data.DataPersonal.Fname}</h1>
                    <h1>{data.DataPersonal.Lname}</h1>
                </div>
                <div className="DetailPersonal">
                    <p>{data.DataPersonal.phone}</p>
                    <p>{data.DataPersonal.Email}</p>
                    <a href={data.DataPersonal.Linkedin}>Linkedin</a>
                    <a href={data.DataPersonal.Proto}>Phortofolio</a>
                    <p>{data.DataPersonal.Address}</p>
                </div>
            </div>
            <div className="PProfile">
                <h2>Profil</h2>
                <p>{data.DataPersonal.Description}</p>
            </div>
            <div className="PExperience">
                <h2>Experience</h2>
                {data.DataExperience.map((e)=>(
                    <div key={e.id}>
                        <div className="PexperienceHeader">
                            <div>
                                <h3>{e.Position}</h3>
                            </div>
                            <div className="PexDate">
                                <p>{e.SDate}</p>
                                <p>-</p>
                                <p>{e.Working ? "Present": e.EDate}</p>
                            </div>
                        </div>
                        
                        <h3>{e.Company}</h3>
                        <div className="Pdesk">
                            <p>{e.Description}</p>

                        </div>
                    </div>
                ))}
            </div>
            <div className="PEducation">
                <h2>Education</h2>
                {data.DataEducation.map((e)=>(
                    <div key={e.id}>
                        
                        <div className="PEduHead">
                            <div>
                                <h3>{e.NInstitution}</h3>
                            </div>
                            <div className="PeduDate">
                                <p>{e.Start}</p>
                                <p>-</p>
                                <p>{e.End}</p>
                            </div>
                        </div>
                        <h3>{e.Major}</h3>
                    </div>
                ))}
            </div>
            <div className="PSertificate">
                <h2>Sertificate</h2>
                {data.DataCertificate.map((e)=>(
                    <div key={e.id}>
                        <div className="PSerHead">
                           <div >
                                <h3>{e.CName}</h3>
                            </div> 
                           <div className="PSerDate">
                                <p>{e.DPublish}</p>
                                <p>-</p>
                                <p>{e.DEnd}</p>
                           </div>
                        </div>
                        <h3>{e.Organization}</h3>
                        <p>{e.Description}</p>
                    </div>
                ))}
            </div>
            <div className="PSkill">
                <h2>Skill</h2>
                {data.DataSkills.map((e)=>(
                    <div key={e.id}>
                        <h3>{e.SkillName}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}