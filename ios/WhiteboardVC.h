//
//  WhiteboardVC.h
//  OpenSchool
//
//  Created by iMac on 23/07/21.
//

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>
NS_ASSUME_NONNULL_BEGIN

@interface WhiteboardVC : UIViewController
@property (weak, nonatomic) IBOutlet WKWebView *wkWebView;
@property (weak, nonatomic) IBOutlet UIButton *backButton;

@end

NS_ASSUME_NONNULL_END
