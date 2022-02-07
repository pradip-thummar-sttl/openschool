//
//  ChatVC.m
//  OpenSchool
//
//  Created by PRADIP on 25/01/22.
//

#import "ChatVC.h"
#import <PubNub/PubNub.h>
#import "MessageCell.h"

static NSString * const kEntryEarth = @"Earth";
static NSString * const kUpdateEntryMessage = @"entryMessage";
static NSString * const kUpdateEntryType = @"entryType";
static NSString * const kChannelGuide = @"the_guide";

@interface ChatVC ()
@property (nonatomic, strong) PubNub *pubnub;
@property (strong, nonatomic) NSMutableArray *chatHistory;
@end

@implementation ChatVC

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  PNConfiguration *pnconfig = [PNConfiguration configurationWithPublishKey:@"pub-c-bd967178-53ea-4b05-954a-2666bb3b6337"
                                                              subscribeKey:@"sub-c-3d3bcd76-c8e7-11eb-bdc5-4e51a9db8267"];
  pnconfig.uuid = @"myUniqueUUID";
  self.pubnub = [PubNub clientWithConfiguration:pnconfig];
  
  [self.pubnub addListener:self];
  [self.pubnub subscribeToChannels: @[self.channels, self.dialogId] withPresence:YES];
  
  self.messageTxtView.layer.cornerRadius = 10;
//  [self.messageTxtView setBackgroundColor:[UIColor grayColor]];
  
  _chatHistory = [[NSMutableArray alloc]init];
  [self.messageTableView setDelegate:self];
  [self.messageTableView setDataSource:self];
  
  if (_isPupil) {
    [_messageTxtView setHidden:false];
    [_sendButton setHidden:false];
    [_onlyTeacherLabel setHidden:true];
  }else{
    if ([_openChat isEqualToString:@"YES"]) {
      [_messageTxtView setHidden:false];
      [_sendButton setHidden:false];
      [_onlyTeacherLabel setHidden:true];
    }else{
      [_messageTxtView setHidden:true];
      [_sendButton setHidden:true];
      [_onlyTeacherLabel setHidden:false];
    }
  }
  
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info {

    NSURL *chosenImageUrl = info[UIImagePickerControllerImageURL];
  
//    self.imageView.image = chosenImage;

    [picker dismissViewControllerAnimated:YES completion:nil];
  PNSendFileRequest *request = [PNSendFileRequest requestWithChannel:self.dialogId
                                                             fileURL:chosenImageUrl];

  [self.pubnub sendFileWithRequest:request completion:^(PNSendFileStatus *status) {
      if (!status.isError) {
          /**
           * File upload successfully completed.
           * Uploaded file information is available here:
           *   status.data.fileIdentifier is the unique file identifier
           *   status.data.fileName is the name used to store the file
           *https://ps.pndsn.com
           */
        
        NSURL *url = [self.pubnub downloadURLForFileWithName:status.data.fileName
                                                       identifier:status.data.fileIdentifier
                                                        inChannel:self.dialogId];
        
        NSString *urlstring = [NSString stringWithFormat:@"%@",url];
        NSArray *items = [urlstring componentsSeparatedByString:@"?"];
        NSString *originurl = [NSString stringWithFormat:@"https://ps.pndsn.com%@",items[0]];
        
        NSString *str = [NSString stringWithFormat:@"%@###%@###%@",originurl, self.currentUserName,self.currentUserId];
        [self.pubnub publish: str toChannel:self.dialogId
              withCompletion:^(PNPublishStatus *status) {
          NSLog(@"print status %@", status);
      //        NSString *text = kEntryEarth;
      //        [self displayMessage:text asType:@"[PUBLISH: sent]"];
      //    [self dismissViewControllerAnimated:YES completion:nil];
          self.messageTxtView.text = @"";
        }];
        
//        PNPublishFileMessageRequest *request = [PNPublishFileMessageRequest requestWithChannel:self.dialogId
//                                                                                fileIdentifier:status.data.fileIdentifier
//                                                                                          name:status.data.fileName];
//
//        [self.pubnub publishFileMessageWithRequest:request completion:^(PNPublishStatus *status) {
//            if (!status.isError) {
//                // File message successfully published.
//
//            } else {
//                // Handle file message publish error. Check 'category' property to find out possible
//                // issue because of which request did fail.
//                //
//                // Request can be resent using: [status retry];
//            }
//        }];
        
        
        NSLog(@"true ghfgh");
        
      } else {
          /**
           * Handle send file error. Check the 'category' property for reasons
           * why the request may have failed.
           *
           * Check 'status.data.fileUploaded' to determine whether to resend the
           * request or if only file message publish should be called.
           */
        
        NSLog(@"else ghfgh");
      }
  }];
}

