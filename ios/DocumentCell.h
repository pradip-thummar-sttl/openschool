//
//  DocumentCell.h
//  OpenSchool
//
//  Created by iMac on 08/02/22.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface DocumentCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UILabel *userLabel;
@property (weak, nonatomic) IBOutlet UILabel *dateLabel;
@property (weak, nonatomic) IBOutlet UIView *docView;
@property (weak, nonatomic) IBOutlet UIImageView *docImage;
@property (weak, nonatomic) IBOutlet UILabel *docName;

@end

NS_ASSUME_NONNULL_END
