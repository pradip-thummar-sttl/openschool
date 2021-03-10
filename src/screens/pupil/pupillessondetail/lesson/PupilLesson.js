import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, H3, ScrollView, Image, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from "../../../../utils/Colors";
import STYLE from '../../../../utils/Style';
import PAGESTYLE from '../Style';
import FONTS from '../../../../utils/Fonts';


const PupilLesson = (props) => {
    return (

        <View style={PAGESTYLE.whiteBg}>
            <Text style={PAGESTYLE.videoTitle}>Lessons for Week beginning - 07/09/20</Text>
            <View style={STYLE.hrCommon}></View>
            <ScrollView horizontal={true} style={PAGESTYLE.videoWrap}>
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>English</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>Grammar</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>  
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>Art</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>Cartoon Drawing</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity> 
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>Mathematics</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>Timetables</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity> 
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>PE</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>With Joe Hicks</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>   
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>English</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>Grammar</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>  
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>Art</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>Cartoon Drawing</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity> 
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>Mathematics</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>Timetables</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity> 
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>PE</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>With Joe Hicks</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>              
            </ScrollView>
            <Text style={[PAGESTYLE.videoTitle, PAGESTYLE.spaceTop]}>Lessons from last week - 28/08/20</Text>
            <View style={STYLE.hrCommon}></View>  
            <ScrollView horizontal={true} style={PAGESTYLE.videoWrap}>
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>English</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>Grammar</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>  
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>Art</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>Cartoon Drawing</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity> 
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>Mathematics</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>Timetables</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity> 
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>PE</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>With Joe Hicks</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>   
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>English</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>Grammar</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>  
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>Art</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>Cartoon Drawing</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity> 
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>Mathematics</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>Timetables</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity> 
                <TouchableOpacity style={PAGESTYLE.videoCard}>
                    <View style={PAGESTYLE.videoCardThumb}>
                        <Image style={PAGESTYLE.videoThumbnail} source={require('../../../../assets/images/video-back2.png')} />
                        <Image style={PAGESTYLE.videoShadow} source={require('../../../../assets/images/video-shadow2.png')} />
                        <Text style={PAGESTYLE.videoDate}>14/09/2020</Text>
                        <Image source={require('../../../../assets/images/bookmark-on2.png')} style={PAGESTYLE.bookMarkLabel} />
                    </View>
                    <Text style={PAGESTYLE.videoSubTitleNormal}>PE</Text>
                    <Text style={PAGESTYLE.videoSubTitleBold}>With Joe Hicks</Text>
                    <View style={[PAGESTYLE.videoWrap, PAGESTYLE.videoUserSpaceLeft]}>
                        <View style={PAGESTYLE.thumbSmall}></View>
                        <Text style={PAGESTYLE.videoUserName}>Miss Barker</Text>
                    </View>
                </TouchableOpacity>              
            </ScrollView>          
        </View>


    );
}
export default PupilLesson;