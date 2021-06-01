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

class FoundHotelsByListViewController: UIViewController {
    
    @IBOutlet weak var foundHotelsColletionView: UICollectionView!
    
    var locationName: String = ""
    let networkManager = NetworkManager()
    
    var foundHotelsByListViewDelegate: FoundHotelsByListViewDelegate?
    var foundHotelsByListViewDataSource: FoundHotelsByListViewDataSource?
    var parseDTO: ParseDTO?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        foundHotelsByListViewDelegate = FoundHotelsByListViewDelegate()
        foundHotelsByListViewDataSource = FoundHotelsByListViewDataSource()
        parseDTO = ParseDTO()
        foundHotelsColletionView.delegate = foundHotelsByListViewDelegate
        foundHotelsColletionView.dataSource = foundHotelsByListViewDataSource
        
        self.navigationController?.isNavigationBarHidden = false
        self.tabBarController?.tabBar.isHidden = false
        
        setHotelsNib()
        requestNetworkToGetHotels(by: self.locationName) { (result:Result<[HotelsResponse],Error>) in
            switch result {
            case .success(let hotelsData):
                guard let foundHotelsDataSource = self.foundHotelsByListViewDataSource else {return}
                guard let parsedHoels = self.parseDTO?.parseResponseToData(from: hotelsData) else {return}
                foundHotelsDataSource.foundHotels = parsedHoels
                self.foundHotelsColletionView.reloadData()
            case .failure(let error):
                print(error)
            }
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        addShowMapButton() //콜렉션 뷰가 끝나고 추가해주기.
    }
    
    func addShowMapButton() {
        let button = UIButton()
        button.translatesAutoresizingMaskIntoConstraints = false
        
        button.setImage(UIImage(named: "mapButton"), for: UIControl.State.normal)
        self.view.addSubview(button)
        
        button.centerXAnchor.constraint(equalTo: self.view.centerXAnchor).isActive = true
        
        button.topAnchor.constraint(equalTo: self.view.topAnchor, constant: 600).isActive = true
        
        button.addTarget(self, action: #selector(btnClickedToShowToMap), for: .touchUpInside)
        
    }
    
    @objc func btnClickedToShowToMap() {        
        guard let vc = self.storyboard?.instantiateViewController(identifier: "FoundHotelsByMapViewController") as? FoundHotelsByMapViewController else {return}
        self.navigationController?.pushViewController(vc, animated: true)
        
    }
    
    func setHotelsNib() { //콜렉션 뷰 헤더와 셀을 저장할 저장한다.
        let hotelNib = UINib(nibName: HotelCell.reuseIdentifier, bundle: nil)
        let hotelHeaderNib = UINib(nibName: HotelSectionView.reuseIdentifier, bundle: nil)
        
        foundHotelsColletionView.register(hotelNib, forCellWithReuseIdentifier: HotelCell.reuseIdentifier)
        foundHotelsColletionView.register(hotelHeaderNib, forSupplementaryViewOfKind: UICollectionView.elementKindSectionHeader, withReuseIdentifier: HotelSectionView.reuseIdentifier)
    }

    func requestNetworkToGetHotels(by name: String, completion: @escaping (Result<([HotelsResponse]),Error>) -> Void ) {
        
        networkManager.getHotelsByLocation(by: name){ (result:Result<[HotelsResponse],Error>) in
            switch result {
            case .success(let hotels):
                completion(.success(hotels))
            case .failure(let error):
                completion(.failure(error))
            }
        }
    }
}
