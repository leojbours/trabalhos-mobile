import { useCallback, useRef } from "react";

export function debounce() {
    const timeoutRef = useRef(null);

    function test(callback, debounceTime = 500) {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(callback, debounceTime);
    }

    return test;
}