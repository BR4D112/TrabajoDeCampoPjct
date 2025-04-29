import buttonDenyStyles from './ButtonDeny.module.css'
export function ButtonDeny ({text, type, ...props }) {
    return (
        <button 
            className={buttonDenyStyles.button} 
            type={type} 
            {... props}
            >
                {text}
            </button>
    );
} 