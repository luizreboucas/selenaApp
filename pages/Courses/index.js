import React from 'react'
import { View,Text } from 'react-native'

const Courses = ({route, navigation}) => {
    const {token} = route.params
  return (
    <View>
        <Text>courses</Text>
        <Text>{token}</Text>
    </View>
  )
}

export default Courses
