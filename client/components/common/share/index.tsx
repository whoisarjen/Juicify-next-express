import useNavigator from '../../../hooks/useNavigator';
import BaseShare from './Share';

const Share = () => {
    const { shareLocation } = useNavigator()

    return <BaseShare {...{ shareLocation }} />
}

export default Share;