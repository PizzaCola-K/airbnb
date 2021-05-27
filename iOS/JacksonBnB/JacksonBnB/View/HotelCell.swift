//
//  HotelCell.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/26/21.
//

import UIKit

class HotelCell: UICollectionViewCell {

    @IBOutlet weak var thumbnailImageView: UIImageView!
    
    @IBOutlet weak var ratingLabel: UILabel!
    
    @IBOutlet weak var nameLabel: UILabel!
    
    @IBOutlet weak var pricePerDayLabel: UILabel!
    
    @IBOutlet weak var totalPriceLabel: UILabel!
    
    static let reuseIdentifier = String(describing: HotelCell.self)
    
    override func awakeFromNib() {
        super.awakeFromNib()

    }

}
