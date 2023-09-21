import React, { useState } from 'react';
import styles from './Select.module.css';
import { Option } from '../../interfaces';

interface SelectProps {
    placeholder?: string;
    options: Option[];
    selected: Option | null;
    onChange: (selection: Option) => void;
};

export const Select: React.FC<SelectProps> = ({ placeholder, selected, options, onChange }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [arrow, setArrow] = useState(false);

    return (
        <div className={styles['select-component']}>
            <div onClick={() => {setShowOptions(!showOptions); setArrow(!arrow)}} className={styles['select']}>
                
                <span>{selected ? selected.label : placeholder}</span>
                <span>{arrow ? 'ʌ' : 'v'}</span>
            </div>
            {showOptions && (
                <div className={styles['options']}>
                    {options.map(option => (
                        <div onClick={() => {
                            setArrow(false);
                            onChange(option);
                            setShowOptions(false);
                        }} key={option.value} className={styles['option']}>
                            <span>{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};