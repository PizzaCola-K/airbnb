//
//  NetworkManager.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/26/21.
//

import Foundation
import Alamofire

protocol NetworkManagerOperations {
    func getHotelsByLocation<T: Decodable>(by name: String, completion: @escaping (Result<T,Error>) -> Void)
}
class NetworkManager: NetworkManagerOperations {
    
    //네트워크는 네트워크 통신만 해주는게 맞다.
    func getHotelsByLocation<T: Decodable>(by name: String, completion: @escaping (Result<T,Error>) -> Void) {
    
        let param: Parameters = [
            "district" : name
        ]
        
        let locationURL = "http://3.36.239.71/places?"
        AF.request(locationURL, method: .get, parameters: param, encoding: URLEncoding.queryString)
            .validate(statusCode: 200..<300)
            .responseDecodable(of: T.self) { response in
                switch response.result {
                case .success(let data):
                    completion(.success(data))
                case .failure(let error):
                    print(error.localizedDescription)
                }
            }
    }
}
