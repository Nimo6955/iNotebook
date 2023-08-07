import React, { useContext, useState, useRef } from 'react'
import noteContext from '../context/notes/notecontext'
import { PlusOutlined } from '@ant-design/icons'; 
import { Divider, Input, Select, Space, Button } from 'antd';



function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  const handleOnClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
    setNote({ title: "", description: "", tag: "" })
    props.showAlert("Added successfully", "success")
    setSeed(Math.random());
    
    
  }
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  let index = 0;
  const [seed, setSeed] = useState(1);
  

    const [items, setItems] = useState(['Personal', 'Genral']);
       
    const [name, setName] = useState('');
    const inputRef = useRef  (null);

    const onNameChange = (event) => {
      setName(event.target.value);
    };

    const addItem = (e) => {
      e.preventDefault();
      setItems([...items, name || `New item ${index++}`]);
      setName('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    };
 

    return (

      <>
        <h2>Add a Note</h2>
        <form className='my-3 mx-5'>
          <div className="form-group ">
            <div className='d-flex'>
            <input type="text" className="form-control" style={{width: '800px', height: '33px'}} id="title" name="title" value={note.title} aria-describedby="emailHelp" placeholder="Title" onChange={onchange}></input>
          <div className='mx-3 '>

            
            
                  <Select className='tagNew' key={seed} id="tag"  name="tag"  onChange={(index) => {
             note.tag = index
            }}
                    style={{ width: 430 }}
                    placeholder="Tag (Optional)"
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space style={{ padding: '0 8px 4px' }}>
                          <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                          />
                          <Button style={{ marginLeft: '20px' }} type="text" icon={<PlusOutlined />} onClick={addItem}>
                            Add item
                          </Button>
                        </Space>
                      </>
                    )}
                    options={items.map((item) => ({ name: item, value: item }))} 
                    />
                 </div>
                </div>
          </div>
          <div className="form-group">
            <textarea type="text" style={{ height: '200px' }} className="form-control" id="description" name="description" value={note.description} placeholder="Description" onChange={onchange} />
          </div>
          {/* <div className="form-group">
    <label htmlFor="exampleInputPassword1">Tag</label>
    <input type="text" className="form-control" id="tag"  name="tag" value={note.tag} placeholder="" onChange={onchange}/>
  </div> */}


          <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleOnClick}>Submit</button>
        </form>

      </>
    )
  }

  export default AddNote