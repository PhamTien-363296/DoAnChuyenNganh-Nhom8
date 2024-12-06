import { useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import PropTypes from "prop-types";

const TextEditor = ({ setText, value }) => {
    const editorRef = useRef(null); // DOM container
    const quillInstanceRef = useRef(null); // Quill instance

    useEffect(() => {
        if (!editorRef.current || quillInstanceRef.current) {
            return; // Tránh khởi tạo lại Quill
        }

        // Cấu hình thanh công cụ
        const toolbarOptions = [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["image"],
            ["clean"],
            [{ color: [] }],
            [{ background: [] }],
        ];

        // Khởi tạo Quill
        const quill = new Quill(editorRef.current, {
            theme: "snow",
            modules: {
                toolbar: toolbarOptions,
            },
            placeholder: "Nhập nội dung vào đây...",
        });

        // Xử lý tải lên hình ảnh
        const handleImageUpload = () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/png, image/jpeg, image/gif");
            input.click();

            input.onchange = async () => {
                const file = input.files[0];
                if (file) {
                    const formData = new FormData();
                    formData.append("image", file);

                    try {
                        // Thay 'YOUR_UPLOAD_URL' bằng URL API thực tế
                        const response = await fetch("YOUR_UPLOAD_URL", {
                            method: "POST",
                            body: formData,
                        });
                        const data = await response.json();

                        if (data?.url) {
                            const range = quill.getSelection();
                            quill.insertEmbed(range.index, "image", data.url);
                        } else {
                            console.error("Upload failed:", data);
                        }
                    } catch (error) {
                        console.error("Image upload error:", error);
                    }
                }
            };
        };

        // Gán handler cho nút tải lên hình ảnh
        quill.getModule("toolbar").addHandler("image", handleImageUpload);

        // Lắng nghe sự kiện thay đổi nội dung
        quill.on("text-change", () => {
            const content = quill.root.innerHTML;
            setText(content);
        });

        // Gán nội dung ban đầu
        quill.root.innerHTML = value || "";

        // Lưu instance Quill
        quillInstanceRef.current = quill;

        return () => {
            // Dọn dẹp khi unmount
            quillInstanceRef.current = null;
        };
    }, [setText, value]);

    return <div ref={editorRef} className="textedit-container" style={{ minHeight: "300px" }} />;
};

TextEditor.propTypes = {
    setText: PropTypes.func.isRequired,
    value: PropTypes.string,
};

export default TextEditor;
