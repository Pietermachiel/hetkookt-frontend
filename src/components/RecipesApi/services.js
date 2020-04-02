export const getProfile = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        number: "9212228333",
        name: "ankit",
        email: "ankit.kr.balyan@gmail.com"
      });
    }, 500);
  });
};
