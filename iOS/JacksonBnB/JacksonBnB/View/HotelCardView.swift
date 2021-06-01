//
//  HotelCardView.swift
//  JacksonBnB
//
//  Created by jinseo park on 6/1/21.
//

import UIKit

class HotelCardView: UIView {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        customInit()
    }
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        customInit()
    }
    
    func customInit() {
        if let view = UINib(nibName: "HotelCardView", bundle: nil).instantiate(withOwner: self, options: nil).first as? UIView {
            view.frame = self.bounds
            view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
            addSubview(view)
        }
    }
}
