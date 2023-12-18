import './style.css'

import AnimatedHourglass from 'components/loading/hourglass/AnimatedHourglass';
import LoadingCircle from 'components/loading/circle/LoadingCircle';

function LoadingPage() {
    return (<>
        <div className='loading-container'>
            <AnimatedHourglass s={150} />
            <LoadingCircle s={300} />
        </div>
    </>
    )
}

export default LoadingPage;
