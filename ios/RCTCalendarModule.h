//
//  RCT.h
//  OpenSchool
//
//  Created by iMac on 07/06/21.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
@interface RCTCalendarModule : NSObject <RCTBridgeModule>
+ (void)signUpWithFullName:(NSString *)fullName
                  roomName:(NSString *)roomName successCallback:(RCTResponseSenderBlock)successCallback errorCallback:(RCTResponseSenderBlock)errorCallback;

@end
