import './../../styles/textEditorStyle.css'

import React, { useState, useCallback } from 'react'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Underline from '@tiptap/extension-underline'
import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'

/** Import Highlight Features for code block */
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
// load all highlight.js languages
import { lowlight } from 'lowlight'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

// Using a Dictionary and map function on it for every dropbox to avoid code repition
const TextStyleOptions = {
  'Normal text': [0, 'Normal text'],
  'h1': [1, `Heading 1`], // [heading level to pass in TipTap, svg Icon]
  'h2': [2, 'Heading 2'],
  'h3': [3, 'Heading 3'],
  'h4': [4, 'Heading 4'],
  'h5': [5, 'Heading 5'],
  'h6': [6, 'Heading 6']
}

const MenuBar = ({ editor }) => {

  // Text Style Dropdown Settings
  const [isTextStyleDropdownActive, setIsTextStyleDropdownActive] = useState(false);
  const [selectedTextStyle, setSelectedTextStyle] = useState('Normal text');

  // Link URL Settings
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  // Add Image settings
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])


  if (!editor) {
    return null
  }

  return (
    <div id='menubar' className='flex items-center bg-white h-[46px] my-2 px-2 gap-2 rounded-[10px] overflow-x-scroll relative'>
      <div id='group-history' className="h-7 flex items-center">
        <button 
          type='button'
          className="cursor-pointer"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 10.25H8.88438L11.1263 8.00875L10.25 7.125L6.5 10.875L10.25 14.625L11.1263 13.7406L8.88625 11.5H16.5C17.4946 11.5 18.4484 11.8951 19.1517 12.5983C19.8549 13.3016 20.25 14.2554 20.25 15.25C20.25 16.2446 19.8549 17.1984 19.1517 17.9017C18.4484 18.6049 17.4946 19 16.5 19H11.5V20.25H16.5C17.8261 20.25 19.0979 19.7232 20.0355 18.7855C20.9732 17.8479 21.5 16.5761 21.5 15.25C21.5 13.9239 20.9732 12.6521 20.0355 11.7145C19.0979 10.7768 17.8261 10.25 16.5 10.25Z" fill="#212529" />
          </svg>
        </button>

        <button 
          type='button'
          className="cursor-pointer"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 10.25H19.1156L16.8737 8.00875L17.75 7.125L21.5 10.875L17.75 14.625L16.8737 13.7406L19.1137 11.5H11.5C10.5054 11.5 9.55161 11.8951 8.84835 12.5983C8.14509 13.3016 7.75 14.2554 7.75 15.25C7.75 16.2446 8.14509 17.1984 8.84835 17.9017C9.55161 18.6049 10.5054 19 11.5 19H16.5V20.25H11.5C10.1739 20.25 8.90215 19.7232 7.96447 18.7855C7.02678 17.8479 6.5 16.5761 6.5 15.25C6.5 13.9239 7.02678 12.6521 7.96447 11.7145C8.90215 10.7768 10.1739 10.25 11.5 10.25Z" fill="#212529" />
          </svg>
        </button>
      </div>

      <div className="text-style-dropdown select-none min-w-[109px] h-7 relative z-50"> {/* Dropdown */}
        <div className="text-style-dropdown-btn text-center flex justify-around items-center cursor-pointer h-full w-full text-sm" onClick={() => { setIsTextStyleDropdownActive((prev) => !prev) }}> {/* Dropdown Button */}
          <span>{selectedTextStyle}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> {/** Dropdown Icon */}
            <path d="M8 11L3 5.99999L3.7 5.29999L8 9.59999L12.3 5.29999L13 5.99999L8 11Z" fill="#212529" />
          </svg>
        </div>
        {
          isTextStyleDropdownActive && <div className="text-style-dropdown-content absolute -bottom-[200px] w-full z-50 bg-slate-50 text-sm rounded overflow-hidden"> {/* Dropdown Content */}
            {
              Object.entries(TextStyleOptions).map(([key, value]) => {
                if (key === 'paragraph') {
                  return (
                    <div
                      onClick={() => {
                        editor.chain().focus().setParagraph().run()
                        setSelectedTextStyle(value[1])
                        setIsTextStyleDropdownActive(false)
                      }}
                      className={`${editor.isActive('paragraph') ? 'is-active' : ''} text-style-dropdown-item w-full cursor-pointer hover:bg-[#E7F5FF] px-1 h-7`}
                    >
                      {value[1]}
                    </div>
                  )
                } else {
                  return (
                    <div
                      onClick={(e) => {
                        editor.chain().focus().toggleHeading({ level: value[0] }).run()
                        setSelectedTextStyle(value[1])
                        setIsTextStyleDropdownActive(false)
                      }}
                      className={`${editor.isActive('heading', { level: value[0] }) ? 'is-active' : ''} text-style-dropdown-item w-full cursor-pointer hover:bg-[#E7F5FF] px-1 h-7`}
                    >
                      {value[1]}
                    </div>
                  )
                }
              })
            }
          </div>
        }
      </div>

      <button 
        type='button'
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
      >
        purple
      </button>

      <div className="text-format h-7 flex items-center">
        <button 
          type='button'
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
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4062 19.625H9.625V8.375H14.9375C15.5639 8.37504 16.1771 8.55435 16.7048 8.89174C17.2325 9.22914 17.6526 9.71052 17.9155 10.279C18.1784 10.8475 18.2731 11.4794 18.1884 12.1C18.1037 12.7206 17.8431 13.304 17.4375 13.7812C17.9673 14.205 18.3528 14.7825 18.5408 15.4344C18.7289 16.0862 18.7102 16.7803 18.4875 17.4211C18.2647 18.0619 17.8488 18.6179 17.297 19.0126C16.7452 19.4073 16.0847 19.6213 15.4062 19.625ZM11.5 17.75H15.3937C15.5784 17.75 15.7613 17.7136 15.9319 17.643C16.1025 17.5723 16.2575 17.4687 16.3881 17.3381C16.5187 17.2075 16.6223 17.0525 16.693 16.8819C16.7636 16.7113 16.8 16.5284 16.8 16.3438C16.8 16.1591 16.7636 15.9762 16.693 15.8056C16.6223 15.635 16.5187 15.48 16.3881 15.3494C16.2575 15.2188 16.1025 15.1152 15.9319 15.0445C15.7613 14.9739 15.5784 14.9375 15.3937 14.9375H11.5V17.75ZM11.5 13.0625H14.9375C15.1222 13.0625 15.305 13.0261 15.4756 12.9555C15.6463 12.8848 15.8013 12.7812 15.9319 12.6506C16.0625 12.52 16.166 12.365 16.2367 12.1944C16.3074 12.0238 16.3438 11.8409 16.3438 11.6562C16.3438 11.4716 16.3074 11.2887 16.2367 11.1181C16.166 10.9475 16.0625 10.7925 15.9319 10.6619C15.8013 10.5313 15.6463 10.4277 15.4756 10.357C15.305 10.2864 15.1222 10.25 14.9375 10.25H11.5V13.0625Z" fill="#212529" />
          </svg>
        </button>

        <button 
          type='button'
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
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.625 9.625V8.375H11.5V9.625H14.7125L11.9813 18.375H8.375V19.625H16.5V18.375H13.2875L16.0187 9.625H19.625Z" fill="#212529" />
          </svg>
        </button>

        <button 
          type='button'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 20.25H21.5V21.5H6.5V20.25ZM14 18.375C12.8397 18.375 11.7269 17.9141 10.9064 17.0936C10.0859 16.2731 9.625 15.1603 9.625 14V7.125H10.875V14C10.875 14.8288 11.2042 15.6237 11.7903 16.2097C12.3763 16.7958 13.1712 17.125 14 17.125C14.8288 17.125 15.6237 16.7958 16.2097 16.2097C16.7958 15.6237 17.125 14.8288 17.125 14V7.125H18.375V14C18.375 15.1603 17.9141 16.2731 17.0936 17.0936C16.2731 17.9141 15.1603 18.375 14 18.375Z" fill="#212529" />
          </svg>
        </button>

        <button 
          type='button'
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
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5 13.375H15.2225C14.945 13.3004 14.6662 13.2306 14.3863 13.1656C12.6312 12.7506 11.6388 12.4469 11.6388 11.0263C11.6245 10.781 11.6608 10.5355 11.7454 10.3049C11.83 10.0742 11.9612 9.86347 12.1306 9.68564C12.6615 9.24908 13.3264 9.00852 14.0137 9.00439C15.7825 8.96064 16.5981 9.56064 17.265 10.4731L18.2744 9.73564C17.8019 9.05711 17.1578 8.51617 16.4078 8.16808C15.6578 7.81999 14.8288 7.67723 14.0056 7.75439C12.9944 7.76085 12.0189 8.12911 11.2556 8.79252C10.9663 9.08595 10.7402 9.43554 10.5913 9.81971C10.4423 10.2039 10.3736 10.6145 10.3894 11.0263C10.362 11.4768 10.4466 11.9271 10.6357 12.337C10.8248 12.7469 11.1125 13.1035 11.4731 13.375H6.5V14.625H15.0325C16.2619 14.9813 16.9969 15.445 17.0156 16.7238C17.0359 16.9969 16.9985 17.2713 16.9056 17.529C16.8128 17.7867 16.6667 18.0219 16.4769 18.2194C15.8155 18.7407 14.9938 19.0166 14.1519 19C13.5234 18.9818 12.9074 18.8209 12.3503 18.5296C11.7932 18.2382 11.3097 17.8239 10.9362 17.3181L9.97812 18.1206C10.4636 18.7676 11.0899 19.2955 11.8097 19.6645C12.5295 20.0334 13.3238 20.2336 14.1325 20.25H14.195C15.3492 20.2633 16.4695 19.8596 17.35 19.1131C17.6625 18.7981 17.9054 18.421 18.0632 18.0062C18.2209 17.5914 18.2898 17.1481 18.2656 16.705C18.289 15.947 18.0332 15.2069 17.5469 14.625H21.5V13.375Z" fill="#212529" />
          </svg>
        </button>

        <button 
          type='button'
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
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.375 14L19 18.375L18.1187 17.4938L21.6063 14L18.1187 10.5062L19 9.625L23.375 14ZM4.625 14L9 9.625L9.88125 10.5062L6.39375 14L9.88125 17.4938L9 18.375L4.625 14Z" fill="#212529" />
          </svg>
        </button>

        <button 
          type='button'
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={editor.isActive('subscript') ? 'is-active' : ''}
        >
          <div className='min-w-[28px] flex justify-center items-center'>
            <svg width="18" height="18" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L11.4999 12.9999" stroke="#000001" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.4999 1L1 12.9999" stroke="#000001" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.25 16.7499V16.3749C15.25 15.8776 15.4475 15.4007 15.7992 15.049C16.1508 14.6974 16.6277 14.4999 17.125 14.4999C17.6223 14.4999 18.0992 14.6974 18.4508 15.049C18.8024 15.4007 19 15.8776 19 16.3749C19.0042 16.734 18.9267 17.0894 18.7734 17.4143C18.6201 17.7391 18.3949 18.0248 18.115 18.2498L15.25 20.4998H19" stroke="#000001" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>

        <button 
          type='button'
          onClick={() => editor.chain().focus().setSuperscript().run()}
          disabled={editor.isActive('superscript')}
        >
          <div className='min-w-[28px] flex justify-center items-center'>
            <svg width="18" height="18" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8.49988L11.4999 20.4998" stroke="#000001" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.4999 8.49988L1 20.4998" stroke="#000001" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.25 3.24998V2.87498C15.25 2.37771 15.4475 1.9008 15.7992 1.54917C16.1508 1.19754 16.6277 1 17.125 1V1C17.6223 1 18.0992 1.19754 18.4508 1.54917C18.8024 1.9008 19 2.37771 19 2.87498C19.0042 3.23414 18.9267 3.58956 18.7734 3.91439C18.6201 4.23921 18.3949 4.52493 18.115 4.74997L15.25 6.99995H19" stroke="#000001" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>
      </div>

      <div className="list h-7 flex items-center">
        <button 
          type='button'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.375 11.5C9.41053 11.5 10.25 10.6605 10.25 9.625C10.25 8.58947 9.41053 7.75 8.375 7.75C7.33947 7.75 6.5 8.58947 6.5 9.625C6.5 10.6605 7.33947 11.5 8.375 11.5Z" fill="#212529" />
            <path d="M8.375 20.25C9.41053 20.25 10.25 19.4105 10.25 18.375C10.25 17.3395 9.41053 16.5 8.375 16.5C7.33947 16.5 6.5 17.3395 6.5 18.375C6.5 19.4105 7.33947 20.25 8.375 20.25Z" fill="#212529" />
            <path d="M14 17.75H22.75V19H14V17.75ZM14 9H22.75V10.25H14V9Z" fill="#212529" />
          </svg>
        </button>

        <button 
          type='button'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 17.75H22.75V19H14V17.75ZM14 9H22.75V10.25H14V9ZM9 11.5V6.5H7.75V7.125H6.5V8.375H7.75V11.5H6.5V12.75H10.25V11.5H9ZM10.25 21.5H6.5V19C6.5 18.6685 6.6317 18.3505 6.86612 18.1161C7.10054 17.8817 7.41848 17.75 7.75 17.75H9V16.5H6.5V15.25H9C9.33152 15.25 9.64946 15.3817 9.88388 15.6161C10.1183 15.8505 10.25 16.1685 10.25 16.5V17.75C10.25 18.0815 10.1183 18.3995 9.88388 18.6339C9.64946 18.8683 9.33152 19 9 19H7.75V20.25H10.25V21.5Z" fill="#212529" />
          </svg>
        </button>
      </div>

      <div className="awesome-options h-7 flex items-center">
        <button 
          type='button' 
          onClick={setLink} 
          className={editor.isActive('link') ? 'is-active' : ''}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.2813 8.22503C21.9329 7.87543 21.5189 7.59804 21.0631 7.40877C20.6073 7.2195 20.1186 7.12207 19.625 7.12207C19.1315 7.12207 18.6428 7.2195 18.187 7.40877C17.7312 7.59804 17.3172 7.87543 16.9688 8.22503L17.8563 9.11253C18.089 8.87984 18.3652 8.69526 18.6692 8.56934C18.9733 8.44341 19.2991 8.37859 19.6282 8.37859C19.9572 8.37859 20.2831 8.44341 20.5871 8.56934C20.8911 8.69526 21.1674 8.87984 21.4 9.11253C21.6327 9.34521 21.8173 9.62145 21.9432 9.92547C22.0692 10.2295 22.134 10.5553 22.134 10.8844C22.134 11.2135 22.0692 11.5393 21.9432 11.8433C21.8173 12.1474 21.6327 12.4236 21.4 12.6563L16.4 17.6563C15.9309 18.1262 15.2944 18.3905 14.6304 18.3911C13.9664 18.3917 13.3293 18.1285 12.8594 17.6594C12.3895 17.1903 12.1252 16.5537 12.1246 15.8897C12.124 15.2257 12.3872 14.5887 12.8563 14.1188L13.7375 13.2313L12.8563 12.3438L11.9688 13.2313C11.6192 13.5797 11.3418 13.9936 11.1525 14.4495C10.9633 14.9053 10.8658 15.394 10.8658 15.8875C10.8658 16.3811 10.9633 16.8698 11.1525 17.3256C11.3418 17.7814 11.6192 18.1954 11.9688 18.5438C12.676 19.2419 13.6313 19.6308 14.625 19.625C15.1205 19.6271 15.6114 19.5309 16.0695 19.3421C16.5276 19.1533 16.9437 18.8756 17.2938 18.525L22.2938 13.525C22.9944 12.8202 23.3866 11.8662 23.3842 10.8724C23.3819 9.87869 22.9852 8.9265 22.2813 8.22503Z" fill="#212529" />
            <path d="M6.61879 19.5125C6.38541 19.2802 6.20022 19.0041 6.07386 18.7C5.94749 18.396 5.88244 18.0699 5.88244 17.7407C5.88244 17.4114 5.94749 17.0853 6.07386 16.7813C6.20022 16.4772 6.38541 16.2011 6.61879 15.9688L11.6188 10.9688C11.8511 10.7354 12.1272 10.5502 12.4313 10.4238C12.7353 10.2975 13.0614 10.2324 13.3907 10.2324C13.7199 10.2324 14.046 10.2975 14.3501 10.4238C14.6541 10.5502 14.9302 10.7354 15.1625 10.9688C15.3944 11.2029 15.577 11.4812 15.6994 11.7872C15.8218 12.0931 15.8815 12.4206 15.875 12.75C15.8769 13.0805 15.8133 13.4081 15.6878 13.7139C15.5623 14.0196 15.3774 14.2974 15.1438 14.5313L13.8188 15.875L14.7063 16.7625L16.0313 15.4375C16.7366 14.7322 17.1328 13.7756 17.1328 12.7782C17.1328 11.7807 16.7366 10.8241 16.0313 10.1188C15.326 9.41347 14.3694 9.01723 13.3719 9.01723C12.3745 9.01723 11.4179 9.41347 10.7125 10.1188L5.71254 15.1188C5.362 15.4673 5.08382 15.8816 4.89399 16.338C4.70417 16.7944 4.60645 17.2839 4.60645 17.7782C4.60645 18.2725 4.70417 18.7619 4.89399 19.2183C5.08382 19.6747 5.362 20.089 5.71254 20.4375C6.42431 21.1303 7.38185 21.5124 8.37504 21.5C9.37698 21.501 10.3386 21.1055 11.05 20.4L10.1625 19.5125C9.93025 19.7459 9.65413 19.9311 9.35006 20.0575C9.04599 20.1838 8.71995 20.2489 8.39067 20.2489C8.06138 20.2489 7.73534 20.1838 7.43127 20.0575C7.1272 19.9311 6.85109 19.7459 6.61879 19.5125Z" fill="#212529" />
          </svg>
        </button>

        <button
          type='button'
          onClick={addImage}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.875 12.75C16.2458 12.75 16.6084 12.64 16.9167 12.434C17.225 12.228 17.4654 11.9351 17.6073 11.5925C17.7492 11.2499 17.7863 10.8729 17.714 10.5092C17.6416 10.1455 17.463 9.8114 17.2008 9.54917C16.9386 9.28695 16.6045 9.10837 16.2408 9.03603C15.8771 8.96368 15.5001 9.00081 15.1575 9.14273C14.8149 9.28464 14.522 9.52496 14.316 9.83331C14.11 10.1416 14 10.5042 14 10.875C14 11.3723 14.1975 11.8492 14.5492 12.2008C14.9008 12.5525 15.3777 12.75 15.875 12.75ZM15.875 10.25C15.9986 10.25 16.1195 10.2867 16.2222 10.3553C16.325 10.424 16.4051 10.5216 16.4524 10.6358C16.4997 10.75 16.5121 10.8757 16.488 10.9969C16.4639 11.1182 16.4044 11.2295 16.3169 11.3169C16.2295 11.4043 16.1182 11.4639 15.9969 11.488C15.8757 11.5121 15.75 11.4997 15.6358 11.4524C15.5216 11.4051 15.424 11.325 15.3553 11.2222C15.2867 11.1195 15.25 10.9986 15.25 10.875C15.25 10.7092 15.3158 10.5503 15.4331 10.4331C15.5503 10.3158 15.7092 10.25 15.875 10.25Z" fill="#212529" />
            <path d="M20.25 6.5H7.75C7.41848 6.5 7.10054 6.6317 6.86612 6.86612C6.6317 7.10054 6.5 7.41848 6.5 7.75V20.25C6.5 20.5815 6.6317 20.8995 6.86612 21.1339C7.10054 21.3683 7.41848 21.5 7.75 21.5H20.25C20.5815 21.5 20.8995 21.3683 21.1339 21.1339C21.3683 20.8995 21.5 20.5815 21.5 20.25V7.75C21.5 7.41848 21.3683 7.10054 21.1339 6.86612C20.8995 6.6317 20.5815 6.5 20.25 6.5ZM20.25 20.25H7.75V16.5L10.875 13.375L14.3688 16.8687C14.603 17.1016 14.9198 17.2322 15.25 17.2322C15.5802 17.2322 15.897 17.1016 16.1313 16.8687L17.125 15.875L20.25 19V20.25ZM20.25 17.2312L18.0063 14.9875C17.772 14.7547 17.4552 14.624 17.125 14.624C16.7948 14.624 16.478 14.7547 16.2437 14.9875L15.25 15.9812L11.7562 12.4875C11.522 12.2547 11.2052 12.124 10.875 12.124C10.5448 12.124 10.228 12.2547 9.99375 12.4875L7.75 14.7312V7.75H20.25V17.2312Z" fill="#212529" />
          </svg>
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.375 14L19 18.375L18.1187 17.4937L21.6063 14L18.1187 10.5062L19 9.625L23.375 14ZM4.625 14L9 9.625L9.88125 10.5062L6.39375 14L9.88125 17.4937L9 18.375L4.625 14ZM11.7625 19.9275L15.025 7.75L16.2325 8.07313L12.97 20.25L11.7625 19.9275Z" fill="#212529" />
          </svg>
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 13.375H7.81875C7.93491 12.6015 8.21112 11.8607 8.62974 11.1999C9.04837 10.5391 9.6002 9.97295 10.25 9.5375L11.3688 8.7875L10.6812 7.75L9.5625 8.5C8.6208 9.12755 7.84857 9.97785 7.31433 10.9755C6.7801 11.9731 6.50038 13.0871 6.5 14.2188V18.375C6.5 18.7065 6.6317 19.0245 6.86612 19.2589C7.10054 19.4933 7.41848 19.625 7.75 19.625H11.5C11.8315 19.625 12.1495 19.4933 12.3839 19.2589C12.6183 19.0245 12.75 18.7065 12.75 18.375V14.625C12.75 14.2935 12.6183 13.9755 12.3839 13.7411C12.1495 13.5067 11.8315 13.375 11.5 13.375ZM20.25 13.375H16.5688C16.6849 12.6015 16.9611 11.8607 17.3797 11.1999C17.7984 10.5391 18.3502 9.97295 19 9.5375L20.1188 8.7875L19.4375 7.75L18.3125 8.5C17.3708 9.12755 16.5986 9.97785 16.0643 10.9755C15.5301 11.9731 15.2504 13.0871 15.25 14.2188V18.375C15.25 18.7065 15.3817 19.0245 15.6161 19.2589C15.8505 19.4933 16.1685 19.625 16.5 19.625H20.25C20.5815 19.625 20.8995 19.4933 21.1339 19.2589C21.3683 19.0245 21.5 18.7065 21.5 18.375V14.625C21.5 14.2935 21.3683 13.9755 21.1339 13.7411C20.8995 13.5067 20.5815 13.375 20.25 13.375Z" fill="#212529" />
          </svg>
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().setHorizontalRule().run()
          }>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6.5" y="13.375" width="15" height="1.25" fill="#212529" />
          </svg>
        </button>
      </div>
    </div>
  )
}

const TextEditor = ({ id, editorValue, setEditorValue, editorPlaceholder }) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Underline,
      Link,
      Dropcursor,
      Image,
      Subscript,
      Superscript,
      Placeholder.configure({
        placeholder: editorPlaceholder,
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
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
    content: editorValue,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      setEditorValue(content);
    },
  })

  return (
    <div id={id} className='w-full h-[69vh] bg-[#f2f2f2] px-4'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default TextEditor;