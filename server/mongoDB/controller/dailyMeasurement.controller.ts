import logger from '../../utils/logger'
import { Request, Response } from "express"
import { CreateDailyMeasurementInput } from "../schema/dailyMeasurement.schema"
import { changeDailyMeasurement, createDailyMeasurement } from "../service/dailyMeasurement.service"
import { socketHandleUserSynchronization } from '../../utils/socket'

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