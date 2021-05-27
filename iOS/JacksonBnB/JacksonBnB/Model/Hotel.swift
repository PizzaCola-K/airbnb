//
//  Hotel.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/27/21.
//

import Foundation

struct LocationDetail {
    let latitude: Double
    let longitude: Double
    let address: String
}

struct Hotel {
    let id: Int
    let imageUrl: String
    let location: LocationDetail
    let name: String
    let likeCount: Int
    let price: Int
    let option: String
    let additionalOption: String    
}

struct Hotels {
    var hotels: [Hotel]
}
