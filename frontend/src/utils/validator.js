export function validateMode (mode) {
  return mode === '' ? '请选择是否需要押韵' : null
}

export function validateLength (length) {
  return length === ''
    ? '请填写希望生成歌词的句数'
    : (!RegExp('^[0-9]+$').test(length) ? '生成歌词的句数应该为数字' : null)
}

export function validatePattern (mode, length, pattern) {
  if (mode === 'Rhyme' && pattern === '') {
    return '请填写押韵格式'
  } else if (mode === 'Rhyme' && pattern.length !== parseInt(length)) {
    return '押韵格式长度需要与生成歌词句数一致'
  }
  return null
}

export function validatePrefix (prefix) {
  return prefix === '' ? '请输入开头' : null
}
