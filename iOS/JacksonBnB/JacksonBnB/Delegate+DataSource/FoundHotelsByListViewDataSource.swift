//
//  FoundHotelsByListViewDataSource.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/31/21.
//


import UIKit

class FoundHotelsByListViewDataSource: NSObject, UICollectionViewDataSource {
    
    var foundHotels = Hotels(hotels: [])    
    
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
    
    
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1
    }
    
    func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
        let headerView = collectionView.dequeueReusableSupplementaryView(ofKind: kind, withReuseIdentifier: HotelSectionView.reuseIdentifier, for: indexPath) as! HotelSectionView
        headerView.totalHotelsLabel.text = "총 \(self.foundHotels.hotels.count)의 숙소"
        return headerView
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        self.foundHotels.hotels.count
    }
}
