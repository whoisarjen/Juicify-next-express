import logger from '../../utils/logger'
import { Request, Response } from "express"
import { CreateDailyMeasurementInput } from "../schema/dailyMeasurement.schema"
import { changeDailyMeasurement, createDailyMeasurement, getDailyMeasurement } from "../service/dailyMeasurement.service"
import { socketHandleUserSynchronization } from '../../utils/socket'
import errorBook from '../../utils/errorBook'

export const createDailyMeasurementHandler = async (req: Request<{}, {}, CreateDailyMeasurementInput['body']>, res: Response) => {
    try {
        const DailyMeasurement = await createDailyMeasurement(req.body.array)
        await socketHandleUserSynchronization({ req, res, data: DailyMeasurement, whatToDo: 'change', where: 'DailyMeasurement' })
        return res.send(DailyMeasurement);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const changeDailyMeasurementHandler = async (req: Request<{}, {}, CreateDailyMeasurementInput['body']>, res: Response) => {
    try {
        const DailyMeasurements = await changeDailyMeasurement(req.body.array)
        await socketHandleUserSynchronization({ req, res, data: DailyMeasurements, whatToDo: 'change', where: 'DailyMeasurement' })
        return res.send(DailyMeasurements);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const getGuestDailyMeasurementHandler = async (req: Request, res: Response) => {
    try {
        if ((new Date(req.body.uniqueKey).toString() === 'Invalid Date')) {
            logger.error(`getDailyMeasurementHandler blocked ${req.body.uniqueKey}. Invalid Date`)
            return res.status(errorBook['DATE IS REQUIRED']['CODE']).send(errorBook['DATE IS REQUIRED']['VALUE'])
        }
        const dailyMeasurement = await getDailyMeasurement({
            user_ID: res.locals.user._id,
            whenAdded: req.body.uniqueKey
        })
        return res.send({ data: dailyMeasurement, user: res.locals.user });
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}