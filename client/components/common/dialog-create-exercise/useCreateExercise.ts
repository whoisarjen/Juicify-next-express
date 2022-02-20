import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { CreateExerciseProps } from "."
import { useNotify } from "../../../hooks/useNotify"
import { ExerciseSchemaProps, ExerciseSchema } from "../../../schema/exercise.schema"
import { insertThoseIDStoDB } from "../../../utils/db.utils"

const useCreateExercise = ({ nameOfCreatedExercise }: CreateExerciseProps) => {
    const { t } = useTranslation('workout')
    const [loading, setLoading] = useState(false)
    const { success } = useNotify()
    const [isOpen, setIsOpen] = useState(false)

    const { register, formState: { errors }, handleSubmit } = useForm<ExerciseSchemaProps>({
        resolver: zodResolver(ExerciseSchema)
    })

    const onSubmit = async (values: ExerciseSchemaProps) => {
        setLoading(true);
        await insertThoseIDStoDB('exercise', [values])
            .then(() => nameOfCreatedExercise(values.name))
            .then(() => success())
            .finally(() => setLoading(false))
    }

    return { isOpen, setIsOpen, handleSubmit, onSubmit, errors, t, register, loading }
}

export type useCreateExerciseProps = ReturnType<typeof useCreateExercise>

export default useCreateExercise;