import logger from '../../utils/logger'
import { Request, Response } from "express"
import { WorkoutPlanPropsDry } from "../models/workoutPlan.model"
import { CreateWorkoutPlanInput } from "../schema/workoutPlan.schema"
import { createWorkoutPlan, deleteManyWorkoutPlan, getUserWorkoutPlans } from "../service/workoutPlan.service"
import { socketHandleUserSynchronization } from '../../utils/socket'

export const createWorkoutPlanHandler = async (req: Request<{}, {}, CreateWorkoutPlanInput['body']>, res: Response) => {
    try {
        const WorkoutPlan = await createWorkoutPlan(req.body.array)
        await socketHandleUserSynchronization({ req, res, data: WorkoutPlan, whatToDo: 'change', where: 'WorkoutPlan' })
        return res.send(WorkoutPlan);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const deleteManyWorkoutPlanHandler = async (req: Request<{}, {}, CreateWorkoutPlanInput['body']>, res: Response) => {
    try {
        req.body.array.forEach(async (WorkoutPlan: WorkoutPlanPropsDry) => {
            await deleteManyWorkoutPlan({
                _id: WorkoutPlan._id,
                user_ID: WorkoutPlan.user_ID
            })
        })
        await socketHandleUserSynchronization({ req, res, data: req.body.array, whatToDo: 'delete', where: 'WorkoutPlan' })
        return res.send({});
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const getUserWorkoutPlansHandler = async (req: Request<{}, {}, CreateWorkoutPlanInput['body']>, res: Response) => {
    try {
        const WorkoutPlans = await getUserWorkoutPlans(res.locals.token)
        return res.send(WorkoutPlans);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}