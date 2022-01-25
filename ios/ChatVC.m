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
  [self.pubnub subscribeToChannels: self.channels withPresence:YES];
  
  self.messageTxtView.layer.cornerRadius = 10;
  [self.messageTxtView setBackgroundColor:[UIColor grayColor]];
  
  _chatHistory = [[NSMutableArray alloc]init];
  [self.messageTableView setDelegate:self];
  [self.messageTableView setDataSource:self];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/



- (IBAction)onSendButtonPressed:(id)sender {
  [self.pubnub publish: _messageTxtView.text toChannel:self.channels[_channels.count - 1]
        withCompletion:^(PNPublishStatus *status) {
    NSLog(@"print status %@", status);
//        NSString *text = kEntryEarth;
//        [self displayMessage:text asType:@"[PUBLISH: sent]"];
//    [self dismissViewControllerAnimated:YES completion:nil];
  }];
}


- (void)displayMessage:(NSString *)message asType:(NSString *)type {
//    NSDictionary *updateEntry = @{ kUpdateEntryType: type, kUpdateEntryMessage: message };
  NSLog(@"message recieve and send %@", message);
  [_chatHistory addObject:message];
  [_messageTableView reloadData];
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
  cell.blueView.layer.cornerRadius = 10;
  [cell.messageLbl setText:_chatHistory[indexPath.row]];
  return  cell;
}


@end
