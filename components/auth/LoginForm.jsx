import { useState } from 'react';
import { validateEmail, validatePassword } from './shared/utils';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="w-[12rem] flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-pretendard font-bold text-lg">이메일</label>
        <input
          required
          aria-label="이메일 입력"
          type="email"
          name="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setEmailValid(validateEmail(e.target.value));
          }}
          className="w-full h-8 p-2 border-2 border-gray-200 rounded-sm focus:ring-1 focus:ring-main"
        />
        {!emailValid ? (
          <p className="text-red-500 font-pretendard whitespace-nowrap">
            올바르지 않은 이메일 형식
          </p>
        ) : (
          <p className="text-green-500 font-pretendard whitespace-nowrap">
            올바른 이메일 형식
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-pretendard font-bold text-lg">비밀번호</label>
        <input
          required
          aria-label="비밀번호 입력"
          type="password"
          name="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setPasswordValid(validatePassword(e.target.value));
          }}
          className="w-full h-8 p-2 border-2 border-gray-200 rounded-sm focus:ring-1 focus:ring-main"
        />
        {!passwordValid ? (
          <p className="text-red-500 font-pretendard whitespace-nowrap">
            8자 이상, 영문, 숫자, 특수문자 각각 1개 이상 포함
          </p>
        ) : (
          <p className="text-green-500 font-pretendard whitespace-nowrap">
            올바른 비밀번호 형식
          </p>
        )}
      </div>
      <button
        type="submit"
        className="px-[1rem] py-[0.3rem] bg-white border-2 rounded-md shadow-md font-bold font-ng cursor-pointer hover:bg-main-dark hover:border-main-dark hover:text-white transition-all duration-200 ease-in"
      >
        로그인
      </button>
    </form>
  );
}
