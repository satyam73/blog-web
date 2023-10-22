import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import styles from './inputBox.module.css';
import { errorMessages } from './inputBox.constant';

export default function InputBox({
  type,
  name,
  placeholder,
  id,
  isValid,
  ref = null,
  handleChange = () => { },
}) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const lowerCaseName = name?.toLowerCase();
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
          name={lowerCaseName}
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
      {!isValid && <Typography component='p' variant='subtitle2' className={styles['input-box__helper-text']} >
        {errorMessages[lowerCaseName]}
      </Typography>}
    </Box>
  );
}
