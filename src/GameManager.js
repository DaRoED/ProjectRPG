/**
 *  --------------------------
 * | GameManager.js ver 1.0.0 |
 *  --------------------------
 */

var DB = Bridge.getScopeOf('DatabaseManager').DB;
DB = new DB();

let user = DB.getDB('user');
let map = DB.getDB('map');
let item = DB.getDB('item');

function GameManager() {}
/**
 * @param {string} userName 
 * @param {string} itemName 
 * @param {string} userLocation 
 *  ------------
 * | statusCode |
 *  ------------
 * 
 * 0: 유저의 소지 골드가 부족합니다.
 * 1: 해당 위치에 있는 상점의 구매 가능 리스트에서 해당 아이템을 찾을 수 없습니다.
 * 2: 구매에 성공하였습니다.
 */
GameManager.prototype.buy_wearItem = function (userName, itemName, userLocation) {
    try {
      
        const buy_item = map.facility[userLocation].shop.activity.buy.item_list; //item.json의 태초마을의 시설 상점에서 구매 가능 아이템을 가져온다.

        if (buy_item.some(itme => itme === itemName)) { // 해당 아이템이 있다면
            const value = item.wearItem[itemName].buy_value; // 아이템의 가격
            const USER = DB.getUser(userName); // 참조용 유저 객체를 가져온다.
            
            if (USER.gold >= value) { // 유저의 소지 골드가 아이템의 가격보다 많다면
                const User = user[user.findIndex(user => user.id === userName)] // user.json에서 수정용 유저 데이터를 찾는다.
                User.gold -= value; // 유저의 소지 골드에서 아이템 가격만큼 차감한다.
                User.inventory.wearItem.push(itemName); // 유저의 인벤토리의 wearItem 분류에 구매한 아이템을 넣는다.

                return { statusCode: 2 };
            } else {
                return { statusCode: 0 };
            }
        } else {
            return { statusCode: 1 };
        }

    } catch (e) {
        APi.replyRoom(mainRoom, e); // 오류 발생시 mainRoom 으로 오류 메시지 전달
    }
}
