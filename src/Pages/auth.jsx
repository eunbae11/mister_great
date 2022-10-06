import { 
    Link,
    useNavigate,
     } from 'react-router-dom'
import React, { useState } from "react";
import { 
    signInWithEmailAndPassword, //로그인
    onAuthStateChanged,         // 로그인 상태
    signOut,                    // 로그아웃
     } from "firebase/auth";
import { auth } from "../firebase.config";

function Auth() {
  const navigate = useNavigate(); // 로그인/아웃 완료시 메인페이지로 이동하기위한 훅 선언
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 상태 감지
  const [isLogin, setIsLogin] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if(user) setIsLogin(true); 
      else setIsLogin(false);
  })

  // 로그인 입력 변경 시 동작
  const onChange = (event) => {
    const {target: {name, value}} = event;
    if (name==='email') {
      setEmail(value)
    } else if (name=== "password") {
      setPassword(value);
    }
  }

  // 로그인 제출 시 동작
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      return e.message.replace("Firebase: Error ", "");
    }
    navigate('/auth');
  }

  // 로그아웃
  const logout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if(!isLogin) {
    return (
      <div>
        <div>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              type="email"
              name="email"
              value={email}
              placeholder="이메일을 입력하세요"
              />
            <input
              onChange={onChange}
              type="password"
              name="password"
              value={password}
              placeholder="비밀번호를 입력하세요"
            />
            <button type="submit">
              로그인
            </button>
            <p>아직 회원이 아니신가요?<Link to={'../register'}>회원가입</Link></p>
          </form>
        </div>
      </div>
    )
  } else {
    return (
      <div>
      <p>~~!?님 환영</p>
      <p><Link to={'../orderHistory'}>주문내역보기/주문하기</Link></p>
      <p><button onClick={logout}>로그아웃</button></p>
      </div>
    )
  }
}

export default Auth;