import React, { useEffect, useRef } from 'react';
import './CustomCursor.scss';

const CustomCursor = () => {
    const cursorDotRef = useRef(null);
    const requestRef = useRef(null);
    const mousePosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const cursorDot = cursorDotRef.current;
        let currentTarget = null;
        const handleMouseMove = (e) => {
            mousePosition.current = { x: e.clientX, y: e.clientY };

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

        const updateCursorPosition = () => {
            if (cursorDot) {
                cursorDot.style.transform = `translate(${mousePosition.current.x}px, ${mousePosition.current.y}px)`;
            }
            requestRef.current = requestAnimationFrame(updateCursorPosition);
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        requestRef.current = requestAnimationFrame(updateCursorPosition);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    return (
        <div className="cursor-ring" ref={cursorDotRef}>
             <div className="cursor-dot"></div>
        </div>
    );
};

export default CustomCursor;

