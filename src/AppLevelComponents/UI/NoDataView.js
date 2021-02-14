import React from 'react'
import { View, Text } from 'react-native'
import CustomText from 'AppLevelComponents/UI/CustomText'
import { Colors } from 'UIProps/Colors'
const NoDataView = ({noDataMsg}) => {
    return (
        <View style={{alignItems:'center',marginTop:50}} >
            <CustomText textAlign='center' size={19} text={noDataMsg || 'No data'} color={Colors.textNormal} />
        </View>
    )
}

export default NoDataView
