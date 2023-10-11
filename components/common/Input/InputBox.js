import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import styles from './inputBox.module.css';

export default function InputBox({
  type,
  name,
  placeholder,
  id,
  handleChange = () => {},
}) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const isTypePassword = type === 'password';
  const inputStyles = {
    borderTopRightRadius: isTypePassword ? 0 : '10px',
    borderBottomRightRadius: isTypePassword ? 0 : '10px',
  };

  return (
    <Box component={'div'} className={styles['input-box']}>
      <label htmlFor={id} className={styles['input-box__label']}>
        {name}
      </label>
      <Box className={styles['input-box__container']}>
        <input
          id={id}
          className={styles['container__input']}
          type={isPasswordHidden && isTypePassword ? type : 'text'}
          name={name?.toLowerCase()}
          placeholder={placeholder}
          onChange={handleChange}
          style={inputStyles}
        />
        {isTypePassword && (
          <IconButton
            onClick={() =>
              setIsPasswordHidden((isPasswordHidden) => !isPasswordHidden)
            }
            className={styles['container__visibility-button']}
          >
            {isPasswordHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
