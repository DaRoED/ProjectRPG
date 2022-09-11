/** 
 *  ------------------------------
 * | DatabaseManager.js ver 1.0.2 |
 *  ------------------------------
 * 
 * ver 1.0 - getDB, saveDB, create_userInformation 메서드 정의
 * ver 1.0.1 - getUser 메서드 정의
 * ver 1.0.2 create_userInformation 내용 수정(this.isLogin, this.statPoint 추가)
 */

const fs = FileStream;

function DB() { }
/**
 * @param {string} name 
 * @returns {array}
 */
DB.prototype.getDB = function (name) { // DB를 가져옵니다.
    switch (name) {
        case 'user':
            return JSON.parse(fs.read('sdcard/RPG/DB/user.json'));
        case 'item':
            return JSON.parse(fs.read('sdcard/RPG/DB/item.json'));
        case 'monster':
            return JSON.parse(fs.read('sdcard/RPG/DB/monster.json'));
        case 'map':
            return JSON.parse(fs.read('sdcard/RPG/DB/map.json'));
        default:
            throw 'wrong name, please correction name';
    }
}
/**
 * @param {string} value 
 * @param {string} path 
 */
DB.prototype.saveDB = function (value, path) { // 첫 번째 인자로 넣은 값을 path 경로에 따라 백업 및 저장
    if (typeof value === 'object') { // 만약 첫 번째 인자로 object 타입을 넣었을 시 string으로 형변환
        value = JSON.stringify(value);
    }

    switch (path) {
        case 'user':
            fs.write('sdcard/RPG/backup/user.json', JSON.stringify(this.getDB('user')));
            fs.write('sdcard/RPG/DB/user.json', value);
            break;
        case 'item':
            fs.wrtie('sdcard/RPG/backup/item.json', JSON.stringify(this.getDB('item')));
            fs.write('sdcard/RPG/DB/item.json', value);
            break;
        case 'monster':
            fs.write('sdcard/RPG/backup/monster.json', JSON.stringify(this.getDB('monster')));
            fs.write('sdcard/RPG/DB/monster.json', value);
            break;
        case 'map':
            fs.write('sdcard/RPG/backup/map.json', JSON.stringify(this.getDB('map')));
            fs.write('sdcard/RPG/DB/map.json', value);
            break;
        default:
            throw 'please check path one more';
    }
}
/**
 * @param {string} id 
 * @param {string} pw 
 */
DB.prototype.create_userInformation = function (id, pw) { // 유저 정보를 생성 및 반환
    this.id = id;
    this.pw = pw;
    this.inventory = {};
    this.inventory.sundryItem = [];
    this.inventory.useItem = [];
    this.inventory.wearItem = {};
    this.inventory.wearItem.helmet = 'empty';
    this.inventory.wearItem.armor = 'empty';
    this.inventory.wearItem.legings = 'empty';
    this.inventory.wearItem.boots = 'emtpy';
    this.inventory.wearItem.weapon = 'empty';
    this.xp = 0;
    this.nxp = 10;
    this.level = 1;
    this.atk = 2;
    this.def = 3;
    this.hp = 20;
    this.statPoint = 3;
    this.isLoing = true;
}
/**
 * 
 * @param {string} id 
 * @returns {new create_userInformation}
 */
DB.prototype.getUser = function (id) { // 인자로 받은 id를 가지는 유저 객체를 반환합니다.
    const _user = this.getDB('user').find(user => user.id === id);

    if (_user) return { statusCode: true, _user: _user };
    else return { statusCode: false };
}
