import React from "react"
import { Camera, useCameraDevices } from "react-native-vision-camera"
import LoadingView from "react-native-loading-view"
import {StyleSheet, Text, View} from 'react-native';

export default function TabFiveScreen() {
    const devices = useCameraDevices()
    const device = devices.back
  
    if (device == null) return <LoadingView />
    return (
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
    )
  }