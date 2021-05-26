//
//  NetworkManager.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/26/21.
//

import Foundation
import Alamofire

//private protocol NetworkOperation {
//    func getHotelsByLocation(name: String)
//}
//http://3.36.239.71/places?district=강남&checkIn=2021-05-12&checkOut=2021-05-19&minPrice=20000&maxPrice=40000&adult=2&child=0&infant=1
class NetworkManager {
    
    func getHotelsByLocation(by name: String, completion: @escaping (Data) -> Void) {
        let locationURL = "http://3.36.239.71/places?district=\(name)"
        AF.request(locationURL, method: .get)
            .validate(statusCode: 200..<300)
            .responseData { response in
                switch response.result {
                case .success(let data):
                    completion(data)
                case .failure(let error):
                    print(error.localizedDescription)
                }
            }
    }
}
