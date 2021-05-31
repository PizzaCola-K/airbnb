//
//  FoundHotelsByListViewDelegate.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/31/21.
//


import UIKit
class FoundHotelsByListViewDelegate: NSObject, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, referenceSizeForHeaderInSection section: Int) -> CGSize {
        CGSize(width: collectionView.frame.width, height: collectionView.frame.height * 0.1)
    }
    
    
    
}
