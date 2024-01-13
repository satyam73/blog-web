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
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/lists.min.js';

const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), {
  ssr: false,
});

import { toolbarButtons } from './richTextEditor.constant';
import styles from './richTextEditor.module.css';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

export default function RichTextEditor({ blogPost, handleBlogPostChange }) {

  return (
    <Box className={styles['rich-text-editor']} >
      <FroalaEditorView
        model={'<p><img src="blob:http://localhost:3001/5882e0c8-aa31-4486-be73-74237d169288" style="width: 300px;" class="fr-fic fr-dib"><strong>HI THERE</strong></p>'}
      />
      <FroalaEditor tag='textarea'
        model={blogPost}
        onModelChange={handleBlogPostChange}
        toolbarButtons={toolbarButtons}
      />
    </Box>
  )
}