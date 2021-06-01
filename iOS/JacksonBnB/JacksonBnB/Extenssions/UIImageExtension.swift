////
////  UIImageExtension.swift
////  JacksonBnB
////
////  Created by jinseo park on 6/1/21.
////
//
//import Foundation
//import UIKit
//
//extension UIImage {
//    func textToImage(drawText text: String, atPoint point: CGPoint) -> UIImage {
//        let image = UIImage(named: "newWhite")
//        let textColor = UIColor.black
//        let textFont = UIFont(name: "Helvetica Bold", size: 20)!
//        
//        let scale = UIScreen.main.scale
//        UIGraphicsBeginImageContextWithOptions(image!.size, false, scale)
//        
//        let textFontAttributes = [
//            NSAttributedString.Key.font: textFont,
//            NSAttributedString.Key.foregroundColor: textColor,
//        ] as [NSAttributedString.Key : Any]
//        image!.draw(in: CGRect(origin: CGPoint.zero, size: image!.size))
//        //        image!.draw(in: CGRect(origin: point, size: image!.size))
//        
//        let rect = CGRect(origin: point, size: image!.size)
//        text.draw(in: rect, withAttributes: textFontAttributes)
//        
//        let newImage = UIGraphicsGetImageFromCurrentImageContext()
//        UIGraphicsEndImageContext()
//        
//        return newImage!
//    }
//}
