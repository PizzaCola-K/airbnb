//
//  FoundHotelsViewController.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/26/21.
//

import Foundation
import UIKit

//리스트로 보여지거나 맵(FoundHotelsByMapViewController)으로 보여져야한다.
//이 곳에서 {url}/location?=(string) 불러와서 보여주기.

class FoundHotelsByListViewController: UIViewController, UICollectionViewDataSource, UICollectionViewDelegate {
    
    @IBOutlet weak var foundHotelsColletionView: UICollectionView!
    
    var locationName: String = ""
    var foundHotels = Hotels(hotels: [])
    let networkManager = NetworkManager()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        foundHotelsColletionView.delegate = self
        foundHotelsColletionView.dataSource = self
//        foundHotelsColletionView.collectionViewLayout.invalidateLayout()
        setLocationNib()
        foundHotelsColletionView.collectionViewLayout = setCollectionViewLayout()
        
        requestNetworkToGetHotels(by: self.locationName) { (result:Result<[HotelsResponse],Error>) in
            switch result {
            case .success(let hotelsData):
                self.parseResponseToData(hotelsData)
                self.foundHotelsColletionView.reloadData()
            case .failure(let error):
                print(error)
            }
        }
        
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        return UIEdgeInsets(top: 16.0, left: 32.0, bottom: 16.0, right: 32.0)
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        self.foundHotels.hotels.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: HotelCell.reuseIdentifier, for: indexPath) as? HotelCell else {
            return .init()
        }
        
        let url = URL(string: foundHotels.hotels[indexPath.row].imageUrl)
        let imagedata = try? Data(contentsOf: url!)
        DispatchQueue.main.async {
            cell.thumbnailImageView.image = UIImage(data: imagedata!)
            cell.thumbnailImageView.clipsToBounds = true
            cell.thumbnailImageView.layer.cornerRadius = 20
            
        }
        
        cell.nameLabel.text = foundHotels.hotels[indexPath.row].name
        cell.likeCount.text = String(foundHotels.hotels[indexPath.row].likeCount)+" 명이 좋아해요."
        cell.pricePerDayLabel.text = "₩"+String(foundHotels.hotels[indexPath.row].price)+"/ 박"
        cell.totalPriceLabel.text = "총액 ₩"+String(foundHotels.hotels[indexPath.row].price * 3)
        cell.totalPriceLabel.underline()
        
        return cell
    }
    
    func setLocationNib() {
        let hotelNib = UINib(nibName: HotelCell.reuseIdentifier, bundle: nil)
        
        foundHotelsColletionView.register(hotelNib, forCellWithReuseIdentifier: HotelCell.reuseIdentifier)
    }
    
    func setCollectionViewLayout() -> UICollectionViewLayout { //콜렉션 뷰 레이아웃 설정
        let size = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1), heightDimension: .fractionalHeight(1))
        let item = NSCollectionLayoutItem(layoutSize: size)
        item.contentInsets = NSDirectionalEdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16) // Cell의 contentInsets
        let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1), heightDimension: .fractionalHeight(0.6))
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitem: item, count: 1)
        let section = NSCollectionLayoutSection(group: group)
        let layout = UICollectionViewCompositionalLayout(section: section)
        return layout
    }
    
    func parseResponseToData(_ hotelResponse: [HotelsResponse]) {
        //DTO 파싱 역할하기. HotelResponse to Hotel
        hotelResponse.forEach { hotel in
            foundHotels.hotels.append(Hotel(id: hotel.id, imageUrl: hotel.imageUrl, location: LocationDetail(latitude: hotel.location.latitude, longitude: hotel.location.longitude, address: hotel.location.address), name: hotel.name, likeCount: hotel.likeCount, price: hotel.price, option: hotel.option, additionalOption: hotel.additionalOption))
        }
    }
        
    func requestNetworkToGetHotels(by name: String, completion: @escaping (Result<([HotelsResponse]),Error>) -> Void ) {
        
        networkManager.getHotelsByLocation(by: name){ (result:Result<[HotelsResponse],Error>) in
            switch result {
            case .success(let hotels):
                completion(.success(hotels))
            case .failure(let error):
                completion(.failure(error))
            }
        }
        
    }
}

