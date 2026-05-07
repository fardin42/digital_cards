import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Underline from '@editorjs/underline';

const RichTextEditor = ({ value, onChange, placeholder = "Tell your story..." }) => {
  const ejInstance = useRef();

  useEffect(() => {
    if (ejInstance.current) return;

    let initialData = { blocks: [] };
    if (value) {
      if (typeof value === 'object' && value.blocks) {
        initialData = value;
      } else if (typeof value === 'string') {
        try {
          const parsed = JSON.parse(value);
          if (parsed.blocks) initialData = parsed;
          else initialData = { blocks: [{ type: 'paragraph', data: { text: value } }] };
        } catch (e) {
          initialData = { blocks: [{ type: 'paragraph', data: { text: value } }] };
        }
      }
    }

    const editor = new EditorJS({
      holder: 'editorjs',
      data: initialData,
      placeholder: placeholder,
      tools: {
        paragraph: {
          class: Paragraph,
          inlineToolbar: true
        },
        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            levels: [2, 3, 4],
            defaultLevel: 3
          }
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        },
        underline: Underline
      },
      onChange: async () => {
        const content = await editor.save();
        onChange(JSON.stringify(content));
      }
    });

    ejInstance.current = editor;

    return () => {
      if (ejInstance.current && typeof ejInstance.current.destroy === 'function') {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  return (
    <div style={{ 
      border: '1px solid #cbd5e0', 
      borderRadius: '6px', 
      padding: '10px 20px', 
      background: '#fff',
      minHeight: '150px'
    }}>
      <div id="editorjs" style={{ fontSize: '1rem', color: '#2d3748' }}></div>
    </div>
  );
};

export default RichTextEditor;
