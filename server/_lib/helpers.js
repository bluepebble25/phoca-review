const fs = require('fs');
const Ajv = require('ajv');
const ajv = new Ajv();

/**
 * 카드 id에 해당하는 파일을 찾아 파일명을 return한다. 'id-카드명.json' 형태
 * @param {number} cardId 카드 id. 정수 형태
 * @returns id가 숫자이고, 파일목록에 해당 파일이 존재하는 경우에 파일명 return
 */
function getFilenameById(cardId) {
  const id = parseInt(cardId);
  if (Number.isNaN(id)) {
    const err = new Error('id가 정수 형태가 아닙니다.');
    throw err;
  }

  const fileList = fs.readdirSync('uploads/card_info');
  const filename = fileList.find((file) => parseInt(file.split('-')[0]) === id);
  return filename;
}

/**
 * 전달받은 디렉토리(dir)에 위치한 카드들의 정보를 id 오름차순으로 배열에 담아 반환한다.
 * @param {string} dir 카드 정보 파일이 위치한 디렉토리
 * @param {number} page 조회하려는 페이지 번호. 한 페이지의 단위는 item 36개이다.
 * @param {number} limit 가져올 최대 개수
 * @returns 카드 정보를 담은 배열
 */
function readCards(dir, page, limit) {
  page = page || 1;
  limit = limit || 36;
  const files = fs.readdirSync('uploads/card_info');
  files.sort((a, b) => {
    return a.split('-')[0] - b.split('-'[0]); // 오름차순 정렬
  });
  const fileList = files.splice((page - 1) * 36, limit);

  const cards = fileList.map((file) =>
    JSON.parse(fs.readFileSync('uploads/card_info/' + file))
  );
  return cards;
}

/**
 * 카드 파일명을 전달하면, 카드 정보를 json 객체 형태로 반환한다.
 * @param {string} filename 카드 파일명 ex) 2-Hi.json
 * @returns 카드 정보 반환
 */
function readCard(filename) {
  return JSON.parse(fs.readFileSync('uploads/card_info/' + filename));
}

/**
 * 받은 경로(path)에 해당하는 파일을 삭제한다.
 * @param {string} path 삭제할 파일의 경로
 * @returns 성공하면 true를 반환, 실패하면 에러를 던짐
 */
function deleteFile(path) {
  try {
    fs.unlinkSync(path);
    return true;
  } catch {
    const err = new Error('삭제할 파일을 찾는데 실패했습니다.');
    throw err;
  }
}

/**
 * ajv.validate()의 wrapper 함수.
 * 대상(target)이 정의해놓은 JSON 스키마에 맞게 작성되었는지 검증한다.
 * @param {object} schema JSON 스키마
 * @param {object} target 검증할 대상인 JSON 객체
 * @returns validate하면 true, 아니면 false
 */
function isValid(schema, target) {
  return ajv.validate(schema, target);
}

module.exports = {
  getFilenameById,
  readCards,
  readCard,
  deleteFile,
  isValid,
};
