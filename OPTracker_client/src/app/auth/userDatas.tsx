import { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '@system/next.config';
import { showNotification } from '@/utils/notifications';

export default function userDatasHook({
  userDatas,
  setUserDatas,
}: {
  userDatas: any;
  setUserDatas: (data: any) => void;
}) {
  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('token')) {
        await axios
          .get(`${config.WEBSITE_URL}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setUserDatas({ ...res.data });
          });
      }
    };
    fetchData();
  }, [localStorage.getItem('token')]);
}
