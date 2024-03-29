import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue) => {

    const [value, setValue] = useState(() => {
        return JSON.parse(localStorage.getItem(key)) || defaultValue
    });
 
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue]
}
 
export default useLocalStorage;

