import React, { useContext,useState } from 'react'
import noteContext from '../context/notes/notecontext'
import { Card,Modal  } from 'antd';
import Cancel from '../components/Cancel5.gif'


function Noteitem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context
    const { note, updateNote, viewNoteFunc, viewNote } = props

    // const OpenModal = () => {
    //     if (note.description.length > 60 || note.title.length > 20) {
    //         viewNoteFunc(note);
    //         let newCard = document.getElementById('OpenModal')
    //         newCard.style.display = 'block'
    //     }
    // }



    // const closeCard = () => {
    //     let newCard = document.getElementById('OpenModal')
    //     newCard.style.display = 'none'
    // }
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
        deleteNote(note._id);
        setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);

    const showTextModal = () => {
        if (note.description.length > 60 || note.title.length > 20) {
                setIsTextModalOpen(true);
                viewNoteFunc(note);
        }
    };
  
    const handleTextOk = () => {
        setIsTextModalOpen(false);
    };
  
    const handleTextCancel = () => {
      setIsTextModalOpen(false);
    };
    

    return (
        <>
            
            <div className='col-md-3 '>
                <div className="card my-3" style={{background: '#343a40',border: '2px solid', borderColor: tagBackgroud(note.tag) || "#eb2f06",boxShadow: `0px 0px 7px${tagBackgroud(note.tag) || "#eb2f06"}`}}><span style={{ background: tagBackgroud(note.tag) || "#eb2f06"}} class="position-absolute top-0 start-50 p-2 translate-middle badge badge-pill badge-dark">{note.tag}</span>

                    <div className="card-body" id='card-img' onClick={showTextModal}>
                        <h5 className="card-title" style={{color: 'white'}}>{note.title.length > 20 ? `${note.title.substring(0, 20)} . . .` : note.title}</h5>
                        <p className="card-text" style={{color: 'white'}}>{note.description.length > 60 ? `${note.description.substring(0, 60)} . . .` : note.description}</p>
                    </div>
                    <div className='UpdateDeleteIcon d-flex'>
                        <i className="fa-solid fa-trash mx-2" onClick={showModal}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>

                </div>
            </div>
            


<Modal  open={isModalOpen} onOk={handleOk} okButtonProps={{style : {background: '#eb2f06'}}} cancelButtonProps={{style: {background: '#66fcf1'}}} onCancel={handleCancel}>
    <div style={{display: 'flex', flexDirection:'column'}}>
<p style={{textAlign: 'center',color: 'white'}}>Are you sure you want to delet this note permanently ?</p>
<img style={{marginInline: 'auto', height:'200px'}} className='imgModal's src={Cancel} alt="" />
    </div>
      </Modal>
      <Modal open={isTextModalOpen} onOk={handleTextOk} okButtonProps={{style : {display: 'none'}}} cancelButtonProps={{style: {display: 'none'}}} onCancel={handleTextCancel}>
      <div >
        <h2 style={{color: 'white'}}>{note.title.length > 20 ? `${note.title.substring(0, 20)} . . .` : note.title}</h2>
               <hr style={{background: 'white',height: '2px'}}/>
                <p style={{color: 'white'}}>{viewNote.description}</p>

            </div>
      </Modal>


        </>
    )
}

export default Noteitem