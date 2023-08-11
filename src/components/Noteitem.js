import React, { useContext } from 'react'
import noteContext from '../context/notes/notecontext'
import { Card } from 'antd';


function Noteitem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context
    const { note, updateNote, viewNoteFunc, viewNote } = props

    const OpenModal = () => {
        if (note.description.length > 60 || note.title.length > 20) {
            viewNoteFunc(note);
            let newCard = document.getElementById('OpenModal')
            newCard.style.display = 'block'
        }
    }



    const closeCard = () => {
        let newCard = document.getElementById('OpenModal')
        newCard.style.display = 'none'
    }
    const tagBackgroud = (tag) => {
        const tagbg = {
            "Personal": "#34ace0",
            "Genral": "#2ecc71",
            "celebration": "#b71540",
            "Important": "#ff5252",
            "Quote": "#16a085",
            "Study": "blue",
            "Event": "#8e44ad",
            "Project": "#d35400",
            "Statement": "#fed330"

        }
        return tagbg[tag]
    }

    const ConfirmDeletCard = () => {
        const CardDelet = document.getElementById('DeletConfirm')
        CardDelet.style.display = 'block'
    }

    return (
        <>

            <div className='col-md-3 '>
                <div className="card my-3" ><span style={{ background: tagBackgroud(note.tag) }} class="position-absolute top-0 start-50 p-2 translate-middle badge badge-pill badge-dark">{note.tag}</span>

                    <div className="card-body" id='card-img' onClick={OpenModal}>
                        <h5 className="card-title">{note.title.length > 20 ? `${note.description.substring(0, 20)} . . .` : note.title}</h5>
                        <p className="card-text">{note.description.length > 60 ? `${note.description.substring(0, 60)} . . .` : note.description}</p>
                    </div>
                    <div className='UpdateDeleteIcon d-flex'>
                        <i className="fa-solid fa-trash mx-2" onClick={ConfirmDeletCard}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>

                </div>
            </div>
            <Card title={viewNote.title} id='OpenModal' bordered={false}>
                <p>{viewNote.description}</p>
                <i onClick={closeCard} class="fa-solid fa-x"></i>

            </Card>

            <div id='DeletConfirm' class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Are you sure you want to delet this note permanently</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cencel</button>
                            <button type="button" onClick={() => { deleteNote(note._id); props.showAlert("Delted successfully", "success") }} class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}

export default Noteitem