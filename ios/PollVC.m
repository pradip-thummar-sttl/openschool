//
//  PollVC.m
//  OpenSchool
//
//  Created by iMac on 14/12/21.
//

#import "PollVC.h"
#import <PubNub/PubNub.h>

static NSString * const kEntryEarth = @"Earth";
static NSString * const kUpdateEntryMessage = @"entryMessage";
static NSString * const kUpdateEntryType = @"entryType";
static NSString * const kChannelGuide = @"the_guide";

@interface PollVC ()
@property (nonatomic, strong) PubNub *pubnub;
@property (strong, nonatomic) NSMutableArray *optionArr;
@property (nonatomic) int xHeight;
@end

@implementation PollVC

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  PNConfiguration *pnconfig = [PNConfiguration configurationWithPublishKey:@"pub-c-bd967178-53ea-4b05-954a-2666bb3b6337"
                                                              subscribeKey:@"sub-c-3d3bcd76-c8e7-11eb-bdc5-4e51a9db8267"];
  pnconfig.uuid = @"myUniqueUUID";
  self.pubnub = [PubNub clientWithConfiguration:pnconfig];
  
  [self.pubnub addListener:self];
  [self.pubnub subscribeToChannels: self.channels withPresence:YES];
  
  _optionArr=[[NSMutableArray alloc]init];
  _xHeight = 0;
  _clearPollBtn.layer.cornerRadius=10;
  _clearPollBtn.layer.borderWidth=1;
  _clearPollBtn.layer.borderColor=[UIColor grayColor].CGColor;
  
  _savePollBtn.layer.cornerRadius=10;
  
  _teacherButtonView.layer.cornerRadius = 5;
  _teacherButtonView.layer.borderWidth=0.5;
  _teacherButtonView.layer.borderColor=[UIColor grayColor].CGColor;
  
  if (self.ispupil) {
    [_pupilPollView setHidden:false];
    [_submitAnswerBUtton setHidden:false];
    [_teacherPollView setHidden:true];
    [_teacherButtonView setHidden:true];
    NSArray *listItems = [self.pollString componentsSeparatedByString:@"##@##"];
  }else{
    [_pupilPollView setHidden:true];
    [_submitAnswerBUtton setHidden:true];
    [_teacherPollView setHidden:false];
    [_teacherButtonView setHidden:false];
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
-(void) resetTextField{
  for (UIView *subUIView in self.addTextFieldView.subviews) {
         [subUIView removeFromSuperview];
     }

  _xHeight = 0;
  for (int i = 0; i<_optionArr.count; i++) {
    UITextField *txt = _optionArr[i];
    UITextField *textField = [[UITextField alloc] initWithFrame:CGRectMake(0, _xHeight, self.addTextFieldView.frame.size.width-40, 40)];
    textField.borderStyle = UITextBorderStyleRoundedRect;
    textField.font = [UIFont systemFontOfSize:15];
    textField.placeholder = @"enter text";
    textField.autocorrectionType = UITextAutocorrectionTypeNo;
    textField.keyboardType = UIKeyboardTypeDefault;
    textField.returnKeyType = UIReturnKeyDone;
    textField.clearButtonMode = UITextFieldViewModeWhileEditing;
    textField.contentVerticalAlignment = UIControlContentVerticalAlignmentCenter;
    [textField setText:txt.text];
    textField.tag = i;
  //  textField.delegate = self;
    [self.addTextFieldView addSubview:textField];
    
    UIButton *button = [[UIButton alloc]init];
    button.frame = CGRectMake(textField.frame.size.width+5,_xHeight, 35, 40.0);
  //  [button setBackgroundColor:[UIColor redColor]];
    [button setTag:i];
    [button addTarget:self
               action:@selector(deleteButtonClicked:)
     forControlEvents:UIControlEventTouchUpInside];
    [button setImage:[UIImage imageNamed:@"record_off"] forState:UIControlStateNormal];
    
    [self.addTextFieldView addSubview:button];
    
    _xHeight = _xHeight+40+5;
    
  }
  self.addOptionHeightConstrain.constant=_xHeight;
 }


-(void) deleteButtonClicked:(UIButton*)sender{
  [_optionArr removeObjectAtIndex:sender.tag];
  if (_optionArr.count <= 3) {
    [_addOptionView setHidden:false];
  }
  [self resetTextField];

 }

- (IBAction)onSavePollPressed:(id)sender {
  if ([_txtFieldQuestion.text isEqualToString:@""]) {
    UIAlertController * alert = [UIAlertController
                                     alertControllerWithTitle:@"ERROR"
                                     message:@"Please Enter Question"
                                     preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *cancel = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleCancel handler:nil];
    [alert addAction:cancel];
    [self presentViewController:alert animated:YES completion:nil];
    return;
  }else if ([_txtFieldOpt1.text isEqualToString:@""]){
    UIAlertController * alert = [UIAlertController
                                     alertControllerWithTitle:@"ERROR"
                                     message:@"Please Enter option 1"
                                     preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *cancel = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleCancel handler:nil];
    [alert addAction:cancel];
    [self presentViewController:alert animated:YES completion:nil];
    return;
  }else if ([_txtFieldOpt2.text isEqualToString:@""]){
    UIAlertController * alert = [UIAlertController
                                     alertControllerWithTitle:@"ERROR"
                                     message:@"Please Enter option 2"
                                     preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *cancel = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleCancel handler:nil];
    [alert addAction:cancel];
    [self presentViewController:alert animated:YES completion:nil];
    return;
  }
    
  NSString *str1 = @"";
  
    for (int i = 0; i<_optionArr.count; i++) {
      UITextField *txt = _optionArr[i];
      if ([txt.text isEqualToString:@""]) {
        NSString *str = [NSString stringWithFormat:@"Please Enter option %d",i+3];
        UIAlertController * alert = [UIAlertController
                                         alertControllerWithTitle:@"ERROR"
                                         message:str
                                         preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *cancel = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleCancel handler:nil];
        [alert addAction:cancel];
        [self presentViewController:alert animated:YES completion:nil];
        return;
      }else{
        str1 = [str1 stringByAppendingString:[NSString stringWithFormat:@"##@##%@",txt.text]];
      }
    }
  
  
  
    
    NSString *str = [NSString stringWithFormat:@"%@##@##%@##@##%@%@",_txtFieldQuestion.text,_txtFieldOpt1.text,_txtFieldOpt2.text,str1];
    [self.pubnub publish: @{ @"entry": kEntryEarth, @"update": str } toChannel:self.channels[_channels.count - 1]
          withCompletion:^(PNPublishStatus *status) {
      NSLog(@"print status %@", status);
//        NSString *text = kEntryEarth;
//        [self displayMessage:text asType:@"[PUBLISH: sent]"];
      [self dismissViewControllerAnimated:YES completion:nil];
    }];
}

- (IBAction)onClearPollPressed:(id)sender {
  [_txtFieldQuestion setText:@""];
  [_txtFieldOpt1 setText:@""];
  [_txtFieldOpt2 setText:@""];
  [_optionArr removeAllObjects];
  [self resetTextField];
}

- (IBAction)onAddOptionPressed:(id)sender {
  
  
  UITextField *textField = [[UITextField alloc] initWithFrame:CGRectMake(0, _xHeight, self.addTextFieldView.frame.size.width-40, 40)];
  textField.borderStyle = UITextBorderStyleRoundedRect;
  textField.font = [UIFont systemFontOfSize:15];
  textField.placeholder = @"enter text";
  textField.autocorrectionType = UITextAutocorrectionTypeNo;
  textField.keyboardType = UIKeyboardTypeDefault;
  textField.returnKeyType = UIReturnKeyDone;
  textField.clearButtonMode = UITextFieldViewModeWhileEditing;
  textField.contentVerticalAlignment = UIControlContentVerticalAlignmentCenter;
  textField.tag = _optionArr.count;
//  textField.delegate = self;
  [self.addTextFieldView addSubview:textField];
  
  UIButton *button = [[UIButton alloc]init];
  button.frame = CGRectMake(textField.frame.size.width+5,_xHeight, 35, 40.0);
//  [button setBackgroundColor:[UIColor redColor]];
  [button setTag:_optionArr.count];
  [button addTarget:self
             action:@selector(deleteButtonClicked:)
   forControlEvents:UIControlEventTouchUpInside];
  [button setImage:[UIImage imageNamed:@"record_off"] forState:UIControlStateNormal];
  
  [self.addTextFieldView addSubview:button];
  
  _xHeight = _xHeight+40+5;
  self.addOptionHeightConstrain.constant=_xHeight;
//  [self.addTextFieldView layoutIfNeeded];
  
  [self.optionArr addObject:textField];
  if (_optionArr.count >= 3) {
    [_addOptionView setHidden:true];
  }
  
}

- (IBAction)onBack:(id)sender {
  [self dismissViewControllerAnimated:YES completion:nil];
}

- (IBAction)onSubmitAnswer:(id)sender {
}
@end
