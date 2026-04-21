import React, { useEffect, useState } from 'react'
import BlurCircle from '../components/BlurCircle'
import Loading from '../components/Loading'
import { useAppContext } from '../context/AppContext'

const Theaters = () => {
    const { axios } = useAppContext()
    const [theaters, setTheaters] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchTheaters = async () => {
        try {
            const { data } = await axios.get('/api/theater/all')
            if (data.success) setTheaters(data.theaters)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    useEffect(() => { fetchTheaters() }, [])

    return !loading ? (
        <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
            <BlurCircle top='100px' left='0px'/>
            <h1 className='text-lg font-semibold mb-8'>Available Theaters</h1>
            {theaters.length > 0 ? (
                <div className='flex flex-wrap gap-6'>
                    {theaters.map((theater) => (
                        <div key={theater._id} className='bg-primary/10 border border-primary/20 rounded-lg p-6 w-72'>
                            {theater.image && <img src={theater.image} alt={theater.name} className='w-full h-40 object-cover rounded-md mb-4'/>}
                            <h2 className='text-lg font-semibold'>{theater.name}</h2>
                            <p className='text-gray-400 text-sm mt-1'>{theater.address}</p>
                            <p className='text-gray-400 text-sm'>{theater.city}</p>
                            <p className='text-primary text-sm mt-2'>{theater.screens} Screens</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-gray-400'>No theaters available</p>
            )}
        </div>
    ) : <Loading/>
}

export default Theaters
