/**
 * * use server
 * ? 서버 액션으로 사용할 수 있게 해준다.
 * ? 브라우저에 노출되지 않는 코드기 때문에 안전하게 키값 사용이 가능함
 * ? 클라이언트 컴포넌트에서 사용하고 싶다면 이렇게 분리해서 사용이 가능하다.
 */
"use server";
import {redirect} from "next/navigation";
//* 서버액션이기 때문에 @/auth의 signIn을 사용
import {signIn} from "@/auth";

// useFormState에 첫번째 인자로 넘기는 함수가 되어서 훅의 초기값을 전달 받는 형태로 변경
export default async (state: { message: string | null } | undefined, formData: FormData): Promise<{ message: string | null } | undefined> => {
  //* formData validation
  if (!formData.get('id') || !(formData.get('id') as string)?.trim()) {
    return {message: 'no_id'}
  }
  if (!formData.get('name') || !(formData.get('name') as string)?.trim()) {
    return {message: 'no_name'};
  }
  if (!formData.get('password') || !(formData.get('password') as string)?.trim()) {
    return {message: 'no_password'};
  }
  if (!formData.get('image')) {
    return {message: 'no_image'};
  }
  
  //* 백엔드에서 name이 아닌 nickname을 요구하고 있으므로 변경하여 전송
  formData.set('nickname', formData.get('name') as string);
  
  // next/navigation의 redirect는 try/catch에서 쓸 수 없기 때문에 이렇게 처리
  let shouldRedirect = false;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
      method: "post",
      body: formData,
      credentials: 'include' // 쿠키 전달을 위해 추가
    });
    console.log(response.status);
    if (response.status === 403) {
      return {message: 'user_exists'}
    }
    console.log(await response.json());
    shouldRedirect = true;
    
    // 회원가입 성공 후 로그인
    await signIn("credentials", {
      username: formData.get('id'),
      password: formData.get('password'),
      redirect: false,
    });
    
  } catch (error) {
    console.error(error);
    return { message: 'server_error' };
  }
  
  if (shouldRedirect) {
    redirect('/home'); // try/catch문에서 절대로 사용해서는 안됨
  }
}