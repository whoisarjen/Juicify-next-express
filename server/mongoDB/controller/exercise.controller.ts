import logger from '../../utils/logger'
import { Request, Response } from "express"
import { ExerciseProps } from "../models/exercise.model"
import { CreateExerciseSchemaProps } from "../schema/exercise.schema"
import { createExercise, deleteManyExercise, getExerciseByName, getUserExercises } from "../service/exercise.service"
import { socketHandleUserSynchronization } from '../../utils/socket'

export const createExerciseHandler = async (req: Request<{}, {}, CreateExerciseSchemaProps['body']>, res: Response) => {
    try {
        const exercise = await createExercise(req.body.array)
        await socketHandleUserSynchronization({ req, res, data: exercise, whatToDo: 'change', where: 'exercise' })
        return res.send(exercise);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const deleteManyExerciseHandler = async (req: Request<{}, {}, CreateExerciseSchemaProps['body']>, res: Response) => {
    try {
        req.body.array.forEach(async (Exercise: ExerciseProps) => {
            await deleteManyExercise({
                _id: Exercise._id,
                user_ID: Exercise.user_ID
            })
        })
        await socketHandleUserSynchronization({ req, res, data: req.body.array, whatToDo: 'delete', where: 'exercise' })
        return res.send({});
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const getUserExercisesHandler = async (req: Request<{}, {}, CreateExerciseSchemaProps['body']>, res: Response) => {
    try {
        const exercises = await getUserExercises(res.locals.token)
        return res.send(exercises);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const getExerciseByNameHandler = async (req: Request, res: Response) => {
    try {
        const items = await getExerciseByName(req.body.find)
        return res.send({ items });
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}