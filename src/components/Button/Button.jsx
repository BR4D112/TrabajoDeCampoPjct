import buttonStyles from './Button.module.css'
export function Button ({text, type, ...props }) {
    return (
        <button 
            className={buttonStyles.button} 
            type={type} 
            {... props}
            >
                {text}
            </button>
    );
} 