import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/notecontext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
    const {showAlert} = props

    const context = useContext(noteContext);
    let navigate = useNavigate()
    const { notes, getNote, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote()
        }
        else{
            navigate('/login')
        }

        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
    
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
        
    }

    const handleOnClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updete successfully", "success")
    }
    const onchange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
            <AddNote showAlert={showAlert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">title</label>
                                <input type="text" className="form-control" key='etitle' id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" placeholder="" onChange={onchange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Description</label>
                                <textarea type="text" className="form-control" key='edescription' id="edescription" name="edescription" value={note.edescription} placeholder="" onChange={onchange} ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Tag</label>
                                <input type="text" className="form-control" key='etag' id="etag" name="etag" value={note.etag} placeholder="" onChange={onchange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleOnClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3 mx-5'>

                <h2>your Notes</h2>
                <div className="container">
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert={showAlert}  updateNote={updateNote} note={note} />
                })}
            </div>
           
                
        </>
    )
}
export default Notes