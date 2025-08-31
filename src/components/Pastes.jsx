import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removePaste } from '../redux/paste-slice';
import toast from 'react-hot-toast';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton } from 'react-share';

const Pastes = () => {
    const pastes = useSelector((state)=>state.paste.pastes);
    const [searchTerm  , setSearchTerm] = useState('');
    const [showShareOptions, setShowShareOptions] = useState(false);
    const dispatch = useDispatch();
    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );  

 
    function handleDelete(pasteId){
        dispatch(removePaste
            (pasteId));

    }
   
    
  return (
    <div>
        <input className='p-2 rounded-2xl min-w-[600px] mt-5'
        type='search'
        placeholder='search here'
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        />
        <div className='flex flex-col gap-5'>
            {
               filteredData.length > 0 &&
               filteredData.map(
                (paste)=>{
                    return (
                        <div key={paste._id||paste.id} className='border'>
                            <div>
                                {paste.title}
                            </div>
                            <div>
                                {paste.content}
                            </div>
                            <div className='flex flex-row gap-5 
                            place-content-evenly'>
                                <button>
                                    <a href={`/?pasteId=${paste._id}`}>  Edit</a>
                                  
                                </button>
                                <button>
                                <a href={`/pastes/${paste._id}`}>View</a>
                                </button>

                                <button onClick={()=>handleDelete(paste?._id)}>
                                   Delete
                                </button>
                                <button onClick={() => 
                                {navigator.clipboard.writeText(paste?.content)
                                    toast.success("copied to clipboard")
                                }}>
                                   Copy
                                </button>
                                <button  onClick={() => setShowShareOptions(!showShareOptions)}>
                                    Share
                                </button>
                                {showShareOptions && (
                                        <div className="flex flex-col gap-2 mt-2">
                                            <WhatsappShareButton url={paste.content}>
                                                WhatsApp
                                            </WhatsappShareButton>
                                            <FacebookShareButton url={paste.content} quote={paste.content}>
                                                Facebook
                                            </FacebookShareButton>
                                            <TwitterShareButton url={paste.content} title={paste.content}>
                                                Twitter
                                            </TwitterShareButton>
                                            <LinkedinShareButton url={paste.content}>
                                                LinkedIn
                                            </LinkedinShareButton>
                                        </div>
                                    )}
                            </div>
                            <div>
                                {paste.createdAt}
                            </div>
                        </div>
                    )
                }
            
               )  
            }         
        </div>
      
    </div>
  )
}

export default Pastes
