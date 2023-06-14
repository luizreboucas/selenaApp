import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { View,Text } from 'react-native'

const Lesson = ({navitagion, route}) => {
    const {lessonId, token, URI, user} = route.params
    const [lesson, setLesson] = useState({})
    useEffect(()=>{
        const getLesson = async() => {
            const extractDownloadLink = (content) => {
                const start = content.indexOf('href=') + 6;
                const end = content.indexOf('download><')
                const string = content.substring(start,end)
                
                return content.substring(start,end )
              };
            
            try {

                const response = await axios.get(`${URI}/wp-json/learnpress/v1/lessons/${lessonId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                console.log(extractDownloadLink(response.data.content))
                setLesson(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getLesson()
        
    },[])
  return (
    <View>
        <Text>{lessonId}</Text>
        <Text>{lesson.name}</Text>
    </View>
  )
}

export default Lesson
