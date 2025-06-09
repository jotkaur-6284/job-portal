

// // controllers/authController.js
// exports.login = async (req, res) => {
//   const { email, password, role } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.send("User not found");

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.send("Incorrect password");

//   if (user.role !== role) {
//     return res.send("Role does not match. Please select correct role.");
//   }

//   req.session.user = user;

//   // Send success page with redirect
//   return res.render('login-success', { role });
// };




const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send("Incorrect password");

  if (user.role !== role) {
    return res.send("Role does not match. Please select correct role.");
  }

  req.session.user = user;

  return res.render('login-success', { role });
};
