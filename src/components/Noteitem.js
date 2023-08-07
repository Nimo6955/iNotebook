import React, { useContext } from 'react'
import noteContext from '../context/notes/notecontext'


function Noteitem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context
    const { note, updateNote } = props

    const OpenModal = () => {
        let newCard = document.getElementById('OpenModal')
        newCard.style.display = 'block'
    }


    return (
        <>
            <div className='col-md-3'>
                <div className="card my-3" ><span class="position-absolute top-0 start-50 p-2 translate-middle badge badge-pill badge-dark">{note.tag}</span>

                    <div className="card-body" onClick={OpenModal}>
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description.length > 60 ? `${note.description.substring(0, 60)} . . .` : note.description}</p>
                    </div>
                    <div className='UpdateDeleteIcon d-flex'>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Delted successfully", "success") }}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>

                </div>

            </div>
            <div className='OpenModal' id='OpenModal'>
                <h1>{note.title}</h1>
                <p>{note.description}</p>
            </div>
        </>
    )
}

export default Noteitem