function getCheckList(user_id) {
    if (user_id == 1) {
        return [{
            'id': 1001,
            'name': 'Mr Wang',
            'phone': '13811111111',
            'areaCode': '010',
            'landLine': '64627856',
            'provinceId': 110000,
            'province': 'Guang Dong ',
            'cityId': 110100,
            'city': 'Shenzhen',
            'countyId': 110106,
            'county': 'Futian',
            'add': 'Room 319, building 6, Shangdi 10th Stree',
            'default': false,
            'checked': true
        }, {
            'id': 1002,
            'name': 'Mr Li',
            'phone': '15765349349',
            'areaCode': '010',
            'landLine': '64627856',
            'provinceId': 110000,
            'province': 'Guang Dong ',
            'cityId': 110100,
            'city': 'Shenzhen',
            'countyId': 110106,
            'county': 'Futian',
            'add': 'Room 452, building 4, Shangdi 11th Stree',
            'default': true,
            'checked': true
        }]
    }
}

module.exports = getCheckList