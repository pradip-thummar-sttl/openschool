//
//  ChatVC.h
//  OpenSchool
//
//  Created by PRADIP on 25/01/22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface ChatVC : UIViewController<UITableViewDelegate, UITableViewDataSource,UINavigationControllerDelegate, UIImagePickerControllerDelegate, UIDocumentPickerDelegate>

@property (strong, nonatomic) NSString *channels;
@property (strong, nonatomic) NSString *dialogId;
@property (strong, nonatomic) NSString *openChat;
@property (strong, nonatomic) NSString *currentUserName;
@property (strong, nonatomic) NSString *currentUserId;
@property (weak, nonatomic) IBOutlet UITextField *messageTxtView;
@property (weak, nonatomic) IBOutlet UITableView *messageTableView;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *tableHeightConstrain;
@property (weak, nonatomic) IBOutlet UIView *tableSuperView;
@property (weak, nonatomic) IBOutlet UIButton *sendButton;
@property (weak, nonatomic) IBOutlet UILabel *onlyTeacherLabel;

@property (weak, nonatomic) IBOutlet UIButton *attachmentButton;

@property (nonatomic) BOOL isPupil;

- (IBAction)onSendButtonPressed:(id)sender;
- (IBAction)onBackPress:(id)sender;
- (IBAction)onAttachmentButtonpress:(id)sender;


@end

NS_ASSUME_NONNULL_END
