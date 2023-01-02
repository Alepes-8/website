import axios from 'axios';
import { useEffect, useState } from 'react';
const baseUrl='http://127.0.0.1:8000/contact/';
function ContactUsPage(){

    const [ContactData, setContactData]=useState({
        'full_name':'',
        'email':'',
        'query':'',
        'status':'',
    });

    const handleChange=(event)=>{
        setContactData({
            ...ContactData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const contactFormData=new FormData();
        contactFormData.append('full_name', ContactData.full_name)
        contactFormData.append('email', ContactData.email)
        contactFormData.append('query', ContactData.query)

        try{
            axios.post(baseUrl, contactFormData).then((response)=>{
                setContactData({
                    'full_name':'',
                    'email':'',
                    'query':'',
                    'status':'success',
                });
            });
        }catch(error){
            console.log(error);
            setContactData({'status':'error'});
        }
    }
    useEffect(()=>{
        document.title="Contact Us"
    });

    return (
        <div className='baseBackground'>
            <div className='row'>
                <div className='col'>
                    {ContactData.status==='success' && <p className='text-success'>Thanks for the Message</p>}
                    {ContactData.status==='error' && <p className='text-error'>Something went wrong!!</p>}
                    <div className='card'>
                        <h5 className='card-header'>Contact Us</h5>
                        <div className='card-body'>
                            {/* <form> */}
                                <div className='login_form'>
                                    <label className='form-label'>Full Name</label>
                                    <input value={ContactData.full_name} onChange={handleChange} name="full_name" type="text" className="form-control" />
                                </div>
                                <div className='login_form'>
                                    <label className='form-label'>Email</label>
                                    <input value={ContactData.email} onChange={handleChange} name="email" type="email" className="form-control" />
                                </div>
                                <div className='login_form'>
                                    <label className='form-label'>Query</label>
                                    <textarea rows={10} value={ContactData.query} onChange={handleChange} name="query" className="form-control"></textarea>
                                </div>
                                <button onClick={submitForm} type="submit" className='btn'>Submit</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUsPage;