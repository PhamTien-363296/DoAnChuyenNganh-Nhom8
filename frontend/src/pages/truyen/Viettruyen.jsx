import './Viettruyen.css';
import TextEditor from "./TextEditor";
import { useState } from "react";
import Searchmain from '../../components/common/Searchmain';
import Sidebar from '../../components/common/Sidebar';

const Viettruyen = () => {
  const [text, setText] = useState("");

  const replaceSpacesWithNbsp = (content) => {
    if (!content) return content;
    return content.replace(/ /g, '&nbsp;');
  };

  return (
    <>
      <Sidebar />
      <Searchmain />
      <div className="all">
        <div className="block">
        <button>nut nhan ne</button>
        <button>xuatban</button>
          <div className="block-1"
            style={{
              width: '100%',
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
            dangerouslySetInnerHTML={{ __html: replaceSpacesWithNbsp(text) || "<br />" }}
          />
          <div className="block-2">
            <form>
              <TextEditor setText={setText} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Viettruyen;
