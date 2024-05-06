import {useState} from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import {db} from './fbconfig';

function UpdateComponent({id, initialTitle, initialTagline, initialContent, initialImageURL, onUpdated})
{
    const [title, setTitle] = useState(initialTitle);
    const [tagline, setTagline] = useState(initialTagline);
    const [content, setContent] = useState(initialContent);
    const [imageURL, setImageURL] = useState(initialImageURL);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const documentRef = doc(db, "data", id);
        try{
            await updateDoc(documentRef, {Title: title, Tagline: tagline, Content: content, ImageURL: imageURL});
            onUpdated();
        }
        catch(error)
        {
            console.error("Problem updating document: ", error);
        }
    }
    
    return (
        <>
            <form onSubmit={handleUpdate} className='form-group bg-light rounded p-3 mt-5'>
                <input type='text' className='form-control mb-3' value={title} onChange={e=>setTagline(e.target.value)} placeholder='Title' />
                <input type='text' className='form-control mb-3' value={tagline} onChange={e=>setTagline(e.target.value)} placeholder='Tagline' />
                <textarea className='form-control mb-3' value={content} onChange={e=>setContent(e.target.value)} placeholder=''></textarea>
                <input type='file' className='form-control mb-3' value={imageURL} onChange={e=>setImageURL(e.target.files[0])} />
                <button className='btn btn-info'>Update document</button>
            </form>
        </>
    );
}
export default UpdateComponent;