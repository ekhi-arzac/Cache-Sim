import styles from './Button.module.css';
interface ButtonProps {
    text?: string;
    onClick: () => void;
    color?: string;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, color }) => {
    return (
        <div className={styles['button-component']} style={color === "yellow" ? {backgroundColor: "yellow"}: {backgroundColor: "green"}}>
            <button
                onClick={(e) => onClick()}
                className={styles['button']}
            ><div className='flex items-center justify-center'>
                    <p>{text ? text : "button"}
                    </p>
                </div>
            </button>
        </div>
    );
};