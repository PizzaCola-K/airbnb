//
//  AppDelegate.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/18/21.
//

import UIKit
import RealmSwift

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    let locationIDs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
    let locationNames = ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"]
    let locationImageNames = ["CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel","CodeSquadHotel"]
    
    
    func applicationDidFinishLaunching(_ application: UIApplication) {
        
        
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }

        for idx in 0..<locationIDs.count {
            let locationDB = LocationDB(id: locationIDs[idx], name: locationNames[idx], imageName: locationImageNames[idx])

            try! realm.write {
                realm.add(locationDB)
            }
        }

        print(Realm.Configuration.defaultConfiguration.fileURL!)
    }
    
}
