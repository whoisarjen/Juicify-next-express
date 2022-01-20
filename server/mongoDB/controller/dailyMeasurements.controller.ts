import logger from '../../utils/logger'
import { Request, Response } from "express"
import errorBook from '../../utils/errorBook'
import { getDailyMeasurements } from '../service/dailyMeasurements.service'
import { DailyMeasurementProps } from '../models/dailyMeasurement.model'

export const getGuestDailyMeasurementsHandler = async (req: Request, res: Response) => {
    try {
        if ((new Date(req.body.uniqueKey).toString() === 'Invalid Date')) {
            logger.error(`getDailyMeasurementHandler blocked ${req.body.uniqueKey}. Invalid Date`)
            return res.status(errorBook['DATE IS REQUIRED']['CODE']).send(errorBook['DATE IS REQUIRED']['VALUE'])
        }
        const dailyMeasurements: Array<DailyMeasurementProps> = await getDailyMeasurements(res.locals.user, req.body.uniqueKey)
        return res.send({ data: dailyMeasurements, user: res.locals.user });
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}