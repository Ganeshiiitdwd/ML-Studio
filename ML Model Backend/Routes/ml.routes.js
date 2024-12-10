import {TrainModel} from '../Controller/ml.controller.js'
import { Router } from 'express'

const router=Router()
router.route('/model').post(TrainModel)

export default router