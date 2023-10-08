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
import { Link } from 'react-router-dom'


function Page() {

  const [basicModal, setBasicModal] = useState(false);
  const [page, setPage] = useState([])
  const [enable, setEnable] = useState(false);
  const [edit, setEdit] = useState(false);
  const initialFValues = {
    title: '',
    slug: '',
    content: '',
    id: 0
  }
  const [formValue, setFormValue] = useState(initialFValues);
  const toggleShow = () => {
    setBasicModal(!basicModal)
    setEnable(false)
    setFormValue(initialFValues)
  }
  const openModal = async (e) => {
    toggleShow()
    setEdit(false)

  }
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const getPages = async (e) => {

    await axios.get(`${process.env.REACT_APP_BASE_URL}pages/view`).then((response) => {
      setPage((response.data.pages).reverse())
    });
  }

  function pageSubmit(event) {
    if (formValue.slug == '') {
      toast.error("Missing Slug", { theme: 'colored' })
    }
    if (formValue.content == '') {
      toast.error("Missing Content", { theme: 'colored' })
    }
    if (formValue.title == '') {
      toast.error("Missing Title", { theme: 'colored' })
    }
    if ((formValue.slug != '') && (formValue.title != '') && (formValue.content != '')) {
      event.preventDefault()
      setEnable(true)
      const post = {
        "slug": formValue.slug,
        "content": formValue.content,
        "title": formValue.title,

      }

      axios.post(`${process.env.REACT_APP_BASE_URL}pages/create`, post)
        .then(responce => {
          toggleShow()
          setEnable(true)
          getPages()
          setFormValue(initialFValues)
          toast.success("Page Add Successfully", { theme: 'colored' })

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
    getPages()

  }, [])

  function deletePage(id) {

    axios.delete(`${process.env.REACT_APP_BASE_URL}pages/delete/${id}`)
      .then(responce => {
        setEnable(true)
        toast.success("Page Deleted", { theme: 'colored' })
        getPages();
        console.log(responce)
      })
      .catch(err => console.log(err))
  }
  function EditPageOpenModal(pageObj) {
    setEdit(true)
    toggleShow()
    setFormValue({
      slug: pageObj.slug,
      title: pageObj.title,
      id: pageObj.id,
      content: pageObj.content,

    })



  }
  function pageEdit() {

    if (formValue.slug == '') {
      toast.error("Missing Slug", { theme: 'colored' })
    }
    if (formValue.content == '') {
      toast.error("Missing Content", { theme: 'colored' })
    }
    if (formValue.title == '') {
      toast.error("Missing Title", { theme: 'colored' })
    }
    if ((formValue.slug != '') && (formValue.title != '') && (formValue.content != '')) {
      setEnable(true)
      const post = {
        "id": formValue.id,
        "slug": formValue.slug,
        "title": formValue.title,
        "content": formValue.content,

      }
      axios.post(`${process.env.REACT_APP_BASE_URL}pages/create`, post)
        .then(responce => {
          toggleShow()
          setEnable(true)
          getPages()
          setFormValue(initialFValues)
          toast.success("Page Edit Successfully", { theme: 'colored' })

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
            <MDBTable bordered>
              <MDBTableHead>
                <tr>
                  <th scope='col'>Index</th>
                  <th scope='col'>Slug</th>
                  <th scope='col'>Title</th>
                  <th scope='col'>Content</th>
                  <th scope='col'>Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {page.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.slug}</td>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                      <td>
                        <MDBBtn className='me-1' color='success' onClick={() => EditPageOpenModal(page[index])} >Edit</MDBBtn>
                        <MDBBtn className='me-1' color='danger' onClick={() => deletePage(item.id)}>Delete</MDBBtn>
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
              <MDBModalTitle>Pages</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody> <MDBValidation className='row g-3'>

              <MDBValidationItem className='col-md-12'>
                <MDBInput
                  value={formValue.title}
                  name='title'
                  onChange={onChange}
                  id='validationCustom01'
                  required
                  label='Title'
                />
              </MDBValidationItem>
              <MDBValidationItem className='col-md-12'>
                <MDBInput
                  value={formValue.slug}
                  name='slug'
                  onChange={onChange}
                  id='validationCustom02'
                  required
                  label='Slug'
                />
              </MDBValidationItem>
              <MDBValidationItem className='col-md-12'>
                <MDBInput
                  value={formValue.content}
                  name='content'
                  onChange={onChange}
                  id='validationCustom02'
                  required
                  label='Content'
                />
              </MDBValidationItem>





            </MDBValidation></MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>

              {!edit && <MDBBtn onClick={pageSubmit} disabled={enable}>Save changes</MDBBtn>}
              {edit && <MDBBtn disabled={enable} onClick={pageEdit}>Edit changes</MDBBtn>}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <ToastContainer />
    </>
  )
}

export default Page