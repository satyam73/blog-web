// import React from 'react'
// import { Box, IconButton } from '@mui/material'
// import EditIcon from '@mui/icons-material/Edit';
// import InputBox from '@/app/components/common/Input/InputBox'
// import styles from './inputBoxEditable.module.css';

// function InputBoxEditable({ value, type, name, placeholder, id, isValid, disabled, handleChange, onEditButtonClick, inputRef = null, handleFocusOut }) {

//   const lowerCaseName = name?.toLowerCase();
//   return (
//     <Box className={styles['input-box-editable']}>
//       <InputBox
//         inputRef={inputRef}
//         value={value}
//         type={type}
//         name={name}
//         placeholder={name}
//         id={id}
//         isValid={isValid}
//         disabled={disabled}
//         handleChange={handleChange}
//         handleFocusOut={handleFocusOut}
//       />
//       <IconButton onClick={(e) => onEditButtonClick(e, lowerCaseName)} className={styles['input-box-editable__button']}>
//         <EditIcon fontSize='medium' />
//       </IconButton>
//     </Box>
//   )
// }

// export default InputBoxEditable