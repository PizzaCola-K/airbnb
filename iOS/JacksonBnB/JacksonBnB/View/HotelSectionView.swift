//
//  HotelSectionView.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/28/21.
//

import UIKit

class HotelSectionView: UICollectionReusableView {

    @IBOutlet weak var totalHotelsLabel: UILabel!
    
    static let reuseIdentifier = String(describing: HotelSectionView.self)
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        
    }
    
}
