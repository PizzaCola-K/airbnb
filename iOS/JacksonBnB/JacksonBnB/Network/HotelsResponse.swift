//
//  HotelsResponse.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/26/21.
//

import Foundation
struct LocationRespons: Decodable {
    let latitude: Double
    let longitude: Double
    let address: String
    
    enum CodingKeys: String, CodingKey {
        case latitude
        case longitude
        case address
    }
}

struct HotelsResponse: Decodable {
    let id: Int
    let imageUrl: String
    let location: LocationRespons
    let name: String
    let likeCount: Int
    let price: Int
    let option: String
    let additionalOption: String
    
    enum CodingKeys: String, CodingKey {
        case id
        case imageUrl
        case location
        case name
        case likeCount
        case price
        case option
        case additionalOption
    }
}

/*
 "id": 1,
 "imageUrl": "https://codesquad.kr/img/place/img_5225.jpg",
 "location": {
 "latitude": 37.49082129914656,
 "longitude": 127.03341667375932,
 "address": "서울 강남구 강남대로62길 23 4층"
 },
 "name": "코드스쿼드",
 "likeCount": 0,
 "price": 20000,
 "option": "최대 4명 · 방 3개 · 화장실 2개",
 "additionalOption": "커피포트 · 화이트보드 · 빔프로젝터"
 */
