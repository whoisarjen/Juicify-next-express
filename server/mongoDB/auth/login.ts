import generateToken from './generateToken'
import generateRefreshToken from './generateRefreshToken'
import authorization from './authorization';
import ProductProps from '../../interfaces/product';
import loadUserProducts from '../load/loadUserProducts';
import UserProps from '../../interfaces/user';
import loadUserWorkoutPlans from '../load/loadUserWorkoutPlans';
import ExerciseProps from '../../interfaces/exercise';
import loadUserExercises from '../load/loadUserExercises';
import loadUserDailyMeasurements from '../load/loadUserDailyMeasurements';

export default async (req: any, res: any) => {
	try {
		const user: UserProps = await authorization(req.body.login, req.body.password)
		const token = generateToken([user])
		const refresh_token = generateRefreshToken([user])
		const product: Array<ProductProps> = await loadUserProducts(user)
		const exercise: Array<ExerciseProps> = await loadUserExercises(user)
		const workout_plan = await loadUserWorkoutPlans(user)
		const daily_measurement = await loadUserDailyMeasurements(user)

		res.send({
			token,
			refresh_token,
			product,
			exercise,
			workout_plan,
			daily_measurement
		})
	} catch (error: any) {
		console.log('login', error['VALUE'])
		res.status(error['CODE']).send({ error: error['VALUE'] })
	}
}