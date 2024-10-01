const Hotel = require('../models/hotelSchema');
const Menu = require('../models/menuSchema');

// Create a menu item for a hotel
exports.createMenuItem = async (req, res) => {
  const { name, description, price } = req.body;
  const hotelId = req.hotelId;

  try {
    const menu = new Menu({
      hotelId,
      name,
      description,
      price
    });
    
    await menu.save();
    res.status(201).json({ message: 'Menu item created successfully', menu });
  } catch (error) {
    res.status(500).json({ message: 'Error creating menu item', error });
  }
};

// Get all menu items for a hotel
exports.getHotelMenu = async (req, res) => {
  const hotelId = req.hotelId;

  try {
    const menuItems = await Menu.find({ hotelId });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving menu items', error });
  }
};
