var Login = {}; //로그인 변수

/**
*회원가입 함수
*@param {string} id 아이디(영문자 필수, 숫자, 언더바 가능, 6글자 이상)
*@param {string} password 비밀번호(영문자 또는 숫자 필수. 언더바 사용가능, 6글자 이상)
*@param {number | string} userProfile 유저 관련 내용
*@return 0 : 잘못된 아이디, 1 : 잘못된 비밀번호, 2 : 이미 회원가입된 아이디, 3 : 회원가입 성공
*/
function sign_up(id, password, userProfile){
  id = id.trim();
  password = password.trim();
  if(!id||!id.match(/a-zA-z/)||id.match(/\W/)||id.length >= 6)
    return 0;
  if(password == undefined||!password.match(/a-zA-z|0-9/)||password.match(/\W/)||password.length >= 6)
    return 1;
  let ids = getDB("user");
  if(ids[id] != undefined)
    return 2;
  ids[id] = { password : password, usingUser : false /** and more... */ };
  saveDB(ids, "user");
  return 3;
}

/**
*로그인 함수
*@param {string} id 아이디(영문자 필수, 숫자, 언더바 가능, 6글자 이상)
*@param {string} password 비밀번호(영문자 또는 숫자 필수. 언더바 사용가능, 6글자 이상)
*@param {number | string} userProfile 유저 관련 내용
*@return 0 : 잘못된 아이디, 1 : 잘못된 비밀번호, 2 : 이미 로그인한 사람, 3 : 로그인 성공
*/
function sign_in(id, password, userProfile){
  id = id.trim();
  password = password.trim();
  let ids = getDB("user");
  if(ids[id] == undefined)
    return 0;
  if(ids[id].password != password)
    return 1;
  if(Login[userProfile] != undefined)
    return 2;
  if(ids[id].usingUser !== false)
    delete Login[ids[id].usingUser];
  ids[id].usingUser = userProfile;
  saveDB(ids, 'user');
  Login[userProfile] = id;
  return 3;
}

/**
*로그아웃 함수
*@param {number | string} userProfile 유저 관련 내용
*@return false : 로그인하지 않음, true : 로그아웃함
*/
function sign_out(userProfile){
  let ids = getUserDB(userProfile);
  if(ids === false)
    return false;
  ids.usingUser = false;
  saveUserDB(userProfile, ids);
  delete Login[userProfile];
  return true;
}

/**
*로그인 여부 함수
*@param {number | string} userProfile 유저 관련 내용
*@return false : 로그인하지 않음, true : 로그인함
*/
function isLogin(userProfile){
  if(Login[userProfile] == undefined)
    return false;
  return true;
}

/**
*userProfile 값의 유저를 찾아 해당 유저의 DB 반환
*@param {number | string} userProfile 유저 관련 내용
*@return false : 로그인하지 않음, object : 해당 유저 DB
*/
function getUserDB(userProfile){
  if(Login[userProfile] == undefined)
    return false;
  return getDB("user")[Login[userProfile]];
}

/**
*userProfile 값의 유저의 값을 value로 변경
*@param {number | string} userProfile 유저 관련 내용
*@param {object} 바꿀 값
*@return false : 로그인하지 않음, true : 변경 성공
*/
function saveUserDB(userProfile, value){
  if(Login[userProfile] == undefined)
    return false;
  let ids = getDB("user");
  ids[Login[userProfile]] = value;
  saveDB(ids, "user");
  return true;
}
