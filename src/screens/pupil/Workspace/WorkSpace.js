import React, { useState } from "react";
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import WorkSpaceHeader from "../../../component/reusable/header/WorkSpaceHeader";
import PAGESTYLE from './Style';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
const WorkSpace = (props) => {
    const [example, setExample] = useState(0)
    const [workSpace, setWorkSpace] = useState([])

    const addWorkspace = () => {
        var ws = [...workSpace]
        ws.push('Workspace')
        setWorkSpace(ws)
    }
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView />
            <WorkSpaceHeader goBack={() => props.navigation.goBack()} onAlertPress={() => props.navigation.openDrawer()} onSaveWorkSpacePress={() => { }} />
            <View style={PAGESTYLE.workSpaceView}>
                {/* <Image style={PAGESTYLE.smallVideoImg} source={require('../../../assets/images/videoSmall.png')} /> */}
                {/* <SketchCanvas
                    style={{ height:'60%', backgroundColor:'gray' }}
                    strokeColor={'red'}
                    strokeWidth={7}
                /> */}

                <RNSketchCanvas
                    // text={[
                    //     { text: 'Welcome to my GitHub', font: 'fonts/IndieFlower.ttf', fontSize: 30, position: { x: 0, y: 0 }, anchor: { x: 0, y: 0 }, coordinate: 'Absolute', fontColor: 'red' },
                    //     { text: 'Center\nMULTILINE', fontSize: 25, position: { x: 0.5, y: 0.5 }, anchor: { x: 0.5, y: 0.5 }, coordinate: 'Ratio', overlay: 'SketchOnText', fontColor: 'black', alignment: 'Center', lineHeightMultiple: 1 },
                    //     { text: 'Right\nMULTILINE', fontSize: 25, position: { x: 1, y: 0.25 }, anchor: { x: 1, y: 0.5 }, coordinate: 'Ratio', overlay: 'TextOnSketch', fontColor: 'black', alignment: 'Right', lineHeightMultiple: 1 },
                    //     { text: 'Signature', font: 'Zapfino', fontSize: 40, position: { x: 0, y: 1 }, anchor: { x: 0, y: 1 }, coordinate: 'Ratio', overlay: 'TextOnSketch', fontColor: '#444444' }
                    // ]}
                    containerStyle={{ height: 500 }}
                    canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
                    onStrokeEnd={data => {
                        console.log('stroke data', data)
                    }}
                    // closeComponent={<View style={PAGESTYLE.functionButton}><Text style={{ color: 'white' }}>Close</Text></View>}
                    // onClosePressed={() => {
                    //     setExample(0)
                    // }}
                    // undoComponent={<View style={PAGESTYLE.functionButton}><Text style={{ color: 'white' }}>Undo</Text></View>}
                    // onUndoPressed={(id) => {
                    //     // Alert.alert('do something')
                    // }}
                    // clearComponent={<View style={PAGESTYLE.functionButton}><Text style={{ color: 'white' }}>Clear</Text></View>}
                    // onClearPressed={() => {
                    //     // Alert.alert('do something')
                    // }}
                    eraseComponent={<Image source={require('../../../assets/images/drawEraser.png')} />}
                    strokeComponent={color => (
                        <View style={[{ backgroundColor: color, height: 30, width: 30 }]} />
                    )}
                    strokeSelectedComponent={(color, index, changed) => {
                        return (
                            <Image source={require('../../../assets/images/drawPencil.png')} />
                        )
                    }}
                    strokeWidthComponent={(w) => {
                        return (<View style={PAGESTYLE.strokeWidthButton}>
                            <View style={{
                                backgroundColor: 'white', marginHorizontal: 2.5,
                                width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                            }} />
                        </View>
                        )
                    }}
                    defaultStrokeIndex={0}
                    defaultStrokeWidth={5}
                    saveComponent={<View style={PAGESTYLE.functionButton}><Text style={{ color: 'white' }}>Save</Text></View>}
                    savePreference={() => {
                        return {
                            folder: "RNSketchCanvas",
                            filename: String(Math.ceil(Math.random() * 100000000)),
                            transparent: false,
                            imageType: "png"
                        }
                    }}
                    onSketchSaved={(success, path) => {
                        Alert.alert(success ? 'Image saved!' : 'Failed to save image!', path)
                        console.log('paths', path)

                    }}
                    onPathsChange={(pathsCount) => {
                        console.log('pathsCount', pathsCount)
                    }}
                />

                <View style={PAGESTYLE.bottomView}>
                    <View style={PAGESTYLE.wsView}>
                        {
                            workSpace.map((item, index) => {
                                return (
                                    <View style={PAGESTYLE.fileGrp}>
                                        <Text style={PAGESTYLE.fileName}>{item} {index+1}</Text>
                                        <Image source={require('../../../assets/images/cancel.png')} style={PAGESTYLE.moreIcon} />
                                    </View>
                                )
                            })
                        }

                    </View>
                    <View style={PAGESTYLE.editorView}>

                        <TouchableOpacity onPress={() => addWorkspace()} style={PAGESTYLE.workspacebtn} >
                            <Text style={{ fontSize: 25, color: 'rgba(48,156,233,1)', fontWeight: 'bold', alignSelf: 'center' }}>+
                            <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>   NEW WORKSPACE</Text></Text>
                        </TouchableOpacity>
                        {/* <View style={PAGESTYLE.controlView}>
                            <TouchableOpacity>
                                <Image source={require('../../../assets/images/drawPencil.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../../assets/images/drawEraser.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../../assets/images/drawBoardsmiley.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../../assets/images/drawboardText.png')} />
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </View>
            </View>
        </View>
    )
}
export default WorkSpace;