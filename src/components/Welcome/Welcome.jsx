import styles from './Welcome.module.css';

const Welcome = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Bienvenido</h1>
                <p className={styles.description}>
                    Soy Alejandro Otero un front end developer de argentina, 
                    con experiencia en mantenimiento web y esta es mi landing page
                </p>
            </div>
        </div>
    );
};

export default Welcome;
