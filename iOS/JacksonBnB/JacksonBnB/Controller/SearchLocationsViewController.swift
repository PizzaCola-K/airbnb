//
//  SearchHotelsViewController.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/20/21.
//

import UIKit

class SearchLocationsViewController: UIViewController {
    
    var searchLocationDataSource: SearchLocationDataSource_Delegate?
    @IBOutlet weak var locationsCollectionView: UICollectionView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        searchLocationDataSource = SearchLocationDataSource_Delegate()
        self.locationsCollectionView.dataSource = searchLocationDataSource
        self.locationsCollectionView.delegate = searchLocationDataSource
        title = "숙소 찾기"
                
        locationsCollectionView.collectionViewLayout = setCollectionViewLayout()
        setLocationNib()
        setNotificationCenter()
        setSearchBarContoller()
        
    }
    
    func setLocationNib() {
        let locationNib = UINib(nibName: LocationCell.reuseIdentifier, bundle: nil)
        
        locationsCollectionView.register(locationNib, forCellWithReuseIdentifier: LocationCell.reuseIdentifier)
    }
    
    func setSearchBarContoller() {
        self.navigationItem.searchController = searchLocationDataSource?.searchLocationsController
        self.navigationItem.hidesSearchBarWhenScrolling = false
    }
    
    func setCollectionViewLayout() -> UICollectionViewLayout { //콜렉션 뷰 레이아웃 설정
        let size = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1), heightDimension: .fractionalHeight(1))
        let item = NSCollectionLayoutItem(layoutSize: size)
        let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1), heightDimension: .fractionalHeight(0.1))
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitem: item, count: 1)
        let section = NSCollectionLayoutSection(group: group)
        let layout = UICollectionViewCompositionalLayout(section: section)
        return layout
    }
    
    func setNotificationCenter() {
        NotificationCenter.default.addObserver(self, selector: #selector (SearchLocationsViewController.changeCollectionView), name: Notification.Name("cellsChanged"), object: nil)
        
        
        NotificationCenter.default.addObserver(self, selector: #selector (SearchLocationsViewController.tabCollecionViewCell), name: Notification.Name("cellsTabbed"), object: nil)
        
    }
    
    @objc func changeCollectionView() {
        DispatchQueue.main.async {
            self.locationsCollectionView.reloadData()
        }
    }
    
    //셀을 클릭시 FoundHotelsByListViewController로 화면을 이동하면서 동시에 클릭한 Cell의 "위치 이름"을 전달합니다.
    @objc func tabCollecionViewCell(_ notification : NSNotification) {
        guard let vc = self.storyboard?.instantiateViewController(identifier: "FoundHotelsByListViewController") as? FoundHotelsByListViewController else {return}
        guard let locationName = notification.object as? String else {return}
        vc.locationName = locationName
        self.navigationController?.pushViewController(vc, animated: true)
        
    }
    
}
