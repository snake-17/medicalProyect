const isValidName = (name) => {
  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,}$/;
  return nameRegex.test(name);
};
const isValidMail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const isUniqueNumericId = (id, users) => {
  return typeof id === "number" && !users.some((user) => user.id === id);
};
const isEmailExist = (newUser, users) => {
  return users.some((u) => u.email === newUser.email);
};
function validateUser(user, users) {
  const { name, email, id } = user;
  if (!isValidName(name)) {
    return {
      isValid: false,
      error: "El nombre debe tener al menos 3 caracteres",
    };
  }
  if (!isValidMail(email)) {
    return {
      isValid: false,
      error: "El correo electronico no es valido",
    };
  }
  if (!isUniqueNumericId(id, users)) {
    return {
      isValid: false,
      error: "El ID tiene que ser numerio y único",
    };
  }
  if (isEmailExist(user, users)) {
    return {
      isValid: false,
      error: "El correo ya está registrado.",
    };
  }
  return {
    isValid: true,
  };
}
module.exports = {
  isValidMail,
  isValidName,
  isUniqueNumericId,
  isEmailExist,
  validateUser,
};
