//
//  CallModule.m
//  OpenSchool
//
//  Created by iMac on 02/06/21.
//

#import "CallModule.h"
#import "CallViewController.h"
#import "AppDelegate.h"
#import <UIKit/UIKit.h>
@implementation CallModule
RCT_EXPORT_MODULE(CallModuleIos)
RCT_EXPORT_METHOD(createCall:(RCTResponseSenderBlock)successCallback){

  UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Mains" bundle:nil];
  UIViewController *VC = [storyboard instantiateViewControllerWithIdentifier:@"CallViewController"];
//  [[[[UIApplication sharedApplication]keyWindow]rootViewController].navigationController presentViewController:VC animated:true completion:nil];
  [[[[UIApplication sharedApplication]keyWindow]rootViewController] presentViewController:VC animated:NO completion:nil];
//  [((AppDelegate *)[[UIApplication sharedApplication] delegate]) showLoginView];
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    successCallback(@[@"hello"]);
  });



}
@end
