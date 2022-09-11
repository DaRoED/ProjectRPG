/**
 *  ---------------------------
 * | LoginManager.js ver 1.0.1 |
 *  ---------------------------
 * 
 * ver 1.0.0 - sing_up, sign_in, check_login 메서드 정의
 * ver 1.0.1 - 오류 수정
 */
var DB = Bridge.getScopeOf('DatabaseManager').DB;
DB = new DB.DB();

function Login() { }

Login.prototype.sign_up = function (id, pw) {
    const user = getDB('user');
    const check_sameUser = user.some(obj => obj.id === id);

    if (!check_sameUser) {
        user.push(new DB.create_userInformation(id, pw));
        DB.saveDB(user, 'user')

        return { statusCode: true };
    } else {
        return { statusCode: false };
    }
}
/**
 * @param {string} id 
 * @param {string} pw 
 * @returns {number}
 *  ------------
 * | statusCode |
 *  ------------
 * 
 * 0: 이미 로그인 되어있다.
 * 1: 로그인 성공
 * 2: 비밀번호가 틀리다.
 * 3: 회원가입이 안되어있다.
 */
Login.prototype.sign_in = function (id, pw) {
    const USER = getDB('user'); // user 객체를 불러온다.
    const user = getUser(id); // 참조용 > 확인용

    if (user.statusCode) {
        if (this.check_login(id)) return { statuscode: 0 }; // 로그인이 되어있으면 { statusCode: 0 }을 반환

        else {
            if (user._user.pw === pw) {
                USER[USER.findIndex(obj => obj.id === id)].isLogin = true; // 패스워드가 같으면 해당 유저의 isLogin에 true를 할당
                DB.saveDB(USER, 'user');

                return { statusCode: 1 }; // 또한 { statusCode: 1 }을 반환
            }

            else return { statusCode: 2 }; // 비밀번호가 틀리면 { statusCode: 2 }를 반환
        }

    } else return { statusCode: 3 }; // 유저 정보를 찾을 수 없다면(회원가입을 안했다면) { statusCode: 3 }을 반환

}
/**
 * @param {string} id 
 * @returns {boolean} 
 */
Login.prototype.check_login = function (id) {
    const user = getUser(id);

    if (user._user.isLogin) return true;
    else return false;
}
