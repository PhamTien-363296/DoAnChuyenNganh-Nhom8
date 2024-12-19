import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import Quill from 'quill';
import "quill/dist/quill.snow.css";

const TextEditor = ({ setText }) => {
    const quillRef = useRef(null);

    useEffect(() => {
        if (quillRef.current) {
            return; 
        }

        const toolbarOptions = [
            [{ 'font': [] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'], 
            ['code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }], 
            [{ 'color': [] }, { 'background': [] }], 
            [{ 'align': [] }],
            ['clean']  
        ];

        const quillInstance = new Quill('#container', {
            theme: 'snow',
            modules: {
                toolbar: toolbarOptions
            },
            placeholder:'Nhập nội dung vào đây...'
        });

        quillInstance.on('text-change', () => {
            const content = quillInstance.root.innerHTML; 
            console.log("Content changed: ", content); 
            setText(content); 
        });

        quillRef.current = quillInstance; 
    }, [setText]);

    return (
        <div id='container' className="textedit-container"></div>
    );
};


TextEditor.propTypes = {
    setText: PropTypes.func.isRequired
};

export default TextEditor;
