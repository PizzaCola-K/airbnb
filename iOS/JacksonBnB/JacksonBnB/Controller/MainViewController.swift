//
//  ViewController.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/18/21.
//

import UIKit
import Lottie
//import Hero

class MainViewController: UIViewController {

    @IBOutlet weak var mainImageView: UIImageView!
    @IBOutlet weak var searchBtnTouched: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        let lottieAnimation = LottieAnimation(with: self.view)
        mainImageView.addSubview(lottieAnimation.animationView)
        lottieAnimation.animationView.play()
    }
    
    @IBAction func searchHotels(_ sender: Any) {
        let vc = self.storyboard?.instantiateViewController(identifier: "SearchHotelsViewController")
//        let vc = UIStoryboard.create(identifier: UIViewController.self, name: "SearchHotelsViewController")
        self.navigationController?.pushViewController(vc!, animated: true)
    }
    
}

extension UIStoryboard {
    static func create<T: UIViewController>(identifier: T.Type, name storyboardName: String) -> T {
        let identifier = String(describing: T.self)
        guard let viewController = UIStoryboard(name: storyboardName, bundle: nil).instantiateViewController(withIdentifier: identifier) as? T else {
            fatalError()
        }

        return viewController
    }
}

