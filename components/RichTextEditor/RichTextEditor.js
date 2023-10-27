import dynamic from 'next/dynamic';
import { Box } from '@mui/material';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/image.min';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/image_manager.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/quote.min.js';

const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), {
  ssr: false,
});

import { toolbarButtons } from './richTextEditor.constant';
import styles from './richTextEditor.module.css';

export default function RichTextEditor({ blogPost, handleBlogPostChange }) {

  return (
    <Box className={styles['rich-text-editor']} >
      <FroalaEditor tag='textarea'
        model={blogPost}
        onModelChange={handleBlogPostChange}
        toolbarButtons={toolbarButtons}
      />
    </Box>
  )
}