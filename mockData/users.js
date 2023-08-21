import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Walter White',
    email: 'walter@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Sherlock Holmes',
    email: 'sherlock@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('234567', 10),
    role: 'admin',
  },
]

export default users
