import Theater from '../models/Theater.js';

export const addTheater = async(req, res) => {
    try {
        const { name, address, city, screens, image } = req.body;
        await Theater.create({ name, address, city, screens, image });
        res.json({ success: true, message: 'Theater added successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getTheaters = async(req, res) => {
    try {
        const theaters = await Theater.find({});
        res.json({ success: true, theaters });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const deleteTheater = async(req, res) => {
    try {
        const { theaterId } = req.params;
        await Theater.findByIdAndDelete(theaterId);
        res.json({ success: true, message: 'Theater deleted successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
