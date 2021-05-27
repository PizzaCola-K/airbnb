//
//  DataBaseManager.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/21/21.
//

import Foundation
import RealmSwift

protocol DBOperations {
    func getAllLocations() -> Locations //모든주소에 대한 DB데이터를 가져옵니다.
    func getFilteredLocations(by query: String) -> Locations //필터된 주소에 대한 DB데이터를 가져옵니다.
}
class DataBaseManager: DBOperations {
    
    let realm = try! Realm()
    
    func getAllLocations() -> Locations {
        var allLocations = Locations(locations: [])
        let locationsDB = realm.objects(LocationDB.self)
        
        locationsDB.forEach { locationDB in
            let location = Location(id: locationDB.id, name: locationDB.name, imageName: locationDB.imageName)
            allLocations.locations.append(location)
        }
        
        return allLocations
    }
    
    func getFilteredLocations(by query: String) -> Locations {
        var filteredLocations = Locations(locations: [])
        let filteredLocationsDB = realm.objects(LocationDB.self).filter("name CONTAINS '\(query)'")
        
        filteredLocationsDB.forEach { filteredLocationDB in
            let location = Location(id: filteredLocationDB.id, name: filteredLocationDB.name, imageName: filteredLocationDB.imageName)
            filteredLocations.locations.append(location)
        }
        return filteredLocations
    }
    
    
}
