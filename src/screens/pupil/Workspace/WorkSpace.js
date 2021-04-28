import React, { useState } from "react";
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import WorkSpaceHeader from "../../../component/reusable/header/WorkSpaceHeader";
import PAGESTYLE from './Style';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import { Service } from "../../../service/Service";
import { EndPoints } from "../../../service/EndPoints";
import { User } from "../../../utils/Model";
import { getFileExtention } from "../../../utils/Download";
import { showMessage } from "../../../utils/Constant";
const WorkSpace = (props) => {
    const [workSpace, setWorkSpace] = useState([])
    const [workSpacePath, setWorkSpacePath] = useState("")
    console.log('props of workspace', props)
  
    const onSubmitWorkspace = () => {
        const pathArr = workSpacePath.split('/')
        const ext = getFileExtention(workSpacePath)
        console.log('path arr', ext[0])
        const data = new FormData()
        data.append('workspace', {
            uri: workSpacePath,
            name: pathArr[pathArr.length - 1],
            type: `image/${ext[0]}`
        })
        Service.postFormData(data, `${EndPoints.UploadWorkspace}/${props.id}/${User.user.UserDetialId}`, (res) => {
            console.log('response of upload workspace', res)
            if (res.flag) {
                showMessage("upload Successfully")
            } else {
                showMessage(res.message)
            }
        }, (err) => {
            console.log('Error of upload workspace', err)
        })
    }
    const addWorkspace = () => {
        var ws = [...workSpace]
        ws.push('Workspace')
        setWorkSpace(ws)
    }
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView />
            <WorkSpaceHeader isWorkspace={props.isWorkspace} goBack={() => props.goBack()} onAlertPress={() => props.navigation.openDrawer()} onSaveWorkSpacePress={() => { onSubmitWorkspace() }} />
            {
                props.isWorkspace ?
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
                                <Image source={require('../../../assets/images/drawPencil.png')} />
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
                                // Alert.alert(success ? 'Image saved!' : 'Failed to save image!', path)
                                console.log('paths', path)
                                setWorkSpacePath(path)

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
                                                <Text style={PAGESTYLE.fileName}>{item} {index + 1}</Text>
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
                    :
                    <View style={PAGESTYLE.workSpaceView}>
                        <Image style={{height:'100%', width:'100%'}} source={{uri:props.item}} />
                    </View>
            }

        </View>
    )
}
export default WorkSpace;