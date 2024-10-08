//* 클라이언트 컴포넌트에서 Server Actions 사용을 위해 클라이언트 컴포넌트 선언
"use client";

import style from "@/app/(beforeLogin)/_component/signup.module.css";
import BackButton from "@/app/(beforeLogin)/_component/BackButton";
//* 서버액션 함수로 분리한 코드를 임포트해와서 사용!
import onSubmit from "../_lib/signup";
import { useFormState, useFormStatus} from "react-dom";

function showMessage(message: string | null | undefined) {
  if (message === 'no_id') {
    return '아이디를 입력하세요.';
  }
  if (message === 'no_name') {
    return '닉네임을 입력하세요.';
  }
  if (message === 'no_password') {
    return '비밀번호를 입력하세요.';
  }
  if (message === 'no_image') {
    return '이미지를 업로드하세요.';
  }
  if (message === 'user_exists') {
    return '이미 사용 중인 아이디입니다.';
  }
  return '';
}

export default function SignupModal() {
  /**
   * 두 훅 모두 리액트에서 실험중인 기능으로 폼을 다루는데 사용할 수 있다.
   * Next에서 지원하고 있는 함수기 떄문에 사용이 가능하다.
   * useFormState
   * => 폼에서 state를 쓸 수 있다.
   * 작성한 서버 액션함수를 첫번째 인자로 넘기면 훅에서 관리하는 함수가 됨
   * 두번째 인자는 초기값
   *
   * useFormStatus
   * => 클아이언트단에서 폼처리가 끝난후 처리중인 정보들에 대한(통신)
   * 정보를 가져올 수 있다.
   */
  
  const [state, formAction] = useFormState(onSubmit, { message: null });
  const {pending} = useFormStatus();
  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton/>
            <div>계정을 생성하세요.</div>
          </div>
          {/* useFormState의 formAction 을 사용 */}
          <form action={formAction}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">아이디</label>
                <input
                  className={style.input}
                  id="id"
                  name={"id"} // form을 통쨰로 받아서써야하기 때문에 name 추가
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">닉네임</label>
                <input
                  id="name"
                  name={"name"}
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">비밀번호</label>
                <input
                  id="password"
                  name="password"
                  className={style.input}
                  type="password"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">프로필</label>
                <input
                  id="image"
                  name="image"
                  className={style.input}
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button type={"submit"} className={style.actionButton} disabled={pending}>가입하기</button>
              <div className={style.error}>{showMessage(state?.message)}</div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}