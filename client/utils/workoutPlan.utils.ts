export const loadMissingData = ({ _id, user_ID, object = {} }: { _id: string, user_ID: string, object: any }) => {
    return {
        ...(object._id ? { _id: object._id } : { _id }),
        ...(object.user_ID ? { user_ID: object.user_ID } : { user_ID }),
        ...(object.title ? { title: object.title } : { title: '' }),
        ...(object.description ? { description: object.description } : { description: '' }),
        ...(object.burnt ? { burnt: object.burnt } : { burnt: 0 }),
        ...(object.exercises ? { exercises: object.exercises } : { exercises: [] }),
    }
}