//
//  CallViewController.h
//  QBRTCChatSemple
//
//  Created by Andrey Ivanov on 11.12.14.
//  Copyright (c) 2014 QuickBlox Team. All rights reserved.
//

#import <UIKit/UIKit.h>

@class ScreenRecorder;
@class QBChatDialog;
@class UsersDataSource;

@interface CallViewController : UIViewController

@property (strong, nonatomic) QBChatDialog *chatDialog;
@property (assign, nonatomic) QBRTCConferenceType conferenceType;
@property (weak, nonatomic) UsersDataSource *usersDataSource;

@property (strong, nonatomic) NSString *dialogID;
@property (strong, nonatomic) NSString *currentName;
@property (strong, nonatomic) NSString *currentUserID;
@property (strong, nonatomic) NSArray *occupants;
@property (strong, nonatomic) NSMutableArray *selectedUsers;
@property (nonatomic) BOOL asListener;
@property (nonatomic) BOOL isTeacher;
@property (strong, nonatomic) NSString *teacherQBUserID;
@property (strong, nonatomic) NSString *titlee;
@property (strong, nonatomic) NSArray *channels;

typedef void (^CompleteCall)(BOOL isFinished, NSString *url);
@property (copy, nonatomic) CompleteCall completeCall;
@property (weak, nonatomic) IBOutlet UIButton *endCallButton;
@property (weak, nonatomic) IBOutlet UIView *reactionView;
@property (weak, nonatomic) IBOutlet UITableView *reactionTableView;
@property (weak, nonatomic) IBOutlet UIView *userCameraView;

@property (weak, nonatomic) IBOutlet UIView *emojiView;
@property (weak, nonatomic) IBOutlet UIView *doView;
@property (weak, nonatomic) IBOutlet UIView *raView;
@property (weak, nonatomic) IBOutlet UIView *thView;
- (IBAction)dontBtn:(id)sender;

- (IBAction)raiseBtn:(id)sender;
- (IBAction)thumbBtn:(id)sender;

//- (ScreenRecorder *)returnSwiftClassInstance;
- (IBAction)onCollectionTap:(UITapGestureRecognizer *)sender;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *toolbarHeightConstrain;

@property (weak, nonatomic) IBOutlet UIView *classSettingView;
@property (weak, nonatomic) IBOutlet UIButton *messageSwitch;
@property (weak, nonatomic) IBOutlet UIButton *reactionSwitch;
@property (weak, nonatomic) IBOutlet UIButton *muteAllButton;
@property (weak, nonatomic) IBOutlet UIButton *classVottingButton;
@property (weak, nonatomic) IBOutlet UIButton *screenRecordingButton;

- (IBAction)onCloseSettings:(id)sender;
- (IBAction)onMessageSwitchPressed:(id)sender;
- (IBAction)onReactionSwitchPressed:(id)sender;
- (IBAction)onPressMuteAll:(id)sender;
- (IBAction)onPressSetupClassVotting:(id)sender;
- (IBAction)onStartScreenRecordingPressed:(id)sender;


@end
