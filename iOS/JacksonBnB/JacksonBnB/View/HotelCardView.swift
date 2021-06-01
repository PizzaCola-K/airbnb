//
//  HotelCardView.swift
//  JacksonBnB
//
//  Created by jinseo park on 6/1/21.
//

import UIKit

class HotelCardView: UIView {
    
    @IBOutlet weak var thumbNailImageView: UIImageView!
    @IBOutlet weak var likeCountLabel: UILabel!
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var priceLabel: UILabel!

    override init(frame: CGRect) {
        super.init(frame: frame)
        customInit()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        customInit()
    }

    func customInit() {
        let bundle = Bundle.init(for: HotelCardView.self)

        if let viewToAdd = bundle.loadNibNamed("HotelCardView", owner: self, options: nil), let contentView = viewToAdd.first as? UIView {
            
            addSubview(contentView)
            
            thumbNailImageView.image = UIImage(named: "CodeSquadHotel")
//            contentView.frame = self.bounds
//            contentView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
            
        }
    }
}
