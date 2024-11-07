import './Viettruyen.css';
import TextEditor from "./TextEditor";
import { useState } from "react";

import MainLayout from '../../../../layout/user/mainLayout/MainLayout';

const Viettruyen = () => {
  const [text, setText] = useState("");

  const replaceSpacesWithNbsp = (content) => {
    if (!content) return content;
    return content.replace(/ /g, '&nbsp;');
  };

  return (
    <>
  <MainLayout>
      <div className="all">
        <div className="block">
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
        <button className="create-story">Xuất bản</button>
      </div>
      </MainLayout>
    </>
  );
};

export default Viettruyen;
