import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { View,Text, Pressable,Image } from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser'


const Lesson = ({navitagion, route}) => {
    const {lessonId, token, URI, user} = route.params
    const [lesson, setLesson] = useState({})
    const [pdfLink, setPdfLink] = useState('')
    const [pdf, setPdf] = useState()
    useEffect(()=>{
        const getLesson = async() => {
            const extractDownloadLink = (content) => {
                const start = content.indexOf('href=') + 6;
                const end = content.indexOf('download><') - 2
                const string = content.substring(start,end)
                
                return content.substring(start,end )
              };
            
            try {

                const response = await axios.get(`${URI}/wp-json/learnpress/v1/lessons/${lessonId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                setPdfLink(extractDownloadLink(response.data.content))
                setLesson(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getLesson()
        
    },[])

   
      const getPdf = async() => {
        const result = await WebBrowser.openBrowserAsync(pdfLink)
        setPdf(result)
      }
      
  return (
    <View>
        <Text>{lessonId}</Text>
        <Text>{lesson.name}</Text>
        <Text>{pdfLink}</Text>
        <Pressable onPress={()=> downloadPDF()}>
            <Text onPress={getPdf}>
                Download Pdf
            </Text>
            
        </Pressable>
        
    </View>
  )
}

export default Lesson
