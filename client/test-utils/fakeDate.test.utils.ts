export const getUser = async () => {
    return {
        activity: 1.375,
        avatar: true,
        banned: false,
        birth: "1997-01-31",
        calories: 1330,
        carbs: 45,
        coach: "2022-02-14",
        coach_analyze: true,
        description: "Loremipsum–tekstskładającysięzłacińskichiquasi-łacińskichwyrazów,mającykorzeniewklasycznejłacinie,wzorowanynafragmencietraktatuCycerona„Ogranicachdobraizła”napisanegow45p.n.e.Tekstjeststosowanydodemonstracjikrojówpisma",
        email: "Kamilow97@gmail.com",
        email_confirmation: true,
        email_confirmation_hash: "620904cfccc3b35b753d8fd5",
        exp: 1644848223,
        facebook: "kamil.owczarek.1",
        fats: 30,
        fiber: 10,
        goal: 0,
        height: 190,
        iat: 1644758223,
        instagram: "whoisarjen",
        kind_of_diet: 0,
        l: 5,
        lang: "en",
        login: "Arjen",
        macronutrients: [,
            { proteins: 136, carbs: 215, fats: 73 },
            { proteins: 136, carbs: 216, fats: 73 },
            { proteins: 136, carbs: 216, fats: 73 },
            { proteins: 136, carbs: 216, fats: 73 },
            { proteins: 136, carbs: 216, fats: 73 },
            { proteins: 136, carbs: 502, fats: 73 },
            { proteins: 136, carbs: 925, fats: 73 },
        ],
        meal_number: 5,
        name: "Kamil",
        password_remind_hash: "h5ZN7lmZUuCSUCSPIk6VVKdoenXg1Z",
        proteins: 25,
        proteinsG: 200,
        public_profile: 1,
        registered: "2021-06-04",
        reverse_diet: false,
        session: "620904cfccc3b35b753d8fd6",
        sex: true,
        sport_active: true,
        sugar_percent: 10,
        surname: "Owczarek",
        twitter: "whoisarjen",
        updatedAt: "2022-02-08T21:12:42.398Z",
        useProteinsG: true,
        users_roles_ID: 9999,
        water_adder: true,
        website: "arjenworld.pl",
        workout_watch: true,
        __v: 0,
        _id: "60ba774fe0ecd72587eeaa29",
    }
}

export const getDailyMeasurement = async () => {
    return {
        "_id": "6209979b47c67e4bef84452f",
        "weight": 0,
        "user_ID": "60ba774fe0ecd72587eeaa29",
        "whenAdded": "2022-02-13T00:00:00.000Z",
        "nutrition_diary": [
            {
                "_id": "6209bc99e540aff1b1adb35f",
                "name": "Jajko L",
                "v": true,
                "p": 12.5,
                "c": 0.59,
                "f": 9.71,
                "l": 7,
                "__v": 0,
                "meal": 0,
                "how_many": 1,
                "product_ID": "60bfd223a420c2467fefc700"
            },
            {
                "_id": "6209bc99e540aff1b1adb360",
                "name": "Jajko kurze",
                "v": true,
                "p": 12.5,
                "c": 0.6,
                "f": 9.7,
                "l": 11,
                "__v": 0,
                "meal": 0,
                "how_many": 1,
                "product_ID": "60bfd223a420c2467fefc702"
            },
            {
                "_id": "6209bc99e540aff1b1adb361",
                "name": "Jajko lidl",
                "v": true,
                "p": 12.5,
                "c": 0.6,
                "f": 9.7,
                "l": 10,
                "__v": 0,
                "meal": 0,
                "how_many": 1,
                "product_ID": "60bfd223a420c2467fefc703"
            }
        ],
        "workout_result": [
            {
                "workout_plan_ID": "6206d83e020e2335d89b4b5a",
                "title": "Preetka",
                "results": [
                    {
                        "_id": "61ea100289ca24965877b079",
                        "name": "wyciskanie nago",
                        "user_ID": "60ba774fe0ecd72587eeaa29",
                        "l": 15,
                        "__v": 0,
                        "values": [
                            {
                                "reps": 0,
                                "weight": 0
                            },
                            {
                                "reps": 0,
                                "weight": 0
                            },
                            {
                                "reps": 0,
                                "weight": 0
                            }
                        ]
                    }
                ],
                "_id": "6209979b47c67e4bef844530"
            }
        ]
    }
}

export const getWorkoutResult = async () => {
    return (await getDailyMeasurement()).workout_result[0]
}