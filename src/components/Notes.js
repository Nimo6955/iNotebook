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
    
    const [viewNote, setViewNote] = useState({title: "", description: "", tag: ""});

    const viewNoteFunc = (note) => {
        setViewNote({title: note.title, description: note.description, tag: note.tag});
    }
    
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
        <div style={{background: '#0b0c10',height:'100vh',}}>

            <AddNote showAlert={showAlert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={{background:'#0b0c10'}}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{color:'white'}}>Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" style={{color:'white'}}>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" style={{color:'white'}}>Title</label>
                                <input style={{background:'#0b0c10',color:'white',border:'2px solid #66fcf1'}} type="text" className="form-control" key='etitle' id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" placeholder="" onChange={onchange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" style={{color:'white'}}>Description</label>
                                <textarea style={{background:'#0b0c10',color:'white',border:'2px solid #66fcf1'}} type="text" className="form-control" key='edescription' id="edescription" name="edescription" value={note.edescription} placeholder="" onChange={onchange} ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" style={{color:'white'}}>Tag</label>
                                <input style={{background:'#0b0c10',color:'white',border:'2px solid #66fcf1'}} type="text" className="form-control" key='etag' id="etag" name="etag" value={note.etag} placeholder="" onChange={onchange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal" style={{borderRadius:'10px'}}>Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleOnClick} className="btn btn-primary" style={{background:'#66fcf1',color:'black',borderRadius:'10px',outline:'none',border:'none'}}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mx-5'>

                <h2 id='NoteHeading' className='text-white glow' style={{marginTop: '10px'}}>{notes.length===0 || 'Your Notes'}</h2>
                <div style={{textAlign:'center', color:'gray'}} className="container">
                <h2 className='glow'>{notes.length===0 && 'No notes to display'}</h2>
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert={showAlert} viewNote={viewNote} viewNoteFunc={viewNoteFunc} updateNote={updateNote} note={note} />
                })}
            </div>
           
        </div>
            
        </>
    )
}
export default Notes