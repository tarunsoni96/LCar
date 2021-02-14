import React from 'react'
import { View, TouchableOpacity, } from 'react-native'
import { navigationRef } from '../../../RootNavigation'

export default function CustomTouchableOpacity({onPress,onBack,children}) {
    return (
        <TouchableOpacity
                  style={{ width: 40, height: 40,alignItems:'center',justifyContent:'center' }}
                  onPress={() =>
                    onPress ? onPress() :{}
                  }
                >
                  {children}
                </TouchableOpacity>
    )
}
