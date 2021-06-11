//
//  CreateDialog.m
//  OpenSchool
//
//  Created by iMac on 01/06/21.
//

#import "CreateDialog.h"
#import <Quickblox/Quickblox.h>
@implementation CreateDialog

RCT_EXPORT_MODULE(Dialog);
RCT_EXPORT_METHOD(qbCreateDialogtags:(NSArray *)tags userNames:(NSArray*)userNames names:(NSArray*)names  successCallback:(RCTResponseSenderBlock)successCallback errorCallback:(RCTResponseSenderBlock)errorCallback){
  
  NSMutableArray *selectedUsers = [[NSMutableArray alloc]init];
  for (int i = 0; i < tags.count; i++) {
    QBUUser *qbUser = [QBUUser user];

     qbUser.login = userNames[i];
     qbUser.email = userNames[i];
     qbUser.fullName = names[i];
     qbUser.tags = @[tags[i]].mutableCopy;
//     qbUser.password = password
    
    
//    QBUUser *qbUser = [[QBUUser alloc]init]  ;
//      StringifyArrayList<String> userTags = new StringifyArrayList<>();
//      userTags.add(tags[i]);
//
//      qbUser.setFullName(names.getString(i));
//      qbUser.setEmail(userNames.getString(i));
//      qbUser.setLogin(userNames.getString(i));
//      qbUser.setTags(userTags);

      [selectedUsers addObject:qbUser];
  }
   NSArray *userIDs = [selectedUsers valueForKeyPath:@"ID"];
   NSArray *userName = [selectedUsers valueForKey:@"fullName"];
   QBChatDialog *chatDialog = [[QBChatDialog alloc] initWithDialogID:nil type:QBChatDialogTypeGroup];
   chatDialog.occupantIDs = userIDs;
   chatDialog.name = [NSString stringWithFormat:@"%@, %@", userNames[0], [userName componentsJoinedByString:@", "]];
  [QBRequest createDialog:chatDialog successBlock:^(QBResponse * _Nonnull response, QBChatDialog * _Nullable createdDialog) {
      
//      [SVProgressHUD dismiss];
//      [weakSelf.delegate usersViewController:weakSelf didCreateChatDialog:createdDialog];
//      [weakSelf.navigationController popViewControllerAnimated:YES];
    
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
      successCallback(@[createdDialog.ID]);
    });
      
  } errorBlock:^(QBResponse * _Nonnull response) {
      
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
      errorCallback(@[response.error]);
    });
//      [SVProgressHUD showErrorWithStatus:[NSString stringWithFormat:@"%@", response.error.reasons]];
  }];
}
@end
