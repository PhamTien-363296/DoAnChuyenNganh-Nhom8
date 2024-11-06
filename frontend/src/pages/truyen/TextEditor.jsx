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
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['image'], 
            ['clean'], 
            [{ 'color': [] }], 
            [{ 'background': [] }]
        ];

        const quillInstance = new Quill('#container', {
            theme: 'snow',
            modules: {
                toolbar: toolbarOptions
            },
            placeholder:'Nhập nội dung vào đây...'
        });

        const handleImageUpload = () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/png, image/jpeg, image/gif');
            input.click();

            input.onchange = async () => {
                const file = input.files[0];
                const formData = new FormData();
                formData.append('image', file);

                const response = await fetch('YOUR_UPLOAD_URL', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();

       
                const range = quillInstance.getSelection();
                quillInstance.insertEmbed(range.index, 'image', data.url);
            };
        };

      
        quillInstance.getModule('toolbar').addHandler('image', handleImageUpload);


        quillInstance.on('text-change', () => {
            const content = quillInstance.root.innerHTML; 
            console.log("Content changed: ", content); 
            setText(content); 
        });

        quillRef.current = quillInstance; 
    }, [setText]);

    return (
        <div id='container' className="container"></div>
    );
};


TextEditor.propTypes = {
    setText: PropTypes.func.isRequired
};

export default TextEditor;
