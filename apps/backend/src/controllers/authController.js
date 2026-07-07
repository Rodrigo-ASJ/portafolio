import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function login(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' })
  }

  // First-time setup: create admin from env vars if not exists
  let user = await User.findOne({ username })
  if (!user) {
    const adminUser = process.env.ADMIN_USER
    const adminPass = process.env.ADMIN_PASS
    if (username !== adminUser || password !== adminPass) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    user = await User.create({ username: adminUser, password: adminPass })
  } else {
    const valid = await user.comparePassword(password)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.json({ token, username: user.username })
}
