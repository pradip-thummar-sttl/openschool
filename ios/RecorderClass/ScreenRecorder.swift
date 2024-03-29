//
//  ScreenRecorder.swift
//  Wyler
//
//  Created by Cesar Vargas on 10.04.20.
//  Copyright © 2020 Cesar Vargas. All rights reserved.
//

import Foundation
import ReplayKit
import Photos

public enum WylerError: Error {
  case photoLibraryAccessNotGranted
}

@objc final public class ScreenRecorder : NSObject {
  private var videoOutputURL: URL?
  private var videoWriter: AVAssetWriter?
  private var videoWriterInput: AVAssetWriterInput?
  private var micAudioWriterInput: AVAssetWriterInput?
  private var appAudioWriterInput: AVAssetWriterInput?
  private var saveToCameraRoll = false
  let recorder = RPScreenRecorder.shared()
  
  @objc public static let shareInstance = ScreenRecorder()

  public override init() {
    recorder.isMicrophoneEnabled = true
  }

  /**
   Starts recording the content of the application screen. It works together with stopRecording

  - Parameter outputURL: The output where the video will be saved. If nil, it saves it in the documents directory.
  - Parameter size: The size of the video. If nil, it will use the app screen size.
  - Parameter saveToCameraRoll: Whether to save it to camera roll. False by default.
  - Parameter errorHandler: Called when an error is found
  */
  
   @objc public func startRecording(
                             errorHandler: @escaping (Error) -> Void) {
    createVideoWriter(in: nil, error: errorHandler)
    addVideoWriterInput(size: nil)
    self.micAudioWriterInput = createAndAddAudioInput()
    self.appAudioWriterInput = createAndAddAudioInput()
    startCapture(error: errorHandler)
  }

  private func checkPhotoLibraryAuthorizationStatus() {
    let status = PHPhotoLibrary.authorizationStatus()
    if status == .notDetermined {
      PHPhotoLibrary.requestAuthorization({ _ in })
    }
  }

  private func createVideoWriter(in outputURL: URL? = nil, error: (Error) -> Void) {
    let newVideoOutputURL: URL

    if let passedVideoOutput = outputURL {
      self.videoOutputURL = passedVideoOutput
      newVideoOutputURL = passedVideoOutput
    } else {
      let documentsPath = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0] as NSString
      newVideoOutputURL = URL(fileURLWithPath: documentsPath.appendingPathComponent("recordedNewVideo.mp4"))
//      newVideoOutputURL = URL(string: documentsPath.appendingPathComponent("recordedNewVideo.mp4"))!
      self.videoOutputURL = newVideoOutputURL
    }

    do {
      try FileManager.default.removeItem(at: newVideoOutputURL)
    } catch {}

