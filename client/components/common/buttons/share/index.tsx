import useNavigator from '../../../../hooks/useNavigator';
import BaseShare from './ShareButton';

const ShareButton = () => {
    const { shareLocation } = useNavigator()

    return <BaseShare {...{ shareLocation }} />
}

export default ShareButton;