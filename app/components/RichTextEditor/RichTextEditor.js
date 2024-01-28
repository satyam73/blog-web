import Quill from 'quill';
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Delta from "quill-delta";
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

import styles from './richTextEditor.module.css';

export default function RichTextEditor({ handleBlogPostChange, setQuill = () => { } }) {
  const editorRef = useRef(null);
  const [isEditorRendered, setIsEditorRendered] = useState(false);

  useEffect(() => {
    let editor;

    function onTextChange(delta, source) {
      handleBlogPostChange(editor.root.innerHTML, 'content', editor);
    }

    if (!isEditorRendered) {
      editor = new Quill(editorRef?.current, {
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'link'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['blockquote', 'code-block'],
          ]
        },
        placeholder: 'Start pouring your creativity...',
        theme: 'snow',
        clipboard: {
          // Define a custom paste handler
          matchers: [
            ['br', function (node, delta) { return delta; }], // Allow <br> elements
            ['a', function (node, delta) { return delta; }], // Allow <a> elements
            [Node.TEXT_NODE, function (node, delta) {
              return new Delta().insert(node.data);
            }] // Allow plain text
          ]
        }
      });

      setQuill(editor);
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
