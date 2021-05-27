//
//  SearchLocationDataSource.swift
//  JacksonBnB
//
//  Created by jinseo park on 5/25/21.
//

import UIKit
class SearchLocationDataSource_Delegate: NSObject, UICollectionViewDataSource, UISearchResultsUpdating, UICollectionViewDelegate {
    
    let searchLocationsController = UISearchController()
    let dbManager = DataBaseManager()
    var allLocations = Locations(locations: [])
    var filteredLocations = Locations(locations: [])
    
    override init() {
        super.init()
        searchLocationsController.searchResultsUpdater = self
        searchLocationsController.obscuresBackgroundDuringPresentation = false
        allLocations = dbManager.getAllLocations()
    }
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        if searchLocationsController.isActive {
            return filteredLocations.locations.count
        }else {
            return allLocations.locations.count
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: LocationCell.reuseIdentifier, for: indexPath) as? LocationCell else {
                    return .init()
                 }
        if searchLocationsController.isActive {
            cell.locationNameLabel.text = filteredLocations.locations[indexPath.row].name
            cell.locationCellImageView.image = UIImage(named: filteredLocations.locations[indexPath.row].imageName)
        }else {
            cell.locationNameLabel.text = allLocations.locations[indexPath.row].name
            cell.locationCellImageView.image = UIImage(named: allLocations.locations[indexPath.row].imageName)
        }
        return cell
    }
    
    func updateSearchResults(for searchController: UISearchController) {
        guard let text = self.searchLocationsController.searchBar.text else {
            return
        }
        filteredLocations = dbManager.getFilteredLocations(by: text)
        NotificationCenter.default.post(name: Notification.Name("cellsChanged"), object: nil)
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        
        var requiredInfo = ""
        if searchLocationsController.isActive {
            requiredInfo = allLocations.locations[indexPath.item].name
        }else {
            requiredInfo = allLocations.locations[indexPath.item].name
        }
        
        NotificationCenter.default.post(name: Notification.Name("cellsTabbed"), object: requiredInfo)
    }
}
