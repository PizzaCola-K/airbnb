//
//  LocationDB.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/21/21.
//

import Foundation
import RealmSwift

class LocationDB: Object {
    
    @objc dynamic var id: Int = 0
    @objc dynamic var name: String = ""
    @objc dynamic var imageName: String = ""
    
    override class func primaryKey() -> String? {
        return "id"
    }
    
    convenience init(id: Int, name: String, imageName: String) {
        self.init()
        self.id = id
        self.name = name
        self.imageName = imageName
    }
}


