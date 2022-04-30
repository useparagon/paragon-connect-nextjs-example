module.exports = {
  redirects() {
    return [
      {
        source: "/",
        destination: "/tasks",
        permanent: true,
      },
    ];
  },
};
