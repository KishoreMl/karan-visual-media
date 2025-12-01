import React, { useEffect, useRef } from 'react';
import './CustomCursor.scss';

const CustomCursor = () => {
    const cursorDotRef = useRef(null);

    useEffect(() => {
        const cursorDot = cursorDotRef.current;
        let currentTarget = null;

        const handleMouseMove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            if (cursorDot) {
                cursorDot.style.left = `${mouseX}px`;
                cursorDot.style.top = `${mouseY}px`;
            }

            const target = e.target;
            const isHoverable = target.tagName === 'A' || 
                               target.tagName === 'BUTTON' || 
                               target.closest('a') || 
                               target.closest('button');

            if (isHoverable && target !== currentTarget) {
                currentTarget = target;
                cursorDot?.classList.add('hover');
            } else if (!isHoverable && currentTarget) {
                currentTarget = null;
                cursorDot?.classList.remove('hover');
            }
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="cursor-dot" ref={cursorDotRef}></div>
    );
};

export default CustomCursor;

