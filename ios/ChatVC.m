//
//  ChatVC.m
//  OpenSchool
//
//  Created by PRADIP on 25/01/22.
//

#import "ChatVC.h"
#import <PubNub/PubNub.h>

@interface ChatVC ()
@property (nonatomic, strong) PubNub *pubnub;
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
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
