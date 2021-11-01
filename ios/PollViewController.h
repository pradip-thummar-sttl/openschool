//
//  PollViewController.h
//  OpenSchool
//
//  Created by iMac on 01/11/21.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface PollViewController : UIViewController

@property (weak, nonatomic) IBOutlet UITextView *queTextView;
@property (weak, nonatomic) IBOutlet UITextField *opt1TxtField;
@property (weak, nonatomic) IBOutlet UITextField *opt2TxtField;
@property (weak, nonatomic) IBOutlet UITextField *opt3TxtField;
@property (weak, nonatomic) IBOutlet UITextField *opt4TxtField;


- (IBAction)onBackPress:(id)sender;
@property (weak, nonatomic) IBOutlet UIButton *createPollBtn;
- (IBAction)onCreatePollPress:(id)sender;

@end

NS_ASSUME_NONNULL_END
