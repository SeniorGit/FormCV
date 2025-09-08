import { useState } from 'react'
import './App.css'
import { PersonalInformation } from './component/PersonalInformation'
import { Paper } from './component/Paper'
import { Profile } from './component/Profil'
import { Experience } from './component/Experience'
import { Certificate } from './component/certificate'
import { Education } from './component/Education'
import { Skills } from './component/Skill'
function App() {
   
    const [CvData, setCvData] = useState({
        DataPersonal : {
            Fname: "James",
            Lname: "Bond",
            phone: "+1 23456789",
            Email: "bond1@gmail.com",
            Linkedin: "JamesBond",
            Proto: "https://JamesBond",
            Address: "USA, Florida",
            Description: "Secret agen"
        },
        DataExperience : [
            {
                id: Date.now(),
                Position:"Frontend Web Developer - Apprenticeship",
                Company:"Secret Service",
                SDate:"2024-09-01",
                EDate:"2025-01-01",
                Description:"Creating the frontend",
                Working: false

            }
        ],
        DataEducation : [
            {
                id: Date.now(),
                LEducation: "University",
                NInstitution: "Havard University",
                Major: "Computer Science",
                Start: "2021-08-01",
                End: "2025-02-28"
            }
        ], 
        DataCertificate : [
            {
                id: Date.now(),
                CName: "Certified Network Defender (CND)",
                Organization: "EC-Council",
                DPublish: "2024-07-01",
                DEnd: "2027-07-01",
                Description: ""
            }
        ],
        DataSkills : [{
            id: Date.now(), 
            SkillName: "Java Script"
        }]
        
    })
    
  const updateSection = (sectionName, newData) => {
    setCvData(prevState => ({
      ...prevState,
      [sectionName]:newData
    }))
  }
  return (
    <div className='container'>
      <div className='forms-section'>
        <PersonalInformation
          currentData={CvData.DataPersonal}
          onUpdate={(newData)=> updateSection('DataPersonal', newData)}
        />

        <Profile
          currentData={CvData.DataPersonal}
          onUpdate={(newData)=> updateSection('DataPersonal', newData)}
        />
        
        <Experience
          currentData={CvData.DataExperience}
          onUpdate={(newData)=> updateSection('DataExperience', newData)}
        />
        <Education
          currentData={CvData.DataEducation}
          onUpdate={(newData)=> updateSection('DataEducation', newData)}
        />
        <Certificate
          currentData={CvData.DataCertificate}
          onUpdate={(newData)=> updateSection('DataCertificate', newData)}
        />
        <Skills
          currentData={CvData.DataSkills}
          onUpdate={(newData)=> updateSection('DataSkills', newData)}
        />
      </div>

      <div className='preview-section'>
        <Paper data={CvData}/>
      </div>
    </div>
  )
}

export default App

