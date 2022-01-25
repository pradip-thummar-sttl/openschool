//
//  ChatVC.h
//  OpenSchool
//
//  Created by PRADIP on 25/01/22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface ChatVC : UIViewController<UITableViewDelegate, UITableViewDataSource>

@property (strong, nonatomic) NSArray *channels;
@property (weak, nonatomic) IBOutlet UITextView *messageTxtView;
@property (weak, nonatomic) IBOutlet UITableView *messageTableView;

- (IBAction)onSendButtonPressed:(id)sender;

@end

NS_ASSUME_NONNULL_END