    do {
      try videoWriter = AVAssetWriter(outputURL: newVideoOutputURL, fileType: AVFileType.mp4)
    } catch let writerError as NSError {
      error(writerError)
      videoWriter = nil
      return
    }
  }

  private func addVideoWriterInput(size: CGSize?) {
    let passingSize: CGSize = size ?? UIScreen.main.bounds.size

    let videoSettings: [String: Any] = [AVVideoCodecKey: AVVideoCodecType.h264,
                                        AVVideoWidthKey: passingSize.width,
                                        AVVideoHeightKey: passingSize.height]

    let newVideoWriterInput = AVAssetWriterInput(mediaType: AVMediaType.video, outputSettings: videoSettings)

    self.videoWriterInput = newVideoWriterInput
    newVideoWriterInput.expectsMediaDataInRealTime = true
    videoWriter?.add(newVideoWriterInput)
  }
  
  private func createAndAddAudioInput() -> AVAssetWriterInput {
    let settings = [
        AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
        AVSampleRateKey: 12000,
        AVNumberOfChannelsKey: 1,
        AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue
    ]

    let audioInput = AVAssetWriterInput(mediaType: .audio, outputSettings: settings)

    audioInput.expectsMediaDataInRealTime = true
    videoWriter?.add(audioInput)
    
    return audioInput
  }

  private func startCapture(error: @escaping (Error) -> Void) {
//    dispatch_sync(dispatch_get_main_queue(), ^ {
//        // your block code
//    }
    
    DispatchQueue.main.async {
      self.recorder.startCapture { sampleBuffer, sampleType, passedError in
        if let passedError = passedError {
          print("passedError",passedError)
          error(passedError)
          return
        }
        switch sampleType {
        case .video:
          self.handleSampleBuffer(sampleBuffer: sampleBuffer)
        case .audioApp:
          self.add(sample: sampleBuffer, to: self.appAudioWriterInput)
        case .audioMic:
          self.add(sample: sampleBuffer, to: self.micAudioWriterInput)
        default:
          break
        }
      } completionHandler: { error in
        print("Error in start capture")
      }

//      self.recorder.startCapture(handler: { (sampleBuffer, sampleType, passedError) in
//        if let passedError = passedError {
//          print("passedError",passedError)
//          error(passedError)
//          return
//        }
//
//        switch sampleType {
//        case .video:
//          self.handleSampleBuffer(sampleBuffer: sampleBuffer)
//        case .audioApp:
//          self.add(sample: sampleBuffer, to: self.appAudioWriterInput)
//        case .audioMic:
//          self.add(sample: sampleBuffer, to: self.micAudioWriterInput)
//        default:
//          break
//        }
//      })
    }
    
    
  }

  private func handleSampleBuffer(sampleBuffer: CMSampleBuffer) {
    if self.videoWriter?.status == AVAssetWriter.Status.unknown {
      self.videoWriter?.startWriting()
      self.videoWriter?.startSession(atSourceTime: CMSampleBufferGetPresentationTimeStamp(sampleBuffer))
    } else if self.videoWriter?.status == AVAssetWriter.Status.writing &&
      self.videoWriterInput?.isReadyForMoreMediaData == true {
      self.videoWriterInput?.append(sampleBuffer)
    }
  }
  
  private func add(sample: CMSampleBuffer, to writerInput: AVAssetWriterInput?) {
    if writerInput?.isReadyForMoreMediaData ?? false {
      writerInput?.append(sample)
    }
  }

  /**
   Stops recording the content of the application screen, after calling startRecording

  - Parameter errorHandler: Called when an error is found
  */
  @objc public func stoprecording(errorHandler: @escaping (Error?,URL) -> Void) {
    RPScreenRecorder.shared().stopCapture( handler: { error in
      if let error = error {
        errorHandler(error,URL(fileURLWithPath: ""))
      }
    })
//    guard let videoOutputURL = self.videoOutputURL else {
//      return
//    }
//    print("videoOutputURL======>",videoOutputURL)
   
    print("status",self.videoWriter!.status)
    if self.videoWriter?.status == AVAssetWriter.Status.unknown {
//        self.videoWriter?.finishWriting {
          self.saveVideoToCameraRollAfterAuthorized(errorHandler: errorHandler)
//        }
    }else{
        

    self.videoWriterInput?.markAsFinished()
    self.micAudioWriterInput?.markAsFinished()
    self.appAudioWriterInput?.markAsFinished()
    self.videoWriter?.finishWriting {
//      self.saveVideoToCameraRollAfterAuthorized(errorHandler: errorHandler)
      self.saveVideoToCameraRollAfterAuthorized { error, url in
        errorHandler(error,url)
      }
    }
    }
  }

  private func saveVideoToCameraRollAfterAuthorized(errorHandler: @escaping (Error?,URL) -> Void) {
//    if PHPhotoLibrary.authorizationStatus() == .authorized {
//        self.saveVideoToCameraRoll(errorHandler: errorHandler)
//    } else {
        PHPhotoLibrary.requestAuthorization({ (status) in
            if status == .authorized {
              self.saveVideoToCameraRoll { error, url in
                errorHandler(error,url)
              }
             
            } else {
              errorHandler(WylerError.photoLibraryAccessNotGranted,URL(fileURLWithPath: ""))
          }
        })
//    }
  }

  private func saveVideoToCameraRoll(errorHandler: @escaping (Error?, URL) -> Void) {
    guard let videoOutputURL = self.videoOutputURL else {
      return
    }

    PHPhotoLibrary.shared().performChanges({
      PHAssetChangeRequest.creationRequestForAssetFromVideo(atFileURL: videoOutputURL)
    }, completionHandler: { saved, error in
      if saved{
        print("Saved successfully")
      }
      if let error = error {
        errorHandler(error,videoOutputURL)
      }else{
        errorHandler(error,videoOutputURL)
      }
    })
    
  }
}
