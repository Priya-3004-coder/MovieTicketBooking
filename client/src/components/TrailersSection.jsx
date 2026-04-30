import React, { useEffect, useState } from 'react'
import BlurCircle from './BlurCircle'
import { PlayCircleIcon } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const TrailersSection = () => {
    const { axios, shows, image_base_url } = useAppContext()
    const [trailers, setTrailers] = useState([])
    const [currentTrailer, setCurrentTrailer] = useState(null)

    const fetchTrailers = async () => {
        try {
            // Take first 4 unique movies from shows
            const movies = shows.slice(0, 4)
            const results = await Promise.all(
                movies.map(async (movie) => {
                    const { data } = await axios.get(`/api/show/trailer/${movie._id}`)
                    if (data.success && data.key) {
                        return {
                            key: data.key,
                            title: movie.title,
                            image: `${image_base_url}${movie.backdrop_path || movie.poster_path}`
                        }
                    }
                    return null
                })
            )
            const valid = results.filter(Boolean)
            setTrailers(valid)
            if (valid.length > 0) setCurrentTrailer(valid[0])
        } catch (error) {
            console.error('Error fetching trailers:', error)
        }
    }

    useEffect(() => {
        if (shows.length > 0) fetchTrailers()
    }, [shows])

    if (!currentTrailer) return null

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
            <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>Trailers</p>
            <div className='relative mt-6'>
                <BlurCircle top='-100px' right='-100px' />
                <iframe
                    width="960px"
                    height="540px"
                    src={`https://www.youtube.com/embed/${currentTrailer.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'>
                {trailers.map((trailer) => (
                    <div
                        key={trailer.key}
                        className='relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer'
                        onClick={() => setCurrentTrailer(trailer)}
                    >
                        <img
                            src={trailer.image}
                            alt={trailer.title}
                            className='rounded-lg w-full h-full object-cover brightness-75'
                        />
                        <PlayCircleIcon
                            strokeWidth={1.6}
                            className='absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrailersSection
