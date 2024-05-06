import {useState, useEffect} from 'react';
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore';
import {db} from './fbconfig';
import UpdateComponent from './UpdateComponent';

function ReadComponent()
{
    // state variables
    const ourCollection = collection(db, "data");
    const [readData, setReadData] = useState([]);
    const [update, setUpdate] = useState(null);

    // fetch data function
    const fetchData = async () => {
        try{
            const snapshot = await getDocs(ourCollection);
            setReadData(
                snapshot.docs.map(
                    doc => ({...doc.data(), id: doc.id})
                    )
            );
        }
        catch(error)
        {
            console.error("Error fetching data: ", error);
        }
    }

    useEffect(() => {fetchData()}, []);

    const handleRefresh = () =>
    {
        setUpdate(null);
        fetchData();
    }

    // Delete function
    const handleDelete = async (id) =>
    {
        const docRef = doc(db, "data", id);
        try{
            await deleteDoc(docRef);
        }
        catch(error)
        {
            console.error("Error deleting document: ", error);
        }
    }
    
    return(
        <>
        <div className='mt-3 border rounded shadow p-3'>
        {
            readData.map(
                ({id, Title, Tagline, Content, ImageURL}) => (
                    <div key={id}>
                        <h3>{Title}</h3>
                        <h4>{Tagline}</h4>
                        {ImageURL && 
                            <p className='text-center'>
                                <img src={ImageURL} className='img-fluid rounded border shadow' alt={Title} style={{width: "20%", height: "auto"}}  />
                            </p>
                        }
                        <p>{Content}</p>
                        <button className='btn btn-danger' onClick={()=>handleDelete(id)}>Delete Document</button>
                        {" "}
                        <button className='btn btn-info' onClick={()=>setUpdate(id)}>Edit / Update Document</button> 
                        <hr className='mb-3' />
                        {
                            update == id && (
                                <UpdateComponent
                                id={id}
                                initialTitle={Title}
                                initialTagline={Tagline}
                                initialContent={Content}
                                initialImageURL={ImageURL}
                                onUpdated={handleRefresh} />
                            )
                        }
                    </div>
                )
            )
        }
        </div>
        </>
    );
}

export default ReadComponent;