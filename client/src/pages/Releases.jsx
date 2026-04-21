import React, { useEffect, useState } from 'react'
import BlurCircle from '../components/BlurCircle'
import Loading from '../components/Loading'
import { useAppContext } from '../context/AppContext'
import { StarIcon } from 'lucide-react'

const Releases = () => {
    const { axios, image_base_url } = useAppContext()
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUpcoming = async () => {
        try {
            const { data } = await axios.get('/api/show/upcoming')
            if (data.success) setMovies(data.movies)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    useEffect(() => { fetchUpcoming() }, [])

    return !loading ? (
        <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
            <BlurCircle top='100px' left='0px'/>
            <h1 className='text-lg font-semibold mb-8'>Upcoming Releases</h1>
            <div className='flex flex-wrap max-sm:justify-center gap-8'>
                {movies.map((movie) => (
                    <div key={movie.id} className='max-w-40'>
                        <div className='relative rounded-lg overflow-hidden'>
                            <img src={image_base_url + movie.poster_path} alt={movie.title}
                                className='w-full object-cover brightness-90'/>
                            <div className='text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0'>
                                <p className='flex items-center gap-1 text-gray-400'>
                                    <StarIcon className='w-4 h-4 text-primary fill-primary'/>
                                    {movie.vote_average.toFixed(1)}
                                </p>
                                <p className='text-gray-300'>{movie.release_date}</p>
                            </div>
                        </div>
                        <p className='font-medium truncate mt-1'>{movie.title}</p>
                    </div>
                ))}
            </div>
        </div>
    ) : <Loading/>
}

export default Releases
