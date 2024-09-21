//* 정식 기능이 된 서버 액션을 사용하기 위해 서버 컴포넌트로 변경
import style from "@/app/(beforeLogin)/_component/signup.module.css";
import BackButton from "@/app/(beforeLogin)/_component/BackButton";
import {redirect} from "next/navigation";

export default function SignupModal() {

  const submit = async (formData: FormData) => {
    /**
     * * use server
     * ? 서버 액션으로 사용할 수 있게 해준다.
     * ? 브라우저에 노출되지 않는 코드기 때문에 안전하게 키값 사용이 가능함
     */
    "use server";
    
    //* formData validation
    if (!formData.get('id')) {
      return {message: 'no_id' }
    }
    if (!formData.get('name')) {
      return {message: 'no_name' };
    }
    if (!formData.get('password')) {
      return {message: 'no_password' };
    }
    if (!formData.get('image')) {
      return {message: 'no_image' };
    }
    
    // next/navigation의 redirect는 try/catch에서 쓸 수 없기 때문에 이렇게 처리
    let goRedirect = false;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
        method: "POST",
        body: formData,
        credentials: 'include' // 쿠키 전달을 위해 추가
      });
      console.log(response.status);
      if (response.status === 403) {
        return { message: 'user_exists' }
      }
      console.log(await response.json());
      goRedirect = true;
    } catch (error) {
      console.error(error);
    }
    
    if (goRedirect) {
      redirect('/home'); // try/catch문에서 절대로 사용해서는 안됨
    }
  }
  
  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton/>
            <div>계정을 생성하세요.</div>
          </div>
          {/* action의 submit이 서버액션 */}
          <form action={submit}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">아이디</label>
                <input
                  className={style.input}
                  id="id"
                  name={"id"} // form을 통쨰로 받아서써야하기 때문에 name 추가
                  type="text"
                  placeholder=""
                  required // validation을 input에서 직접 처리해야 함.
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
              <button type={"submit"} className={style.actionButton}>가입하기</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}