- (IBAction)onAttachmentButtonpress:(id)sender {
  UIImagePickerController *picker = [[UIImagePickerController alloc] init];
      picker.delegate = self;
      picker.allowsEditing = YES;
      picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;

      [self presentViewController:picker animated:YES completion:nil];
}

- (IBAction)onBackPress:(id)sender {
  [self dismissViewControllerAnimated:YES completion:nil];
}

- (IBAction)onSendButtonPressed:(id)sender {
  NSString *str = [NSString stringWithFormat:@"%@###%@###%@",_messageTxtView.text, self.currentUserName,self.currentUserId];
  [self.pubnub publish: str toChannel:self.dialogId
        withCompletion:^(PNPublishStatus *status) {
    NSLog(@"print status %@", status);
//        NSString *text = kEntryEarth;
//        [self displayMessage:text asType:@"[PUBLISH: sent]"];
//    [self dismissViewControllerAnimated:YES completion:nil];
    self.messageTxtView.text = @"";
  }];
}


- (void)displayMessage:(NSString *)message asType:(NSString *)type {
//    NSDictionary *updateEntry = @{ kUpdateEntryType: type, kUpdateEntryMessage: message };
  if ([message containsString:@"####"]) {
    NSArray *items = [message componentsSeparatedByString:@"####"];
    if (_isPupil) {
      [_messageTxtView setHidden:false];
      [_sendButton setHidden:false];
      [_onlyTeacherLabel setHidden:true];
    }else{
    
        if ([items[1] isEqualToString: @"YES"]) {
          [_messageTxtView setHidden:false];
          [_sendButton setHidden:false];
          [_onlyTeacherLabel setHidden:true];
        }else{
          [_messageTxtView setHidden:true];
          [_sendButton setHidden:true];
          [_onlyTeacherLabel setHidden:false];
        }
    }
    
  }else{
    NSDate *date= [NSDate date];
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc]init];
    [dateFormatter setDateFormat:@"dd,MMM yy hh:mm"];
    
    NSString *dateString = [dateFormatter stringFromDate:date];
     NSLog(@"message recieve and send %@====>%@", message, dateString);
    NSString *files=[message containsString:@"https://"]?@"files":@"Text";
     NSDictionary *dict = @{@"message":message, @"time":dateString, @""};
     [_chatHistory addObject:dict];
     [_messageTableView reloadData];
  }
    
}

#pragma mark-pubnub

- (void)client:(PubNub *)pubnub didReceiveMessage:(PNMessageResult *)event {
//    NSString *text = [NSString stringWithFormat:@"entry: %@, update: %@",
//                      event.data.message[@"entry"],
//                      event.data.message[@"update"]];

  
  NSLog(@"event.data.message %@", event.data.message);
  
  if ([event.data.message isKindOfClass:[NSString class]]) {
    [self displayMessage:event.data.message asType:@"received"];
  }else{
    [self displayMessage:event.data.message[@"update"] asType:@"received"];
  }
 
  
   
}

- (void)client:(PubNub *)pubnub didReceivePresenceEvent:(PNPresenceEventResult *)event {
//    NSString *text = [NSString stringWithFormat:@"event uuid: %@, channel: %@",
//                      event.data.presence.uuid,
//                      event.data.channel];
//
//    NSString *type = [NSString stringWithFormat:@"[PRESENCE: %@]", event.data.presenceEvent];
//    [self displayMessage:text asType: type];
}
//
- (void)client:(PubNub *)pubnub didReceiveStatus:(PNStatus *)event {
    NSString *text = [NSString stringWithFormat:@"status: %@", event.stringifiedCategory];

//    [self displayMessage:text asType:@"[STATUS: connection]"];
//    [self submitUpdate:@"Harmless." forEntry:kEntryEarth toChannel:_selectedChannel];
}


- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
  return self.chatHistory.count;
}
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
  MessageCell *cell = [tableView dequeueReusableCellWithIdentifier:@"chat"];
//  cell.blueView.layer.cornerRadius = 10;
  NSDictionary *dict = _chatHistory[indexPath.row];
  NSArray *items = [dict[@"message"] componentsSeparatedByString:@"###"];
  [cell.messageLbl setText:items[0]];
  if ([items[2] isEqualToString:self.currentUserId]) {
    [cell.userNameLbl setText:@"You"];
  }else{
    [cell.userNameLbl setText:items[1]];
  }
  
  [cell.dateTimeLbl setText:dict[@"time"]];
  return  cell;
}
- (void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath{
  if (tableView.contentSize.height <= self.tableSuperView.frame.size.height) {
    [_tableHeightConstrain setConstant:tableView.contentSize.height+10];
    [tableView layoutIfNeeded];
  }else{
    [_tableHeightConstrain setConstant:self.tableSuperView.frame.size.height];
    [tableView layoutIfNeeded];
  }
}


@end
