import '../styles/textEditorStyle.css'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
// import Highlight from '@tiptap/extension-highlight'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'

const MenuBar = ({ editor }) => {
  useEffect(()=>{
    if (!editor) {
      return null;
    }
  })

  const [isTextStyleDropdownActive, setIsTextStyleDropdownActive] = useState(false);
  const [selectedTextStyle, setSelectedTextStyle] = useState('Normal Text');

  return (
    <>
        <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? 'is-active' : ''}
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4062 15.625H5.625V4.375H10.9375C11.5639 4.37504 12.1771 4.55435 12.7048 4.89174C13.2325 5.22914 13.6526 5.71052 13.9155 6.27903C14.1784 6.84754 14.2731 7.47942 14.1884 8.10001C14.1037 8.72061 13.8431 9.30399 13.4375 9.78125C13.9673 10.205 14.3528 10.7825 14.5408 11.4344C14.7289 12.0862 14.7102 12.7803 14.4875 13.4211C14.2647 14.0619 13.8488 14.6179 13.297 15.0126C12.7452 15.4073 12.0847 15.6213 11.4062 15.625ZM7.5 13.75H11.3937C11.5784 13.75 11.7613 13.7136 11.9319 13.643C12.1025 13.5723 12.2575 13.4687 12.3881 13.3381C12.5187 13.2075 12.6223 13.0525 12.693 12.8819C12.7636 12.7113 12.8 12.5284 12.8 12.3438C12.8 12.1591 12.7636 11.9762 12.693 11.8056C12.6223 11.635 12.5187 11.48 12.3881 11.3494C12.2575 11.2188 12.1025 11.1152 11.9319 11.0445C11.7613 10.9739 11.5784 10.9375 11.3937 10.9375H7.5V13.75ZM7.5 9.0625H10.9375C11.1222 9.0625 11.305 9.02613 11.4756 8.95546C11.6463 8.88478 11.8013 8.7812 11.9319 8.65062C12.0625 8.52004 12.166 8.36501 12.2367 8.1944C12.3074 8.02378 12.3438 7.84092 12.3438 7.65625C12.3438 7.47158 12.3074 7.28872 12.2367 7.1181C12.166 6.94749 12.0625 6.79246 11.9319 6.66188C11.8013 6.5313 11.6463 6.42772 11.4756 6.35704C11.305 6.28637 11.1222 6.25 10.9375 6.25H7.5V9.0625Z" fill="#212529"/>
            </svg>
        </button>
        <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={editor.isActive('italic') ? 'is-active' : ''}
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.625 5.625V4.375H7.5V5.625H10.7125L7.98125 14.375H4.375V15.625H12.5V14.375H9.2875L12.0187 5.625H15.625Z" fill="#212529"/>
            </svg>
        </button>
        <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={editor.isActive('strike') ? 'is-active' : ''}
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 9.37502H11.2225C10.945 9.30039 10.6662 9.23059 10.3863 9.16564C8.63125 8.75064 7.63875 8.44689 7.63875 7.02627C7.6245 6.78103 7.66081 6.53548 7.74542 6.30486C7.83004 6.07424 7.96115 5.86347 8.13062 5.68564C8.6615 5.24908 9.32644 5.00852 10.0137 5.00439C11.7825 4.96064 12.5981 5.56064 13.265 6.47314L14.2744 5.73564C13.8019 5.05711 13.1578 4.51617 12.4078 4.16808C11.6578 3.81999 10.8288 3.67723 10.0056 3.75439C8.99439 3.76085 8.01887 4.12911 7.25563 4.79252C6.96634 5.08595 6.74024 5.43554 6.59125 5.81971C6.44227 6.20389 6.37356 6.61451 6.38937 7.02627C6.36197 7.47682 6.4466 7.92714 6.63572 8.337C6.82483 8.74686 7.11254 9.10349 7.47312 9.37502H2.5V10.625H11.0325C12.2619 10.9813 12.9969 11.445 13.0156 12.7238C13.0359 12.9969 12.9985 13.2713 12.9056 13.529C12.8128 13.7867 12.6667 14.0219 12.4769 14.2194C11.8155 14.7407 10.9938 15.0166 10.1519 15C9.52345 14.9818 8.90738 14.8209 8.35029 14.5296C7.7932 14.2382 7.30966 13.8239 6.93625 13.3181L5.97812 14.1206C6.46358 14.7676 7.08994 15.2955 7.80972 15.6645C8.52951 16.0334 9.32384 16.2336 10.1325 16.25H10.195C11.3492 16.2633 12.4695 15.8596 13.35 15.1131C13.6625 14.7981 13.9054 14.421 14.0632 14.0062C14.2209 13.5914 14.2898 13.1481 14.2656 12.705C14.289 11.947 14.0332 11.2069 13.5469 10.625H17.5V9.37502Z" fill="#212529"/>
            </svg>
        </button>
        <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleCode()
                .run()
            }
            className={editor.isActive('code') ? 'is-active' : ''}
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.375 10L15 14.375L14.1188 13.4938L17.6063 10L14.1188 6.50625L15 5.625L19.375 10ZM0.625 10L5 5.625L5.88125 6.50625L2.39375 10L5.88125 13.4938L5 14.375L0.625 10Z" fill="#212529"/>
            </svg>
        </button>

        <div className="w-[109px] h-7 bg-green-300 relative select-none z-40"> {/* Dropdown */}
            <div className='bg-slate-400 text-center flex items-center justify-between cursor-pointer' onClick={() => {setIsTextStyleDropdownActive((prev) => !prev)}}> {/* Dropdown Button */}
                <span>{selectedTextStyle}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 11L3 5.99999L3.7 5.29999L8 9.59999L12.3 5.29999L13 5.99999L8 11Z" fill="#212529"/>
                </svg>
            </div> 
            { isTextStyleDropdownActive && (
                <div className='bg-red-400 absolute -bottom-[170px] w-full'> {/* Dropdown Content */}
                    <div 
                    onClick={ (e)=> {
                      setSelectedTextStyle(e.target.textContent)
                      setIsTextStyleDropdownActive(false)
                    } } className=''> {/* Dropdown Item */}
                        <button
                            onClick={() => editor.chain().focus().setParagraph().run()}
                            className={editor.isActive('paragraph') ? 'is-active' : ''}
                        >
                            Normal Text
                        </button>
                    </div>
                    <div className='bg-white hover:bg-[#f4f4f4] cursor-pointer'> {/* Dropdown Item */}
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                        >
                            h1
                        </button>
                    </div>
                    <div className=''> {/* Dropdown Item */}
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                        >
                            h2
                        </button>
                    </div>
                    <div className=''> {/* Dropdown Item */}
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                        >
                            h3
                        </button>
                    </div>
                    <div className=''> {/* Dropdown Item */}
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                            className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                        >
                            h4
                        </button>
                    </div>
                    <div className=''> {/* Dropdown Item */}
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                            className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                        >
                            h5
                        </button>
                    </div>
                    <div className=''> {/* Dropdown Item */}
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                            className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                        >
                            h6
                        </button>
                    </div>
                </div>
            )}
        </div>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </button>
      <button
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
      >
        purple
      </button>
    </>
  )
}

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: ``,
  })

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default TextEditor;




// -------------------

// {TextStyleOptions.map((key, value) => (
//     <div 
//       onClick={ (e)=> {
//         setSelectedTextStyle(key)
//         setIsTextStyleDropdownActive(false)
//       } } className=''> {/* Dropdown Item */}
//           <button
//               onClick={() => editor.chain().focus().setParagraph().run()}
//               className={editor.isActive('paragraph') ? 'is-active' : ''}
//           >
//               {key}
//           </button>
//     </div>
//   ))}



{
  Object.entries(TextStyleOptions).map(([key, value]) => {
    if (key === 'paragraph') {
      return (
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          paragraph
        </button>
      )
    } else {
      return (
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: value[0] }).run()}
          className={editor.isActive('heading', { level: value[0] }) ? 'is-active' : ''}
        >
          {key}
        </button>
      )
    }
  })
}