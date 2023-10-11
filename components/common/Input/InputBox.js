
import { Box } from '@mui/material';
import styles from './inputBox.module.css';
export default function InputBox({ type, name, placeholder, id, handleChange = () => { } }) {
  return (
    <Box component={'div'} className={styles['input-box']}>
      <label htmlFor={id} className={styles['input-box__label']}>{name}</label>
      <input id={id} className={styles["input-box__input"]} type={type} name={name?.toLowerCase()} placeholder={placeholder} onChange={handleChange} />
    </ Box>
  )
}