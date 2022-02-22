import logger from '../../utils/logger'
import { Request, Response } from "express"
import { getDailyMeasurements } from '../service/dailyMeasurements.service'
import { DailyMeasurementProps } from '../models/dailyMeasurement.model'

export const getGuestDailyMeasurementsController = async (req: Request, res: Response) => {
    try {
        if ((new Date(req.body.find).toString() === 'Invalid Date')) {
            logger.error(`getDailyMeasurementController blocked ${req.body.find}. Invalid Date`)
            return res.status(401).send(process.env.DATE_IS_REQUIRED)
        }
        const dailyMeasurements: Array<DailyMeasurementProps> = await getDailyMeasurements(res.locals.user, req.body.find)
        return res.send({ data: dailyMeasurements, user: res.locals.user });
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}