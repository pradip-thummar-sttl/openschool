//
//  WhiteboardVC.m
//  OpenSchool
//
//  Created by iMac on 23/07/21.
//

#import "WhiteboardVC.h"

@interface WhiteboardVC ()

@end

@implementation WhiteboardVC

- (void)viewDidLoad {
    [super viewDidLoad];
  
     NSURL *url = [NSURL URLWithString:@"14.143.90.234:10082/web/CoDoodler/CoDoodler.html"];
     NSURLRequest *request = [NSURLRequest requestWithURL:url];
     [_wkWebView loadRequest:request];
    // Do any additional setup after loading the view.
}
- (IBAction)onBack:(id)sender {
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
