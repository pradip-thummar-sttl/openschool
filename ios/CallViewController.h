//
//  CallViewController.h
//  QBRTCChatSemple
//
//  Created by Andrey Ivanov on 11.12.14.
//  Copyright (c) 2014 QuickBlox Team. All rights reserved.
//

#import <UIKit/UIKit.h>

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

typedef void (^CompleteCall)(BOOL isFinished);
@property (copy, nonatomic) CompleteCall completeCall;
@property (weak, nonatomic) IBOutlet UIButton *endCallButton;
@property (weak, nonatomic) IBOutlet UIView *reactionView;
@property (weak, nonatomic) IBOutlet UITableView *reactionTableView;



@end
