import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { debounce } from 'lodash'
import { useNavigate } from 'react-router-dom'

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false)
  const [showModalB, setShowModalB] = useState(false)
  const [showModalC, setShowModalC] = useState(false)
  const [contacts, setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [onlyEven, setOnlyEven] = useState(false)
  const navigate = useNavigate()
  
  const fetchContacts = async (usOnly = false, search = '') => {
    const url = `https://contact.mediusware.com/api/contacts/?search=${search}`

    try {
      const response = await axios.get(url)
      console.log(response)
      const fetchedContacts = usOnly
        ? response.data.filter((contact) => contact.country === 'US')
        : response.data
      setContacts(fetchedContacts)
    } catch (error) {
      console.error('Error fetching contacts:', error.response.data)
    }
  }

  // Toggle Handlers
  const handleOpenModalA = () => {
    setShowModalA(true)
    fetchContacts(false)
  }
  const handleOpenModalB = () => {
    setShowModalB(true)
    fetchContacts(true)
  }
  useEffect(() => {
    if (showModalA || showModalB) {
      fetchContacts(showModalB, searchTerm)
    }
  }, [showModalA, showModalB, searchTerm, onlyEven])
  const handleSearch = debounce((value) => {
    setSearchTerm(value)
  }, 300)

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <Button
            className="btn btn-lg"
            style={{ backgroundColor: '#46139f' }}
            onClick={handleOpenModalA}
          >
            All Contacts
          </Button>
          <Button
            className="btn btn-lg"
            style={{ backgroundColor: '#ff7f50' }}
            onClick={handleOpenModalB}
          >
            US Contacts
          </Button>
        </div>
        <Modal show={showModalA} onHide={() => setShowModalA(false)}>
          <Modal.Header closeButton>
            <Modal.Title>All Contacts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
           
            {Array.isArray(contacts) &&
              contacts.map((contact) => (
                <div onClick={() => setShowModalC(true)}>{contact.name}</div>
              ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleOpenModalA}>
              All Contacts
            </Button>
            <Button variant="warning" onClick={handleOpenModalB}>
              US Contacts
            </Button>
            <Button variant="secondary" onClick={() => setShowModalA(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default Problem2
