export default (server) => (formData) => {
  const headers = {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    },
  };

  return server.post('/api/upload', formData, headers);
};
