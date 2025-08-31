import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams  } from 'react-router-dom';
import { addPaste, updatePaste } from '../redux/paste-slice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [searchParams , setSearchParams] = useSearchParams(); 
    const [value , setValue] = useState('')
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state)=>state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId); 
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            } 
        }
    }, [pasteId, allPastes]);
    function createPaste(){
        const paste ={
            title:title,
            content : value,
            _id : pasteId || Date.now().toString(36),
            createdAt :new Date().toISOString(),
        }
      
        
        if(pasteId){
            //update the paste
            dispatch(updatePaste(paste));
            
        }
        else{
            //create the paste
            dispatch(addPaste(paste)); // it provide the paste to payload
        }
        //after creation or updation clear paste from UI
        setTitle('');
        setValue('');
        setSearchParams({});

    }

    return (
    //track the title 
       <div>
           <div className="flex flex-row gap-7 place-content-between">
            <input 
                className='p-2 rounded-2xl mt-2
                w-[66%] pl-4'
                type='text'
                placeholder='Enter title here'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {/* it handle the click responsible for updation and creation */}
        
            <button onClick={createPaste} className='p-2 rounded-2xl mt-2'>
                {pasteId ? "Update My Paste" : "Create Paste"}
            </button>
        </div>
        {/* track the value  */}
        <div className='mt-8'>
            <textarea 
            className="rounded-2xl mt-4
         min-w-[500px] p-4"
            value={value}
            placeholder='enter the content here'
            onChange={(e) => setValue(e.target.value)}
            rows={20}/>

        </div>
       </div>
    );
} 

export default Home;
