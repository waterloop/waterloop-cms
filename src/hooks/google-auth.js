import React from 'react';
import api from '../api';
import { socket } from '../api/server';

const useGoogleAuth = (onAuthComplete) => {
  const [disabled, setDisabled] = React.useState(false);

  const popupRef = React.useRef(null);

  React.useEffect(() => {
    socket.open();
    socket.on('google', (userId) => {
      console.log(`useriD: ${userId}`);
      onAuthComplete(null, userId);
    });
    return () => {
      socket.close();
    };
  }, [onAuthComplete]);

  const checkPopup = () => {
    const check = setInterval(() => {
      if (!popupRef.current || popupRef.current.closed || popupRef.closed === undefined) {
        setDisabled(false);
        clearInterval(check);
      }
    }, 1000);
  };

  const openPopup = React.useCallback(async () => {
    const width = 600;
    const height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    try {
      console.log(socket);
      console.log(`SocketId : ${socket.id}`);
      const response = await api.google.authenticate(socket);
      const url = response.data.uri;

      return window.open(url, '',
        `toolbar=no, location=no, directories=no, status=no, menubar=no,
        scrollbars=no, resizable=no, copyhistory=no, width=${width},
        height=${height}, top=${top}, left=${left}`);
    } catch (err) {
      onAuthComplete(err);
      return null;
    }
  }, [onAuthComplete]);

  const login = React.useCallback(
    async () => {
      if (!disabled) {
        popupRef.current = await openPopup();
        setDisabled(true);
        checkPopup();
      }
    },
    [disabled, openPopup],
  );

  return {
    login,
  };
};

export default useGoogleAuth;
