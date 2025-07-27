const setPassword = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = hashedPassword;
    user.isGoogleUser = false; // User can now login with email/password
    await user.save();

    res.status(200).json({ message: 'Password set successfully' });
  } catch (err) {
    console.error('Error setting password:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
export default setPassword;