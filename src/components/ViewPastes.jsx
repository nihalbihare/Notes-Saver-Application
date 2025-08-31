
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams  } from 'react-router-dom';


const ViewPastes = () => {
  const {id} = useParams();
  const allPastes = useSelector((state)=>state.paste.pastes);
  const paste = allPastes.find((p)=>p._id === id);
  console.log(paste)
 
  return (
    <div>
       <div>
           <div className="flex flex-row gap-7 place-content-between">
            <input 
                className='p-2 rounded-2xl mt-2
                w-[66%] pl-4'
                type='text'
                placeholder='Enter title here'
                value={paste.title}
                disabled
                onChange={(e) => setTitle(e.target.value)
                  
                }
            />
            {/* it handle the click responsible for updation and creation */}
        
        </div>
        {/* track the value  */}
        <div className='mt-8'>
            <textarea 
            className="rounded-2xl mt-4
         min-w-[500px] p-4"
            value={paste.content}
            placeholder='enter the content here'
            onChange={(e) => setValue(e.target.value)}
            rows={20}
            disabled/>

        </div>
       </div>
      
    </div>
  )
}


export default ViewPastes
