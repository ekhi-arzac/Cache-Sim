import React from 'react';
import styles from './InputNumber.module.css';

interface InputNumberProps {
    placeholder?: string;
    value: number | null;
    onChange: (value: number) => void;
    customIncrement: number;
}

export const InputNumber: React.FC<InputNumberProps> = ({ placeholder, value, onChange, customIncrement }) => {

    const handleIncrement = (e: React.KeyboardEvent | React.MouseEvent, isDecrement: boolean = false) => {
        e.preventDefault();  // Prevent default behavior

        if (value === null) {
            onChange(0);
            return;
        }

        if (isDecrement) {
            onChange(value - customIncrement);
        } else {
            onChange(value + customIncrement);
        }
    };

    return (
        <div className={styles['input-number-component']}>
            <input 
                type="number" 
                value={value !== null ? value.toString() : ''} 
                placeholder={placeholder}
                onChange={(e) => onChange(Number(e.target.value))}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowUp') handleIncrement(e);
                    if (e.key === 'ArrowDown') handleIncrement(e, true);
                }}
                onClick={(e) => {
                    const path = e.nativeEvent.composedPath && e.nativeEvent.composedPath();
                    if (path) {
                        for (let element of path) {
                            if ('className' in element && typeof element.className === 'string') {
                                if (element.className.includes("WebKit-")) {
                                    if (element.className.includes("Increment")) {
                                        handleIncrement(e);
                                    } else if (element.className.includes("Decrement")) {
                                        handleIncrement(e, true);
                                    }
                                }
                            }
                        }
                    }
                }}
                
                
                className={styles['input-number']}
            />
        </div>
    );
};
