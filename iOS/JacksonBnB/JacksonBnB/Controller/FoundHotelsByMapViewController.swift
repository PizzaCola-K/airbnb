//
//  FoundHotelsByMapViewController.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/31/21.
//

import Foundation
import UIKit
import NMapsMap

class FoundHotelsByMapViewController: UIViewController {
    
    var foundHotels = Hotels(hotels: [])
    let networkManager = NetworkManager()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()        
//        let nmfmapView = NMFMapView(frame: view.frame) //NMFNaverMapView
        let nmfmapView = NMFMapView(frame: view.frame)
        
        
        view.addSubview(nmfmapView)
        
        
        /*네트워크 통신*/
        requestNetworkToGetHotels { (result:Result<[HotelsResponse],Error>) in
            switch result {
            case .success(let hotelsData):
                self.foundHotels = self.parseResponseToData(from: hotelsData)
                self.foundHotels.hotels.forEach{ hotel in
                    DispatchQueue.main.async {
                        self.createMarker(lat: hotel.location.latitude, Lng: hotel.location.longitude, price: hotel.price, onto: nmfmapView)
                        
                    }
                }
                
                
            case .failure(let error):
                print(error)
            }
        }
        
        //        print("Outside all hotels = ",self.foundHotels)
        
        
        
        /*마커설정*/
        let marker = NMFMarker()
        marker.width = CGFloat(NMF_MARKER_SIZE_AUTO)
        marker.height = CGFloat(NMF_MARKER_SIZE_AUTO)
        marker.position = NMGLatLng(lat: 37.36409024322455, lng: 127.10620518731048)
        marker.iconImage = NMFOverlayImage(image: textToImage(drawText: "₩10000", atPoint: CGPoint(x: 10    , y: 5)))
        
        marker.mapView = nmfmapView
        
        let handler = {(overlay: NMFOverlay) -> Bool in //touchHandler 설정
            print("tabbed")
            return true
        }
        
        marker.touchHandler = handler
        
    }
    
    func createMarker(lat: Double, Lng: Double, price: Int, onto mapView: NMFMapView) {
        /*마커설정*/
        let marker = NMFMarker()
        marker.width = CGFloat(NMF_MARKER_SIZE_AUTO)
        marker.height = CGFloat(NMF_MARKER_SIZE_AUTO)
        marker.position = NMGLatLng(lat: lat, lng: Lng)
        marker.iconImage = NMFOverlayImage(image: textToImage(drawText: "₩"+String(price), atPoint: CGPoint(x: 10, y: 5)))
        
        marker.mapView = mapView
        
        let handler = {(overlay: NMFOverlay) -> Bool in //touchHandler 설정
            print("tabbed")
            return true
        }
        
        marker.touchHandler = handler
    }
    
    func textToImage(drawText text: String, atPoint point: CGPoint) -> UIImage {
        let image = UIImage(named: "newWhite")
        let textColor = UIColor.black
        let textFont = UIFont(name: "Helvetica Bold", size: 20)!
        
        let scale = UIScreen.main.scale
        UIGraphicsBeginImageContextWithOptions(image!.size, false, scale)
        
        let textFontAttributes = [
            NSAttributedString.Key.font: textFont,
            NSAttributedString.Key.foregroundColor: textColor,
        ] as [NSAttributedString.Key : Any]
        image!.draw(in: CGRect(origin: CGPoint.zero, size: image!.size))
        //        image!.draw(in: CGRect(origin: point, size: image!.size))
        
        let rect = CGRect(origin: point, size: image!.size)
        text.draw(in: rect, withAttributes: textFontAttributes)
        
        let newImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return newImage!
    }
    
    func parseResponseToData(from hotelResponse: [HotelsResponse]) -> Hotels {
        //DTO 파싱 역할하기. HotelResponse to Hotel
        var foundHotels = Hotels(hotels: [])
        hotelResponse.forEach { hotel in
            foundHotels.hotels.append(Hotel(id: hotel.id, imageUrl: hotel.imageUrl, location: LocationDetail(latitude: hotel.location.latitude, longitude: hotel.location.longitude, address: hotel.location.address), name: hotel.name, likeCount: hotel.likeCount, price: hotel.price, option: hotel.option, additionalOption: hotel.additionalOption))
        }
        return foundHotels
    }
    
    func requestNetworkToGetHotels(completion: @escaping (Result<([HotelsResponse]),Error>) -> Void ) {
        
        networkManager.getAllHotels{ (result:Result<[HotelsResponse],Error>) in
            switch result {
            case .success(let hotels):
                completion(.success(hotels))
            case .failure(let error):
                completion(.failure(error))
            }
        }
    }
}
