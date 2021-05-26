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
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        1
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        return UICollectionViewCell()
    }
    
    
}
