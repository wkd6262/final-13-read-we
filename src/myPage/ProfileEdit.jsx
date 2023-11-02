import React, { useState } from 'react';
import Header from '../Header';
import ProfileInfoSetting from '../components/mypage/ProfileInfoSetting';
import { useLocation } from 'react-router-dom';
import styles from './css/myPage.module.css';
import '../myPage/ProfileEdit.css';

const ProfileEdit = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatching, setIsPasswordMatching] = useState(false);

  //입력 핸들러 추가
  const handleNicknameChange = (event) => {
    if (event.target.value.length > 20) {
      return;
    }
    setNickname(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // 비밀번호와 비밀번호 확인이 일치하는지 확인
  const loacation = useLocation();
  console.log(loacation.state.id);

  React.useEffect(() => {
    setIsPasswordMatching(password === confirmPassword && password !== '');
  }, [password, confirmPassword]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      // 추가
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const token = localStorage.getItem('token');
    fetch('https://api.mandarin.weniv.co.kr/user', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          accountname: loacation.state.id,
          username: nickname,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          alert('프로필이 성공적으로 업데이트 되었습니다');
          window.location.href = '/main'; // 메인 페이지로 이동
        } else {
          alert('이미 사용중인 계정 ID입니다.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('프로필 업데이트에 실패하였습니다. 다시 시도해주세요.');
      });
  };

  return (
    <div className={styles.pageWrap}>
      <Header />
      <div className={styles.contentArea}>
        <h1 style={styles['h1-profile']} className="edit-profile">
          프로필 수정
        </h1>

        <div className="parent">
          {/* 유저 프로필 사진 삽입 + 닉네임 노출 */}
          <ProfileInfoSetting />
        </div>

        {/* 닉네임 입력 필드 */}
        <input
          type="text"
          placeholder="닉네임"
          className="basic gray"
          value={nickname}
          onChange={handleNicknameChange}
          style={{ marginBottom: '10px' }}
        />
        <p> 닉네임은 영문, 숫자만 가능합니다.</p>
        <p> 20자 이내로 입력하세요</p>

        {/* 1차 비밀번호 입력 필드 */}
        <input
          type="password"
          placeholder="비밀번호"
          className="basic gray"
          onChange={handlePasswordChange}
          style={{ marginTop: '30px' }}
        />

        {/* 2차 비밀번호 입력 필드 */}
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="basic gray"
          value={confirmPassword} // 수정
          onChange={handleConfirmPasswordChange}
          style={{ marginTop: '20px' }}
        />

        {isPasswordMatching && <p>비밀번호가 일치합니다.</p>}

        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#E87C3E',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'block',
            fontSize: '16px',
            margin: '50px auto',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        >
          제출
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
