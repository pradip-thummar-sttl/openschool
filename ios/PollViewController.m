//
//  PollViewController.m
//  OpenSchool
//
//  Created by iMac on 01/11/21.
//

#import "PollViewController.h"

@interface PollViewController ()

@end

@implementation PollViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
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
    
  }
}
@end
