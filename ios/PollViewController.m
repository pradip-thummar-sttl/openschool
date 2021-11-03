//
//  PollViewController.m
//  OpenSchool
//
//  Created by iMac on 01/11/21.
//

#import "PollViewController.h"
#import <PubNub/PubNub.h>

static NSString * const kEntryEarth = @"Earth";
static NSString * const kUpdateEntryMessage = @"entryMessage";
static NSString * const kUpdateEntryType = @"entryType";
static NSString * const kChannelGuide = @"the_guide";

@interface PollViewController ()
@property (nonatomic, strong) PubNub *pubnub;
@end

@implementation PollViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  PNConfiguration *pnconfig = [PNConfiguration configurationWithPublishKey:@"pub-c-bd967178-53ea-4b05-954a-2666bb3b6337"
                                                              subscribeKey:@"sub-c-3d3bcd76-c8e7-11eb-bdc5-4e51a9db8267"];
  pnconfig.uuid = @"myUniqueUUID";
  self.pubnub = [PubNub clientWithConfiguration:pnconfig];
  
  [self.pubnub addListener:self];
  [self.pubnub subscribeToChannels: self.channels withPresence:YES];
  
  if (self.ispupil) {
    [_teacherPollView setHidden:true];
    [_pupilPollView setHidden:false];
    [_createPollBtn setHidden:true];
    NSArray *listItems = [self.pollString componentsSeparatedByString:@"##@##"];
    [_questionLbl setText:listItems[0]];
    [_opt1Btn setTitle:listItems[1] forState:UIControlStateNormal];
    [_opt2Btn setTitle:listItems[2] forState:UIControlStateNormal];
    [_opt3Btn setTitle:listItems[3] forState:UIControlStateNormal];
    [_opt4Btn setTitle:listItems[4] forState:UIControlStateNormal];
    
  }else{
    [_teacherPollView setHidden:false];
    [_pupilPollView setHidden:true];
    [_createPollBtn setHidden:false];
    [_queTextView setText:@""];
    [_opt1TxtField setText:@""];
    [_opt2TxtField setText:@""];
    [_opt3TxtField setText:@""];
    [_opt4TxtField setText:@""];
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

- (IBAction)onBackPress:(id)sender {
  [self dismissViewControllerAnimated:YES completion:nil];
}
- (IBAction)onCreatePollPress:(id)sender {
  if ([_queTextView.text isEqualToString:@""]) {
    UIAlertController * alert = [UIAlertController
                                     alertControllerWithTitle:@"ERROR"
                                     message:@"Please Enter Question"
                                     preferredStyle:UIAlertControllerStyleAlert];
    [self presentViewController:alert animated:YES completion:nil];
  }else if ([_opt1TxtField.text isEqualToString:@""]){
    UIAlertController * alert = [UIAlertController
                                     alertControllerWithTitle:@"ERROR"
                                     message:@"Please Enter option 1"
                                     preferredStyle:UIAlertControllerStyleAlert];
    [self presentViewController:alert animated:YES completion:nil];
  }else if ([_opt2TxtField.text isEqualToString:@""]){
    UIAlertController * alert = [UIAlertController
                                     alertControllerWithTitle:@"ERROR"
                                     message:@"Please Enter option 2"
                                     preferredStyle:UIAlertControllerStyleAlert];
    [self presentViewController:alert animated:YES completion:nil];
  }else if ([_opt3TxtField.text isEqualToString:@""]){
    UIAlertController * alert = [UIAlertController
                                     alertControllerWithTitle:@"ERROR"
                                     message:@"Please Enter option 3"
                                     preferredStyle:UIAlertControllerStyleAlert];
    [self presentViewController:alert animated:YES completion:nil];
  }else if ([_opt4TxtField.text isEqualToString:@""]){
    UIAlertController * alert = [UIAlertController
                                     alertControllerWithTitle:@"ERROR"
                                     message:@"Please Enter option 4"
                                     preferredStyle:UIAlertControllerStyleAlert];
    [self presentViewController:alert animated:YES completion:nil];
  }else{
    NSString *str = [NSString stringWithFormat:@"%@##@##%@##@##%@##@##%@##@##%@",_queTextView.text,_opt1TxtField.text,_opt2TxtField.text,_opt3TxtField.text,_opt4TxtField.text];
    [self.pubnub publish: @{ @"entry": kEntryEarth, @"update": str } toChannel:self.channels[_channels.count - 1]
          withCompletion:^(PNPublishStatus *status) {
      NSLog(@"print status %@", status);
//        NSString *text = kEntryEarth;
//        [self displayMessage:text asType:@"[PUBLISH: sent]"];
      [self dismissViewControllerAnimated:YES completion:nil];
    }];
    
  }
}

//- (void)displayMessage:(NSString *)message asType:(NSString *)type {
//    NSDictionary *updateEntry = @{ kUpdateEntryType: type, kUpdateEntryMessage: message };
////    self.messages = message;
////  [self.opponentsCollectionView reloadData];
////    NSIndexPath *indexPath = [NSIndexPath indexPathForRow:0 inSection:0];
////
////    [self.tableView beginUpdates];
////    [self.tableView insertRowsAtIndexPaths:@[indexPath]
////                          withRowAnimation:UITableViewRowAnimationBottom];
////
////    [self.tableView endUpdates];
////  NSLog(@"print messages data %@", self.messages);
//}


- (IBAction)onOpt4Press:(id)sender {
  NSString *str = [NSString stringWithFormat:@"%@##@##%@",_opt4Btn.titleLabel.text, self.pupilId];
  [self.pubnub publish: @{ @"entry": kEntryEarth, @"update": str } toChannel:self.channels[0]
        withCompletion:^(PNPublishStatus *status) {
    NSLog(@"print status %@", status);
//        NSString *text = kEntryEarth;
//        [self displayMessage:text asType:@"[PUBLISH: sent]"];
    [self dismissViewControllerAnimated:YES completion:nil];
  }];
}

- (IBAction)onOpt3Press:(id)sender {
  NSString *str = [NSString stringWithFormat:@"%@##@##%@",_opt3Btn.titleLabel.text, self.pupilId];
  [self.pubnub publish: @{ @"entry": kEntryEarth, @"update": str } toChannel:self.channels[0]
        withCompletion:^(PNPublishStatus *status) {
    NSLog(@"print status %@", status);
//        NSString *text = kEntryEarth;
//        [self displayMessage:text asType:@"[PUBLISH: sent]"];
    [self dismissViewControllerAnimated:YES completion:nil];
  }];
}

- (IBAction)onOpt2Press:(id)sender {
  NSString *str = [NSString stringWithFormat:@"%@##@##%@",_opt2Btn.titleLabel.text, self.pupilId];
  [self.pubnub publish: @{ @"entry": kEntryEarth, @"update": str } toChannel:self.channels[0]
        withCompletion:^(PNPublishStatus *status) {
    NSLog(@"print status %@", status);
//        NSString *text = kEntryEarth;
//        [self displayMessage:text asType:@"[PUBLISH: sent]"];
    [self dismissViewControllerAnimated:YES completion:nil];
  }];
}

- (IBAction)onOpt1Press:(id)sender {
  NSString *str = [NSString stringWithFormat:@"%@##@##%@",_opt1Btn.titleLabel.text, self.pupilId];
  [self.pubnub publish: @{ @"entry": kEntryEarth, @"update": str } toChannel:self.channels[0]
        withCompletion:^(PNPublishStatus *status) {
    NSLog(@"print status %@", status);
//        NSString *text = kEntryEarth;
//        [self displayMessage:text asType:@"[PUBLISH: sent]"];
    [self dismissViewControllerAnimated:YES completion:nil];
  }];
}
@end
