"use client"; // form을 쓰기 떄문에

import style from "./post-form.module.css";
import {ChangeEventHandler, FormEvent, FormEventHandler, useRef, useState} from "react";
import {Session} from "@auth/core/types";
import TextareaAutosize from "react-textarea-autosize";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {IPost} from "@/model/Post";
import {useRouter} from "next/navigation";

type TProps = {
  me: Session | null
}

export default function PostForm({ me }: TProps) {
  const imageRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<Array<{ dataUrl: string, file: File }>>([]);
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();
  
  //* 뮤테이션 사용하기
  const mutation = useMutation({
    //? FormEventHandler -> FormEvent
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('content', content);
      //* 이미지 파일 집어넣기
      preview.forEach((p) => {
        p && formData.append('images', p.file);
      });
      //? 성공 실패 여부는 리액트 쿼리에 맡긴다.
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
    },
    /**
     * onMutate() {} :
     * - 뮤테이션 함수 호출시 실행
     *
     * onSettled() {} :
     * - 성공, 실패 상관없이 뮤테이션이 완전 종료되었을 때 실행
     */
    //? 요청 성공시
    /**
     * response: fetch 응답값
     * variable: mutationFn에서 받은 인자
     * context: onMutate에서 return 받은 값
     */
    async onSuccess(response, variable, context) {
      const newPost = await response.json();
      setContent('');
      setPreview([]);
      if (queryClient.getQueryData(['posts', 'recommends'])) {
        queryClient.setQueryData(['posts', 'recommends'], (prevData: { pages: IPost[][] }) => {
          const shallow = {
            ...prevData,
            pages: [...prevData.pages],
          };
          shallow.pages[0] = [...shallow.pages[0]];
          shallow.pages[0].unshift(newPost);
          return shallow;
        });
      }
      if (queryClient.getQueryData(['posts', 'followings'])) {
        queryClient.setQueryData(['posts', 'followings'], (prevData: { pages: IPost[][] }) => {
          const shallow = {
            ...prevData,
            pages: [...prevData.pages],
          };
          shallow.pages[0] = [...shallow.pages[0]];
          shallow.pages[0].unshift(newPost);
          return shallow;
        });
      }
    },
    //? 요청 실패시
    onError(err) {
      console.error(err);
      alert("Post Upload Error.");
    },
  });
  
  // textarea 이벤트 타이핑
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };
  
  const onClickButton = () => {
    // 옵셔널 체이닝을 통해서 간단하게 처리
    imageRef.current?.click();
  };
  
  const onRemoveImage = (imgIdx: number) => () => {
    setPreview((prevPreview) => {
      return prevPreview.filter((v, idx) => idx !== imgIdx);
    })
  }
  
  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    console.log("onUpload1");
    if (e.target.files) {
      console.log("onUpload2");
      Array.from(e.target.files).forEach((file, idx) => {
        const reader = new FileReader();
        
        //* 파일을 읽은후 실행됨
        reader.onloadend = () => {
          setPreview((prevPreview) => {
            const prev = [...prevPreview];
            prev[idx] = {
              dataUrl: reader.result as string,
              file
            };
            return prev;
          });
        };
        
        //* 파일마다 경로를 읽음
        reader.readAsDataURL(file);
      })
    }
  };
  
  return (
    //* onSubmit에 mutation 사용하기
    <form className={style.postForm} onSubmit={mutation.mutate}>
      <div className={style.postUserSection}>
        <div className={style.postUserImage}>
          <img src={me?.user?.image as string} alt={me?.user?.email as string} />
        </div>
      </div>
      <div className={style.postInputSection}>
        <TextareaAutosize value={content} onChange={onChange} placeholder={"오늘은 무슨일이 있었나요?"} />
        <div style={{ display: "flex" }}>
          {preview.map((v, idx) => (
            v &&
            <div key={idx} onClick={onRemoveImage(idx)} style={{ flex: 1 }}>
                <img src={v.dataUrl} alt={v.dataUrl} style={{ maxWidth: "100%" }} />
            </div>
          ))}
        </div>
        <div className={style.postButtonSection}>
          <div className={style.footerButtons}>
            <div className={style.footerButtonLeft}>
              <input type="file" name="imageFiles" multiple hidden ref={imageRef} onChange={onUpload}/>
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