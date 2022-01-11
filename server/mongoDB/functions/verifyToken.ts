const verifyToken = async (req: any) => {
    req.body.user_ID = '60ba774fe0ecd72587eeaa29'
    req.body.token = {}
    req.body.token.goal = -0.5
    req.body.token.sex = 1
    req.body.token.height = 190
    req.body.token.kind_of_diet = 0
    req.body.token.sport_active = true
    req.body.token.macronutrients = [
        {
            proteins: 100,
            carbs: 100,
            fats: 50,
            day: 1
        },
        {
            proteins: 100,
            carbs: 100,
            fats: 50,
            day: 2
        },
        {
            proteins: 100,
            carbs: 100,
            fats: 50,
            day: 3
        },
        {
            proteins: 100,
            carbs: 100,
            fats: 50,
            day: 4
        },
        {
            proteins: 100,
            carbs: 100,
            fats: 50,
            day: 5
        },
        {
            proteins: 100,
            carbs: 100,
            fats: 50,
            day: 6
        },
        {
            proteins: 100,
            carbs: 100,
            fats: 50,
            day: 7
        }
    ]
};

export default verifyToken;