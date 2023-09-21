import styles from './InputNumber.module.css';

interface InputNumberProps {
    placeholder?: string;
    value: number | null;
    onChange: (value: number) => void;
};

export const InputNumber: React.FC<InputNumberProps> = ({ placeholder, value, onChange }) => {
    return (
        <div className={styles['input-number-component']}>
            <input 
                type="number" 
                value={value !== null ? value.toString() : ''} 
                placeholder={placeholder}
                onChange={(e) => onChange(Number(e.target.value))}
                className={styles['input-number']}
            />
        </div>
    );
};