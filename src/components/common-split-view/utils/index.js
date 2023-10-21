export function generateRandomId(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
  const randomIndex = Math.floor(Math.random() * characters.length);
  id += characters.charAt(randomIndex);
  }
  return id;
}

export function getWidthValue(value) {
  let result = value;
  if (typeof value === 'string') {
    // 检查字符串是否以有效的单位结尾
    const unitRegex = /[a-zA-Z%]+$/;
    const hasValidUnit = unitRegex.test(value);

    if (hasValidUnit) {
      // 返回带有有效单位的字符串
      result = value;
    } else {
      // 没有单位，默认添加 px 单位
      result =  value.trim() + 'px';
    }
  } else if (typeof value === 'number') {
    // 数字，默认返回带有 px 单位的字符串
    result =  value + 'px';
  }

  // 不是有效的字符串或数字，返回 null
  result =  null;

  console.log("getWidthValue", value, result);

  return result;
}
export function getCalcResult(expression) {
  const tempElement = document.createElement('div');
  tempElement.style.width = expression;
  tempElement.style.visibility = 'hidden';
  tempElement.style.position = 'absolute';
  document.body.appendChild(tempElement);

  const computedStyle = window.getComputedStyle(tempElement);
  const result = computedStyle.width;
  // console.log("getCalcResult", computedStyle, result)

  document.body.removeChild(tempElement);

  // 解析结果并提取数值部分
  const regex = /([\d.]+)(\D*)/;
  const matches = result.match(regex);

  if (matches) {
    const value = parseFloat(matches[1]);
    const unit = matches[2];

    // return { value, unit };
    return value;
  }

  return null;
}