import logger from '../../utils/logger'
import { Request, Response } from "express"
import { CreateWorkoutPlanSchemaProps } from "../schema/workoutPlan.schema"
import { createWorkoutPlans, updateWorkoutPlan, deleteWorkoutPlan, getUserWorkoutPlans, getWorkoutPlanByID } from "../service/workoutPlan.service"
import { socketHandleUserSynchronization } from '../../utils/socket'
import { loadWorkoutPlansMissingData } from '../../utils/exercise.utils'

export const createWorkoutPlansController = async (req: Request<{}, {}, CreateWorkoutPlanSchemaProps['body']>, res: Response) => {
    try {
        const response = []
        const query = await createWorkoutPlans(req.body.array)
        if (query.length) {
            for (let i = 0; i < query.length; i++) {
                response.push(await loadWorkoutPlansMissingData(query[i]))
            }
        }
        await socketHandleUserSynchronization({ req, res, data: response, whatToDo: 'change', where: 'workout_plan' })
        return res.send(response);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const updateWorkoutPlansController = async (req: Request, res: Response) => {
    try {
        const response = []
        for (let i = 0; i < req.body.array.length; i++) {
            response.push(await loadWorkoutPlansMissingData(await updateWorkoutPlan(req.body.array[i])))
        }
        await socketHandleUserSynchronization({ req, res, data: response, whatToDo: 'change', where: 'workout_plan' })
        return res.send(response);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const deleteWorkoutPlansController = async (req: Request, res: Response) => {
    try {
        for (let i = 0; i < req.body.array.length; i++) {
            await deleteWorkoutPlan(req.body.array[i])
        }
        await socketHandleUserSynchronization({ req, res, data: req.body.array, whatToDo: 'delete', where: 'workout_plan' })
        return res.send({});
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const getUserWorkoutPlansController = async (req: Request<{}, {}, CreateWorkoutPlanSchemaProps['body']>, res: Response) => {
    try {
        const response = []
        const query = await getUserWorkoutPlans(res.locals.token)
        if (query.length) {
            for (let i = 0; i < query.length; i++) {
                response.push(await loadWorkoutPlansMissingData(query[i]))
            }
        }
        return res.send(response);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const getGuestWorkoutPlanController = async (req: Request, res: Response) => {
    try {
        const query = await getWorkoutPlanByID(req.body.find)
        const response = await loadWorkoutPlansMissingData(query)
        return res.send({ data: response, user: res.locals.user });
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const getGuestWorkoutPlansController = async (req: Request<{}, {}, CreateWorkoutPlanSchemaProps['body']>, res: Response) => {
    try {
        // Doesn't need to load exercise
        return res.send({ data: await getUserWorkoutPlans(res.locals.user), user: res.locals.user });
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}