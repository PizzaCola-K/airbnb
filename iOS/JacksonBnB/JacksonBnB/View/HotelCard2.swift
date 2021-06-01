//
//  HotelCard2.swift
//  JacksonBnB
//
//  Created by jinseo park on 6/1/21.
//

//import Foundation
import UIKit

class HotelCardView: UIView {
    
    @IBOutlet weak var thumbnailImageView: UIImageView!
    
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
        
        
        let view = Bundle.main.loadNibNamed("HotelCard2", owner: self, options: nil)?.first as! UIView
        view.frame = self.bounds
        self.addSubview(view)
//        thumbnailImageView.image = UIImage(named: "CodeSquadHotel")
//        likeCountLabel.text = "0명이 좋아해요"
//        nameLabel.text = "잭슨네집이여요라아아아"
//        priceLabel.text = "50000원"
            
    }
    
}
