import './style.css';

import { useLocation, useNavigate } from 'react-router';

function HomePage() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className='home'>
            home page
        </div>
    )
}

export default HomePage;