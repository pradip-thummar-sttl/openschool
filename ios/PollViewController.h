//
//  PollViewController.h
//  OpenSchool
//
//  Created by iMac on 01/11/21.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface PollViewController : UIViewController


@property (strong, nonatomic) NSArray *channels;
@property (strong, nonatomic) NSString *pollString;
@property (strong, nonatomic) NSString *pupilId;
@property (nonatomic) BOOL ispupil;
@property (weak, nonatomic) IBOutlet UIView *teacherPollView;

@property (weak, nonatomic) IBOutlet UITextView *queTextView;
@property (weak, nonatomic) IBOutlet UITextField *opt1TxtField;
@property (weak, nonatomic) IBOutlet UITextField *opt2TxtField;
@property (weak, nonatomic) IBOutlet UITextField *opt3TxtField;
@property (weak, nonatomic) IBOutlet UITextField *opt4TxtField;


- (IBAction)onBackPress:(id)sender;
@property (weak, nonatomic) IBOutlet UIButton *createPollBtn;
- (IBAction)onCreatePollPress:(id)sender;


@property (weak, nonatomic) IBOutlet UIView *pupilPollView;
@property (weak, nonatomic) IBOutlet UIButton *opt1Btn;
@property (weak, nonatomic) IBOutlet UIButton *opt2Btn;
@property (weak, nonatomic) IBOutlet UIButton *opt3Btn;
@property (weak, nonatomic) IBOutlet UIButton *opt4Btn;
@property (weak, nonatomic) IBOutlet UILabel *questionLbl;
- (IBAction)onOpt1Press:(id)sender;
- (IBAction)onOpt2Press:(id)sender;
- (IBAction)onOpt3Press:(id)sender;
- (IBAction)onOpt4Press:(id)sender;


@end

NS_ASSUME_NONNULL_END
