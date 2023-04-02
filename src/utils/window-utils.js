import { useEffect, useState } from 'react';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export function useWindowDimensions() {
    const [isTight, setIsTight] = useState();
    const [isWide, setIsWide] = useState();

    function handleResize() {
        const { width } = getWindowDimensions();

        setIsTight(width < 620);
        setIsWide(width >= 1200);
    }

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isTight, isWide };
}

export function isMobileScreen() {
    return window.matchMedia('(pointer: coarse)').matches;
}
