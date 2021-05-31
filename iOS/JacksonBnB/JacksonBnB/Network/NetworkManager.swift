//
//  NetworkManager.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/26/21.
//

import Foundation
import Alamofire

protocol NetworkManagerOperations {
    func getAllHotels<T: Decodable>(completion: @escaping (Result<T,Error>) -> Void)

    func getHotelsByLocation<T: Decodable>(by name: String, completion: @escaping (Result<T,Error>) -> Void)
}

//네트워크는 네트워크 통신만 해주는게 맞다.
class NetworkManager: NetworkManagerOperations {
    
    let locationURL = "http://3.36.239.71/api/places?"
    
    func getAllHotels<T>(completion: @escaping (Result<T, Error>) -> Void) where T : Decodable {
        AF.request(locationURL, method: .get)
            .responseDecodable(of: T.self) { response in
                switch response.result {
                case .success(let data):
                    completion(.success(data))
                case .failure(let error):
                    print(error.localizedDescription)
                }
            }
    }
    
    func getHotelsByLocation<T: Decodable>(by name: String, completion: @escaping (Result<T,Error>) -> Void) {
    
        let param: Parameters = [
            "district" : name
        ]
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
