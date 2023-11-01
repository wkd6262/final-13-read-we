import React, { useEffect, useState } from 'react';
import ProfileList from '../components/mypage/ProfileList';
import { useNavigate } from 'react-router-dom';

const FollowerList = ({ myInfo }) => {
  const [followerList, setFollowerList] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = 'https://api.mandarin.weniv.co.kr';
  const accName = myInfo.user.accountname;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const getFollower = async () => {
      const reqUrl = `${baseUrl}/profile/${accName}/follower`;
      const res = await fetch(reqUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const json = await res.json();
      setFollowerList(json);
      setIsLoading(false);
    };
    getFollower();
  }, []);

  return (
    <>
      {isLoading ||
        followerList.map((e, index) => {
          return (
            <ProfileList
              key={index}
              imgSrc={baseUrl + '/' + e.image.replace(/^.*\//, '')}
              userName={e.username}
              userEmail="email"
              type="dot"
              pageEvent={(event) => {
                event.preventDefault();
                navigate('/yourpage', {
                  state: {
                    id: e.accountname,
                  },
                });
              }}
            />
          );
        })}
    </>
  );
};

export default FollowerList;
