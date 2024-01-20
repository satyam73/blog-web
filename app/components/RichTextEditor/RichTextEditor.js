import Quill from 'quill';
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

import styles from './richTextEditor.module.css';

export default function RichTextEditor({ handleBlogPostChange }) {
  const editorRef = useRef(null);
  const [isEditorRendered, setIsEditorRendered] = useState(false);

  useEffect(() => {
    let editor;

    function onTextChange(delta, source) {
      console.log(delta, source);
      console.log(editor.root.innerHTML);
      console.log(editorRef.current.innerHTML);
      handleBlogPostChange(editor.root.innerHTML, 'content', editor);
    }

    if (!isEditorRendered) {
      editor = new Quill(editorRef?.current, {
        modules: {
          toolbar: true,
        },
        placeholder: 'Start pouring your creativity...',
        theme: 'snow',
      });
      editor.on('text-change', onTextChange);
    }
    setIsEditorRendered(true);

    return () => editor?.off('text-change', onTextChange);
  }, []);
  return (
    <Box className={styles['rich-text-editor']}>
      <Box
        className={styles['editor-container']}
        ref={editorRef}
        style={{ height: '500px' }}
      ></Box>
    </Box>
  );
}
