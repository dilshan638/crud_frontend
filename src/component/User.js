import React, { useState, useEffect } from 'react'
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBTable, MDBTableHead, MDBTableBody, MDBValidation,
    MDBValidationItem,
    MDBInput,

} from 'mdb-react-ui-kit';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom'


function User() {

    const [basicModal, setBasicModal] = useState(false);
    const [basicModal_pw, setBasicModalPW] = useState(false);
    const [user, setUser] = useState([])
    const [enable, setEnable] = useState(false);
    const [view_password, setViewPassword] = useState('');
    const [edit, setEdit] = useState(false);
    const initialFValues = {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
        id: 0,
    }
    const [formValue, setFormValue] = useState(initialFValues);
    const toggleShow = () => {
        setBasicModal(!basicModal)
        setEnable(false)
        setFormValue(initialFValues)
    }
    const toggleShowPW = () => {
        setBasicModalPW(!basicModal_pw)
        //setFormValue(initialFValues)
    }
    const openModal = async (e) => {
        toggleShow()
        setEdit(false)

    }

    function openModalPW(password) {
        toggleShowPW()
        const bytes = CryptoJS.AES.decrypt(password, "HaSHKeyop3NadM!#@!");
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        setViewPassword(decryptedText)
  }
    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };
    const getUsers = async (e) => {

        await axios.get(`${process.env.REACT_APP_BASE_URL}users/view`).then((response) => {
            setUser((response.data.user).reverse())
        });
    }

    function userSubmit(event) {
        if (formValue.email == '') {
            setEnable(false)
            toast.error("Missing Email", { theme: 'colored' })
        }
        if (formValue.first_name == '') {
            toast.error("Missing First name", { theme: 'colored' })
        }
        if (formValue.last_name == '') {
            setEnable(false)
            toast.error("Missing Last name", { theme: 'colored' })
        }
        if (formValue.password == '') {
            setEnable(false)
            toast.error("Missing Password", { theme: 'colored' })
        }
        if (formValue.confirm_password == '') {
            setEnable(false)
            toast.error("Missing Confirm Password", { theme: 'colored' })
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        emailPattern.test(formValue.email)
        if (!emailPattern.test(formValue.email)) {
            setEnable(false)
            toast.error("Please Check Email", { theme: 'colored' })
        }

        if (formValue.confirm_password != formValue.password) {
            setEnable(false)
            toast.error("Does Not Match Password", { theme: 'colored' })
        }



        if ((emailPattern.test(formValue.email)) && (formValue.first_name != '') && (formValue.last_name != '') && (formValue.confirm_password == formValue.password)) {
            event.preventDefault()
            setEnable(true)
            const post = {
                "email": formValue.email,
                "first_name": formValue.first_name,
                "last_name": formValue.last_name,
                "password": formValue.password,

            }

            axios.post(`${process.env.REACT_APP_BASE_URL}users/create`, post)
                .then(responce => {
                    console.log(responce)
                    toggleShow()
                    setEnable(true)
                    getUsers()
                    setFormValue(initialFValues)
                    toast.success("User Created Successfully, Please check this email", { theme: 'colored' })

                })
                .catch(err => {
                    console.log(err)
                    setEnable(false)
                    if (err.response.status === 400 || err.response.status === 409) {
                        toast.error(err.response.data.status, { theme: 'colored' })
                    } else {
                        toast.error("sorry... the backend server is down!! please try again later", { theme: 'colored' })
                    }
                })


        }



    }
    useEffect(() => {
        getUsers()

    }, [])

    function deleteUser(id) {

        axios.delete(`${process.env.REACT_APP_BASE_URL}users/delete/${id}`)
            .then(responce => {
                setEnable(true)
                toast.success("User Deleted", { theme: 'colored' })
                getUsers();
            })
            .catch(err => console.log(err))
    }
    function EditUserOpenModal(userObj) {
        setEdit(true)
        toggleShow()
        var bytes_pw = CryptoJS.AES.decrypt(userObj.password, "HaSHKeyop3NadM!#@!");
        var decryptedText_pw = bytes_pw.toString(CryptoJS.enc.Utf8);

        setFormValue({
            email: userObj.email,
            first_name: userObj.first_name,
            last_name: userObj.last_name,
            password: decryptedText_pw,
            confirm_password: decryptedText_pw,
            id: userObj.id,

        })



    }
    function userEdit() {

        if (formValue.email == '') {
            setEnable(false)
            toast.error("Missing Email", { theme: 'colored' })
        }
        if (formValue.first_name == '') {
            toast.error("Missing First name", { theme: 'colored' })
        }
        if (formValue.last_name == '') {
            setEnable(false)
            toast.error("Missing Last name", { theme: 'colored' })
        }
        if (formValue.password == '') {
            setEnable(false)
            toast.error("Missing Password", { theme: 'colored' })
        }
        if (formValue.confirm_password == '') {
            setEnable(false)
            toast.error("Missing Confirm Password", { theme: 'colored' })
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        emailPattern.test(formValue.email)
        if (!emailPattern.test(formValue.email)) {
            setEnable(false)
            toast.error("Please Check Email", { theme: 'colored' })
        }

        if (formValue.confirm_password != formValue.password) {
            setEnable(false)
            toast.error("Does Not Match Password", { theme: 'colored' })
        }



        if ((emailPattern.test(formValue.email)) && (formValue.first_name != '') && (formValue.last_name != '') && (formValue.confirm_password == formValue.password)) {
            setEnable(true)
            const post = {
                "id": formValue.id,
                "email": formValue.email,
                "first_name": formValue.first_name,
                "last_name": formValue.last_name,
                "password": formValue.password,

            }
            axios.post(`${process.env.REACT_APP_BASE_URL}users/create`, post)
                .then(responce => {
                    toggleShow()
                    setEnable(true)
                    getUsers()
                    setFormValue(initialFValues)
                    toast.success("User Edit Successfully", { theme: 'colored' })

                })
                .catch(err => {
                    console.log(err)
                    setEnable(false)
                    if (err.response.status === 400 || err.response.status === 409) {
                        toast.error(err.response.data.status, { theme: 'colored' })
                    } else {
                        toast.error("sorry... the backend server is down!! please try again later", { theme: 'colored' })
                    }
                })

        }




    }
    return (
        <>

            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>
                        <Link to='/'>
                            <MDBBtn className='me-1' color='warning' >Dashboard</MDBBtn>
                        </Link>

                        <MDBBtn onClick={openModal}>Add New ++</MDBBtn></MDBCardTitle>
                   <MDBCardText>
                      <MDBValidationItem className='col-md-12'>
                               
                            </MDBValidationItem>

                            <MDBTable bordered>
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>Index</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>First Name</th>
                                    <th scope='col'>Last Name</th>
                                    <th scope='col'>Password</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {user.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.email}</td>
                                            <td>{item.first_name}</td>
                                            <td>{item.last_name}</td>
                                            <td><MDBBtn color='link' onClick={() => openModalPW(item.password)} >View Password</MDBBtn></td>
                                            <td>
                                                <MDBBtn className='me-1' color='success' onClick={() => EditUserOpenModal(user[index])} >Edit</MDBBtn>
                                                <MDBBtn className='me-1' color='danger' onClick={() => deleteUser(item.id)}>Delete</MDBBtn>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </MDBTableBody>
                        </MDBTable>
                    </MDBCardText>

                </MDBCardBody>
            </MDBCard>


            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>User</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody> <MDBValidation className='row g-3'>

                            <MDBValidationItem className='col-md-12'>
                                <MDBInput
                                    value={formValue.email}
                                    name='email'
                                    onChange={onChange}
                                    id='validationCustom01'
                                    required
                                    label='Email'
                                />
                            </MDBValidationItem>
                            <MDBValidationItem className='col-md-12'>
                                <MDBInput
                                    value={formValue.first_name}
                                    name='first_name'
                                    onChange={onChange}
                                    id='validationCustom02'
                                    required
                                    label='First Name'
                                />
                            </MDBValidationItem>
                            <MDBValidationItem className='col-md-12'>
                                <MDBInput
                                    value={formValue.last_name}
                                    name='last_name'
                                    onChange={onChange}
                                    id='validationCustom02'
                                    required
                                    label='Last Name'
                                />
                            </MDBValidationItem>

                            <MDBValidationItem className='col-md-12'>
                                <MDBInput
                                    value={formValue.password}
                                    name='password'
                                    onChange={onChange}
                                    id='validationCustom02'
                                    required
                                    label='Password'
                                    type="password"
                                />
                            </MDBValidationItem>
                            <MDBValidationItem className='col-md-12'>
                                <MDBInput
                                    value={formValue.confirm_password}
                                    name='confirm_password'
                                    onChange={onChange}
                                    id='validationCustom02'
                                    required
                                    label='Confirm Password'
                                    type="password"
                                />
                            </MDBValidationItem>





                        </MDBValidation></MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Close
              </MDBBtn>

                            {!edit && <MDBBtn onClick={userSubmit} disabled={enable}>Save changes</MDBBtn>}
                            {edit && <MDBBtn disabled={enable} onClick={userEdit}>Edit changes</MDBBtn>}
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            <MDBModal show={basicModal_pw} setShow={setBasicModalPW} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Password</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShowPW}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody> <MDBValidation className='row g-3'>
                        </MDBValidation></MDBModalBody>
                        <MDBValidationItem className='col-md-12'>
                            <MDBInput
                                value={view_password}
                                name='view_password'
                                onChange={onChange}
                                id='validationCustom02'
                                required
                                label='View Password'
                                disabled="true"
                            />
                        </MDBValidationItem>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShowPW}>
                                Close
              </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <ToastContainer />
        </>
    )
}

export default User