import {useState} from 'react';
import {collection, addDoc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {db, storage} from './fbconfig';

function CreateComponent()
{
    // state variables
    const [title, setTitle] = useState("");
    const [tagline, setTagline] = useState("");
    const [content, setContent] = useState("");

    const [image, setImage] = useState(null);

    const ourCollection = collection(db, "data");

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if(!image) return;
        const imageRef = ref(storage, `images/${image.name}`);

        try {
            const imageSnapShot = await uploadBytes(imageRef, image);
            const imageURL = await getDownloadURL(imageRef);
            await addDoc(ourCollection, {Title: title, Tagline: tagline, Content: content, ImageURL: imageURL});
            setTitle("");
            setTagline("");
            setContent("");
            setImage(null);
        }
        catch(error)
        {
            console.error("Error creating document: ", error);
        }
    }
    
    return(
        
            <form onSubmit={handleSubmit} className='form-group bg-dark rounded p-3'>
                <input className='form-control mb-3' type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' />

                <input className='form-control mb-3' type='text' value={tagline} onChange={e => setTagline(e.target.value)} placeholder='Tagline' />

                <textarea className='form-control mb-3' value={content} onChange={e => setContent(e.target.value)} placeholder='Content'></textarea>

                <input type='file' className='form-control mb-3' onChange={e=>setImage(e.target.files[0])} />

                <button className='btn btn-primary' type='submit'>Create Document</button>

            </form>
        
    );
}

export default CreateComponent;