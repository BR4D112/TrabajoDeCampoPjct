import buttonStyles from './Button.module.css'
export function Button ({text}) {
    return (
        <button className={buttonStyles.button} type="submit">{text}</button>
    );
} 