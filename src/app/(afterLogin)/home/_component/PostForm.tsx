"use client"; // form을 쓰기 떄문에
import style from "./post-form.module.css";
import {ChangeEventHandler, FormEventHandler, useRef, useState} from "react";
import {useSession} from "next-auth/react";

export default function PostForm() {
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState('');
  const {data: me} = useSession();
  
  // textarea 이벤트 타이핑
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };
  
  // form 이벤트 타이핑
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  }
  const onClickButton = () => {
    // 옵셔널 체이닝을 통해서 간단하게 처리
    imageRef.current?.click();
  };
  
  return (
    <form className={style.postForm} onSubmit={onSubmit}>
      <div className={style.postUserSection}>
        <div className={style.postUserImage}>
          <img src={me?.user?.image as string} alt={me?.user?.email as string} />
        </div>
      </div>
      <div className={style.postInputSection}>
        <textarea value={content} onChange={onChange} placeholder={"오늘은 무슨일이 있었나요?"}/>
        <div className={style.postButtonSection}>
          <div className={style.footerButtons}>
            <div className={style.footerButtonLeft}>
              <input type="file" name="imageFiles" multiple hidden ref={imageRef} />
              <button className={style.uploadButton} type="button" onClick={onClickButton}>
                <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path
                      d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </button>
            </div>
            <button className={style.actionButton} disabled={!content}>게시하기</button>
          </div>
        </div>
      </div>
    </form>
  )
}