import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { View,Text } from 'react-native'

const Lesson = ({navitagion, route}) => {
    const {lessonId, token, URI, user} = route.params
    const [lesson, setLesson] = useState({})
    useEffect(()=>{
        const getLesson = async() => {
            try {
                const response = await axios.get(`${URI}/wp-json/learnpress/v1/lessons/${lessonId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        getLesson()
        
    },[])
  return (
    <View>
        <Text>{lessonId}</Text>
    </View>
  )
}

export default Lesson
