import BaseShare from './Share';
import useShare from './useShare';

const Share = () => {
    const props = useShare()

    return <BaseShare {...props} />
}

export default Share;