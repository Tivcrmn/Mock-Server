export const genAge = obj => {
  return Math.floor(Math.random() * 100);
};

export const genCnGender = obj => {
  let gender = Math.floor(Math.random() * 2);
  return ["男", "女"][gender];
};

export const genEnGender = obj => {
  let gender = Math.floor(Math.random() * 2);
  return ["male", "female"][gender];
};

export const genNumber = obj => {
  return Math.floor(Math.random() * 1000000);
};

export const genString = obj => {
  let encode = [];
  let str = "";
  let genCharArray = (charA, charZ) => {
    let arr = [];
    let i = charA.charCodeAt(0);
    let j = charZ.charCodeAt(0);
    for (; i <= j; i++) {
      arr.push(String.fromCharCode(i));
    }
    return arr;
  };

  encode = encode.concat(genCharArray("a", "z"));
  encode = encode.concat(genCharArray("A", "Z"));
  encode = encode.concat(genCharArray("0", "9"));
  let len = 23;
  for (let i = 0; i < len; i++) {
    str += encode[Math.floor(Math.random() * 62)];
  }
  return str;
};

export const genMobile = obj => {
  let prefixArray = [
    "130", "131", "132", "133", "135",
    "137", "138", "170", "187", "189",
  ];
  let mobile = prefixArray[parseInt(10 * Math.random())];
  for (let j = 0; j < 8; j++) {
    mobile = mobile + Math.floor(Math.random() * 10);
  }
  return mobile;
};

export const genIdNumber = obj => {
  // 加权因子
  let coefficientArray = [
    "7", "9", "10", "5", "8", "4",
    "2", "1", "6", "3", "7", "9",
    "10", "5", "8", "4", "2",
  ];
  // 校验码
  let lastNumberArray = [
    "1", "0", "X", "9", "8", "7",
    "6", "5", "4", "3", "2",
  ];
  // 住址
  let address = "420101";
  // 生日
  let birthday = "19810101";
  let s = Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString();
  let array = (address + birthday + s).split("");
  let total = 0;
  for (let i in array) {
    total = total + parseInt(array[i]) * parseInt(coefficientArray[i]);
  }
  let lastNumber = lastNumberArray[parseInt(total % 11)];
  return address + birthday + s + lastNumber;
};

export const genBool = () => {
  let a = Math.floor(Math.random());
  if (a > 0.5) {
    return true;
  } else {
    return false;
  }
};

export const gen = type => {
  if (type === "age") {
    return genAge(type);
  }

  if (type === "cn-gender") {
    return genCnGender(type);
  }

  if (type === "cn-id") {
    return genIdNumber(type);
  }

  if (type === "number") {
    return genNumber(type);
  }

  if (type === "string") {
    return genString(type);
  }

  if (type === "en-gender") {
    return genEnGender(type);
  }

  if (type === "mobile") {
    return genMobile(type);
  }

  if (type === "bool") {
    return genBool(type);
  }
};

export default {
  gen,
};
