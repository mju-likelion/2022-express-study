// 이 파일은 수정하시면 안됩니다.
// 이 파일의 역할은 사용자로부터 입력을 받고 그 입력값을 createMineField 함수에 넘기는 역할입니다.

const { createInterface } = require("readline");
const createMineField = require("./createMineField");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fieldInfo = {
  width: 0,
  height: 0,
  count: 0,
};

// 아래 블럭은 사용자로부터 지뢰밭에 대한 정보를 입력받는 코드입니다.
rl.question("지뢰밭의 가로 길이를 입력해주세요. ", w => {
  rl.question("지뢰밭의 세로 길이를 입력해주세요. ", h => {
    rl.question("지뢰의 개수를 입력해주세요. ", c => {
      fieldInfo.width = +w;
      fieldInfo.height = +h;
      fieldInfo.count = +c;
      rl.close();
    });
  });
});

rl.on("close", function () {
  const field = createMineField(fieldInfo);
  console.log(field);
});
