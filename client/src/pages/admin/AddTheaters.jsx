import React, { useState } from 'react'
import Title from '../../components/admin/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddTheaters = () => {
    const { axios, getToken } = useAppContext()
    const [form, setForm] = useState({ name: '', address: '', city: '', screens: '', image: '' })

    const handleSubmit = async () => {
        try {
            if (!form.name || !form.address || !form.city || !form.screens)
                return toast.error('Please fill all required fields')
            const { data } = await axios.post('/api/theater/add', 
                { ...form, screens: Number(form.screens) },
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            )
            if (data.success) {
                toast.success(data.message)
                setForm({ name: '', address: '', city: '', screens: '', image: '' })
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <Title text1="Add" text2="Theater"/>
            <div className='mt-8 max-w-md flex flex-col gap-4'>
                <input type="text" placeholder='Theater Name' value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className='bg-transparent border border-gray-600 rounded px-3 py-2 outline-none'/>
                <input type="text" placeholder='Address' value={form.address}
                    onChange={e => setForm({...form, address: e.target.value})}
                    className='bg-transparent border border-gray-600 rounded px-3 py-2 outline-none'/>
                <input type="text" placeholder='City' value={form.city}
                    onChange={e => setForm({...form, city: e.target.value})}
                    className='bg-transparent border border-gray-600 rounded px-3 py-2 outline-none'/>
                <input type="number" placeholder='Number of Screens' value={form.screens}
                    onChange={e => setForm({...form, screens: e.target.value})}
                    className='bg-transparent border border-gray-600 rounded px-3 py-2 outline-none'/>
                <input type="text" placeholder='Image URL (optional)' value={form.image}
                    onChange={e => setForm({...form, image: e.target.value})}
                    className='bg-transparent border border-gray-600 rounded px-3 py-2 outline-none'/>
                <button onClick={handleSubmit}
                    className='bg-primary text-white px-8 py-2 rounded hover:bg-primary/90 transition cursor-pointer'>
                    Add Theater
                </button>
            </div>
        </>
    )
}

export default AddTheaters
