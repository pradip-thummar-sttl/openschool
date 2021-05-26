//
//  RCTCalendarModule.h
//  
//
//  Created by iMac on 20/05/21.
//

#import <React/RCTBridgeModule.h>
@interface RCTCalendarModule : NSObject <RCTBridgeModule>
+ (void)signUpWithFullName:(NSString *)fullName
                  roomName:(NSString *)roomName successCallback:(RCTResponseSenderBlock)successCallback errorCallback:(RCTResponseSenderBlock)errorCallback;

@end
