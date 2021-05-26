//
//  HotelCellCollectionViewCell.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/20/21.
//

import UIKit

class LocationCell: UICollectionViewCell {

    @IBOutlet weak var locationCellImageView: UIImageView!
    @IBOutlet weak var locationNameLabel: UILabel!
    
    static let reuseIdentifier = String(describing: LocationCell.self)
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
        locationCellImageView.image = UIImage(named: "CodeSquadHotel")
        locationNameLabel.text = "서울시"
    }
    
}
