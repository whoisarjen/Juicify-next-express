import { getCookie } from "./auth.utils"

export const workersController = (lastUpdated: any) => {
    const workersController = {
        product: false,
        exercise: false,
        workout_plan: false,
        daily_measurement: false,
    }

    const exerciseWorker = async () => {
        const exercise = new Worker(new URL("../workers/exercise.worker.ts", import.meta.url), { name: 'exercise', type: 'module' })
        exercise.postMessage({
            updated: await getCookie('exercise'),
            socketUpdated: lastUpdated.exercise,
        })
        exercise.onmessage = (() => {
            workersController['exercise'] = true;
            workoutPlanWorker()
        })
    }

    const productWorker = async () => {
        const product = new Worker(new URL("../workers/product.worker.ts", import.meta.url), { name: 'product', type: 'module' })
        product.postMessage({
            updated: await getCookie('product'),
            socketUpdated: lastUpdated.product,
        })
        product.onmessage = (() => {
            workersController['product'] = true;
            dailyMeasurementWorker()
        })
    }

    exerciseWorker()
    productWorker()

    const workoutPlanWorker = async () => {
        if (!workersController.workout_plan && workersController.exercise) {
            const workoutPlan = new Worker(new URL("../workers/workoutPlan.worker.ts", import.meta.url), { name: 'workoutPlan', type: 'module' })
            workoutPlan.postMessage({
                updated: await getCookie('workout_plan'),
                socketUpdated: lastUpdated.workout_plan,
            })
            workoutPlan.onmessage = (() => {
                workersController['workout_plan'] = true;
                dailyMeasurementWorker()
            })
        }
    }

    const dailyMeasurementWorker = async () => {
        if (!workersController.daily_measurement && workersController.product && workersController.exercise && workersController.workout_plan) {
            const dailyMeasurement = new Worker(new URL("../workers/dailyMeasurement.worker.ts", import.meta.url), { name: 'dailyMeasurement', type: 'module' })
            dailyMeasurement.postMessage({
                updated: await getCookie('daily_measurement'),
                socketUpdated: lastUpdated.daily_measurement,
            })
            dailyMeasurement.onmessage = (() => {
                workersController['daily_measurement'] = true;
            })
        }
    }
}