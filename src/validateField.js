function validateField(fieldInfo) {
  const { width, height, count } = fieldInfo;
  if (count > width * height) {
    throw Error("입력값이 잘못되었습니다");
  }
}

module.exports = validateField;
