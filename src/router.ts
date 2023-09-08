import {Router} from 'express'
import { body, oneOf } from "express-validator"
import { handleInputErrors } from './modules/middleware'

const router = Router()

/* 
    Product
*/

router.get('/product', (req, res) => {
    res.send({ message: "ooooh" })    
})
router.get('/product/:id', () => {})
router.put('/product/:id', body('name').isString(), handleInputErrors, (req, res) => {    
})
router.post('/product', body('name').isString(), handleInputErrors, (req, res) => {})
router.delete('/product/:id', () => {})

/* 
    Update
 */

router.get('/update', () => {})
router.get('/update/:id', () => {})
router.put('/update/:id', 
[
    body('title').optional, 
    body('body').optional(),
    oneOf([body('SHIPPED'), body('DEPRECATED'), body('IN_PROGRESS')]),
    body('version').optional()
], 
    handleInputErrors, 
    (req, res) => {}
)
router.post('/update',[
    body('title').exists().isString(), 
    body('body').exists().isString(),
    body('version').optional()
], 
    handleInputErrors,
    (req, res) => {})

router.delete('/update/:id', () => {})

/* 
    Update Point
 */

router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put('/updatepoint/:id', [body('name').optional(), body('description').optional()], handleInputErrors, (req, res) => {})
router.post('/updatepoint', [body('name').optional(), body('description').optional()], handleInputErrors, (req, res) => {})
router.delete('/updatepoint/:id', () => {})

export default router