import "./styles/Certificate.css"
export function Certificate({currentData, onUpdate}){
    const handleChange = (index, field, value) => {
        const updateCertificate = [...currentData];
        updateCertificate[index][field] = value;
        onUpdate(updateCertificate)
    }
    return(
        <div className="Certificate">
            <div className="CertificateHeader">
                <h1>Certificate</h1>
            </div>
            {currentData.map((certificate, index)=>(
                <div key={certificate.id}>
                <form className="CertificateForm">
                    <label htmlFor={`CName-${index}`}>Certificate Name</label>
                    <input type="text" id={`CName-${index}`} name="CName" 
                        value={certificate.CName}
                        onChange={(e)=> handleChange(index, 'CName', e.target.value)}
                    />

                    <label htmlFor={`Organization-${index}`}>Organization</label>
                    <input type="text" id={`Organization-${index}`} name="Organization" 
                        value={certificate.Organization}
                        onChange={(e)=> handleChange(index, 'Organization', e.target.value)}
                        autoComplete="name"
                    />
                    <div className="CertifDate">
                        <div>
                            <label htmlFor={`DPublish-${index}`}>Date Published</label>
                            <input type="date" id={`DPublish-${index}`} name="DPublish"
                                value={certificate.DPublish}
                                onChange={(e)=> handleChange(index, 'DPublish', e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor={`DEnd-${index}`} >Date End</label>
                            <input type="date" id={`DEnd-${index}`} name="DEnd" 
                                value={certificate.DEnd}
                                onChange={(e)=> handleChange(index, 'DEnd', e.target.value)}
                            />
                        </div>
                    </div>
                    <label htmlFor={`Description-${index}`}>Description</label>
                    <textarea name="Description" id={`Description-${index}`}
                        value={certificate.Description}
                        onChange={(e)=> handleChange(index, 'Description', e.target.value)}
                    />
                </form> 
                </div>
            ))}
        </div>
    )
}