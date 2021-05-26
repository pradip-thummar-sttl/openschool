//
//  RCTCalendarModule.m
//  
//
//  Created by iMac on 20/05/21.
//

#import "RCTCalendarModule.h"
#import <React/RCTLog.h>
#import <Quickblox/Quickblox.h>
//#import "OpenSchool-Bridging-Header.h"
@implementation RCTCalendarModule
RCT_EXPORT_MODULE(LoginModuleIos)
//RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
//{
// RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
//}

RCT_EXPORT_METHOD(signUpWithFullName:(NSString *)fullName
                  roomName:(NSString *)roomName successCallback:(RCTResponseSenderBlock)successCallback errorCallback:(RCTResponseSenderBlock)errorCallback) {
    
//    NSParameterAssert(!self.currentUser);
    
    QBUUser *newUser = [QBUUser user];

    newUser.login = fullName;
    newUser.fullName = fullName;
    newUser.tags = @[roomName].mutableCopy;
    newUser.password = @"QuickBlox";
    
//    [self setLoginStatus:@"Signg up ..."];
    
    [QBRequest signUp:newUser
         successBlock:^(QBResponse * _Nonnull response, QBUUser * _Nullable user)
     {
      dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        successCallback(@[@(user.ID)]);
      });
         
     } errorBlock:^(QBResponse * _Nonnull response) {
       
       if (response.status == QBResponseStatusCodeValidationFailed) {
         [QBRequest logInWithUserLogin:newUser.login
                             password:newUser.password
                         successBlock:^(QBResponse * _Nonnull response, QBUUser * _Nullable user)
         {
            dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
              successCallback(@[@(user.ID)]);
            });
             
         } errorBlock:^(QBResponse * _Nonnull response) {
             dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
               errorCallback(@[@(response.status)]);
             });
            
         }];
       }else{
         
       }
      
       
//         [self handleError:response.error.error domain:ErrorDomainSignUp];
     }];
}

@end
