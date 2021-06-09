//
//  CallModule.m
//  OpenSchool
//
//  Created by iMac on 02/06/21.
//

#import "CallModule.h"
#import "CallViewController.h"
#import <Quickblox/Quickblox.h>
#import "AppDelegate.h"
#import <UIKit/UIKit.h>
@implementation CallModule
RCT_EXPORT_MODULE(CallModuleIos)
RCT_EXPORT_METHOD(createCallDialogid:(NSString *)dialogID currentUserID:(NSString *)currentUserID currentName:(NSString*)currentName occupants:(NSArray *)occupants userNames:(NSArray*)userNames names:(NSArray*)names isTeacher:(BOOL)isTeacher teacherQBUserID:(NSString*)teacherQBUserID successCallback:(RCTResponseSenderBlock)successCallback){

  NSMutableArray *selectedUsers = [[NSMutableArray alloc]init];
  NSMutableArray *selectedOccupants = [[NSMutableArray alloc]init];
        
        for (int i = 0; i < occupants.count; i++) {
            QBUUser *qbUser = [QBUUser user];
          NSMutableArray *userTags = [[NSMutableArray alloc]init];
          [userTags addObject:occupants[i]];
          qbUser.ID=[occupants[i] integerValue];
          qbUser.fullName = names[i];
          qbUser.email = userNames[i];
          qbUser.login = userNames[i];
          qbUser.tags = userTags;

//            qbUser.setId(Integer.parseInt(occupants.getString(i)));
//            qbUser.setFullName(names.getString(i));
//            qbUser.setEmail(userNames.getString(i));
//            qbUser.setLogin(userNames.getString(i));
//            qbUser.setTags(userTags);

            [selectedUsers addObject:qbUser];
          [selectedOccupants addObject:occupants[i]];
//            selectedOccupants.add(Integer.parseInt(occupants.getString(i)));
        }
//  QBRTCConferenceType *conferenceType = QBRTCConferenceTypeVideo;
  UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Call" bundle:nil];
  CallViewController *VC = [storyboard instantiateViewControllerWithIdentifier:@"CallViewController"];
//  [[[[UIApplication sharedApplication]keyWindow]rootViewController].navigationController presentViewController:VC animated:true completion:nil];
  
  VC.dialogID=dialogID;
  VC.currentName=currentName;
  VC.currentUserID=currentUserID;
  VC.occupants=occupants;
  VC.selectedUsers=selectedUsers;
  VC.asListener=false;
  VC.isTeacher=isTeacher;
  VC.teacherQBUserID=teacherQBUserID;
  VC.conferenceType = QBRTCConferenceTypeVideo;
  VC.modalPresentationStyle = UIModalPresentationFullScreen;
  dispatch_async(dispatch_get_main_queue(), ^{
    [[[[UIApplication sharedApplication]keyWindow]rootViewController]  presentViewController:VC animated:NO completion:nil];
        });
//  [[[[UIApplication sharedApplication]keyWindow]rootViewController] presentViewController:VC animated:NO completion:nil];
//  [((AppDelegate *)[[UIApplication sharedApplication] delegate]) showLoginView];
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    successCallback(@[@"hello"]);
  });
 


}
@end
