//
//  ScreenRecordCoordinator.swift
//  BugReporterTest
//
//  Created by Giridhar on 21/06/17.
//  Copyright © 2017 Giridhar. All rights reserved.
//

import Foundation
//import "OpenSchool-Bridging-Header.h"


@objc class ScreenRecordCoordinator: NSObject
{
//    let viewOverlay = WindowUtil()
    let screenRecorder = ScreenRecorder()
    var recordCompleted:((Error?) ->Void)?
    
    static let recordCordinator = ScreenRecordCoordinator()
    override init()
    {
        super.init()
        
//        viewOverlay.onStopClick = {
//            self.stopRecording()
//        }
        
        
    }
    
   @objc func startRecording(withFileName fileName: String, recordingHandler: @escaping (Error?) -> Void,onCompletion: @escaping (Error?)->Void)
    {
//        self.viewOverlay.show()
        screenRecorder.startRecording(withFileName: fileName) { (error) in
            recordingHandler(error)
            self.recordCompleted = onCompletion
        }
    }
    
    func stopRecording()
    {
        screenRecorder.stopRecording { (error) in
//            self.viewOverlay.hide()
            self.recordCompleted?(error)
        }
    }
    
    class func listAllReplays() -> Array<URL>
    {
        return ReplayFileUtil.fetchAllReplays()
    }
    
    
}
