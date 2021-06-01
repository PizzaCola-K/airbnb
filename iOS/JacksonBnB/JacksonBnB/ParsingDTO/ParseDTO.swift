//
//  ParseDTO.swift
//  JacksonBnB
//
//  Created by jinseo park on 6/1/21.
//

import Foundation

class ParseDTO {
        
    func parseResponseToData(from hotelResponse: [HotelsResponse]) -> Hotels {
        //DTO 파싱 역할하기. HotelResponse to Hotel
        var foundHotels = Hotels(hotels: [])
        hotelResponse.forEach { hotel in
            foundHotels.hotels.append(Hotel(id: hotel.id, imageUrl: hotel.imageUrl, location: LocationDetail(latitude: hotel.location.latitude, longitude: hotel.location.longitude, address: hotel.location.address), name: hotel.name, likeCount: hotel.likeCount, price: hotel.price, option: hotel.option, additionalOption: hotel.additionalOption))
        }
        return foundHotels
    }
}
