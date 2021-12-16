//
//  PollVC.h
//  OpenSchool
//
//  Created by iMac on 14/12/21.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface PollVC : UIViewController

@property (strong, nonatomic) NSArray *channels;
@property (strong, nonatomic) NSString *pollString;
@property (strong, nonatomic) NSString *pupilId;
@property (nonatomic) BOOL ispupil;

@property (weak, nonatomic) IBOutlet UITextField *txtFieldQuestion;

@property (weak, nonatomic) IBOutlet UIView *teacherPollView;
@property (weak, nonatomic) IBOutlet UIView *pupilPollView;
@property (weak, nonatomic) IBOutlet UITextField *txtFieldOpt1;
@property (weak, nonatomic) IBOutlet UITextField *txtFieldOpt2;
@property (weak, nonatomic) IBOutlet UIButton *savePollBtn;
@property (weak, nonatomic) IBOutlet UIButton *clearPollBtn;
@property (weak, nonatomic) IBOutlet UIView *addOptionView;
@property (weak, nonatomic) IBOutlet UIView *addTextFieldView;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *addOptionHeightConstrain;
@property (weak, nonatomic) IBOutlet UIView *teacherButtonView;

- (IBAction)onBack:(id)sender;
- (IBAction)onAddOptionPressed:(id)sender;
- (IBAction)onClearPollPressed:(id)sender;
- (IBAction)onSavePollPressed:(id)sender;


@property (weak, nonatomic) IBOutlet UITextField *pupilQuestionTxt;
@property (weak, nonatomic) IBOutlet UIView *pupilOptionView;
@property (weak, nonatomic) IBOutlet UIButton *submitAnswerBUtton;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *pupilOptionHEightConstrain;

- (IBAction)onSubmitAnswer:(id)sender;





@end

NS_ASSUME_NONNULL_END
