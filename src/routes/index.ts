import express from 'express'
import city from './api/cities'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('hello welcome to the project main router')
})

routes.use('/city', city)

export default routes
 