//
//  FoundHotelsByMapViewController.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/31/21.
//

import Foundation
import UIKit
import NMapsMap

/*모든 호텔의 정보를 받아서 맵에다가 보여줍니다.*/
class FoundHotelsByMapViewController: UIViewController {
    
    var foundHotels = Hotels(hotels: [])
    let networkManager = NetworkManager()
    var parseDTO: ParseDTO?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let nmfmapView = NMFMapView(frame: view.frame)
        view.addSubview(nmfmapView)
        
        /*초기 카메라 위치*/
        let cameraUpdate = NMFCameraUpdate(scrollTo: NMGLatLng(lat: 37.49082129914656, lng: 127.03341667375932))
        nmfmapView.moveCamera(cameraUpdate)
        
        parseDTO = ParseDTO()
        
        self.navigationController?.isNavigationBarHidden = true
        self.tabBarController?.tabBar.isHidden = true
        
        addListViewButton()
        
        /*네트워크 통신*/
        requestNetworkToGetHotels { (result:Result<[HotelsResponse],Error>) in
            switch result {
            case .success(let hotelsData):

                guard let parsedHoels = self.parseDTO?.parseResponseToData(from: hotelsData) else {return}
                self.foundHotels = parsedHoels
                self.foundHotels.hotels.forEach{ hotel in
                    DispatchQueue.main.async {
                        self.createMarker(lat: hotel.location.latitude, Lng: hotel.location.longitude, price: hotel.price, onto: nmfmapView)
                    }
                }
            case .failure(let error):
                print(error)
            }
        }
    }
    
    func addListViewButton() {
        let button = UIButton()
        button.translatesAutoresizingMaskIntoConstraints = false
        
        button.setImage(UIImage(named: "listbutton"), for: UIControl.State.normal)
        self.view.addSubview(button)
                
        button.leadingAnchor.constraint(equalTo: self.view.leadingAnchor, constant: 16).isActive = true
        button.topAnchor.constraint(equalTo: self.view.topAnchor, constant: 16).isActive = true
        
        button.addTarget(self, action: #selector(btnClickedToShowToList), for: .touchUpInside)
    }
    
    @objc func btnClickedToShowToList() {
        self.navigationController?.popViewController(animated: true)
    }
    
    func createMarker(lat: Double, Lng: Double, price: Int, onto mapView: NMFMapView) {
        /*마커설정*/
        let marker = NMFMarker()
        marker.width = CGFloat(NMF_MARKER_SIZE_AUTO)
        marker.height = CGFloat(NMF_MARKER_SIZE_AUTO)
        marker.position = NMGLatLng(lat: lat, lng: Lng)
        marker.iconImage = NMFOverlayImage(image: textToImage(drawText: "₩"+String(price), atPoint: CGPoint(x: 10, y: 5)))
        
        marker.mapView = mapView
        
        /*터치하면 하단에 호텔카드가 생긴다.*/
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
        
        let rect = CGRect(origin: point, size: image!.size)
        text.draw(in: rect, withAttributes: textFontAttributes)
        
        let newImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return newImage!
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
