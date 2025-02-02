import styles from "./Message.module.css";

function Message({ message }) {
    return (
        <p className={styles.message}>
            <span>👋</span> {message}
        </p>
    );
}

export default Message;