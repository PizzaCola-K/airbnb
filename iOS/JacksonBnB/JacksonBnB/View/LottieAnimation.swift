//
//  LoadView.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/19/21.
//

import Lottie
import UIKit

class LottieAnimation {
    
    
    let animationView = AnimationView(name: "airbnb-logo")
    
    init(with view: UIView) {
        animationView.frame = CGRect(x: 0, y: 0, width: 400, height: 400)
//        animationView.center = view.center
        animationView.contentMode = .scaleAspectFill
    }
    
}
