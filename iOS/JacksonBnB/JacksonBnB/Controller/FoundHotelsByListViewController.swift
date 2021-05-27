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

class FoundHotelsByListViewController: UIViewController, UICollectionViewDataSource {
    
    var locationName: String = ""
//    let networkManager = NetworkManager()
//    networkManager.getHotelsByLocation(by: requiredInfo){ (result:Result<[HotelsResponse],Error>) in
//        switch result {
//        case .success(let txt):
//            print("result",txt)
//        case .failure(let error):
//            print(error)
//        }
//
//    }
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }
    /*받은 정보를 보여줍니다.*/
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        print("locationName =",locationName)
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        1
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        return UICollectionViewCell()
    }
    
    
}
