export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) return true;
  return false;
};

export const validatePassword = password => {
  // 8자 이상, 영문, 숫자, 특수문자 각각 1개 이상 포함
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return regex.test(password);
};
