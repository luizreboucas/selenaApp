import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { View,Text, Pressable,Image } from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as Linking from 'expo-linking';



const Lesson = ({navitagion, route}) => {
    const {lessonId, token, URI, user} = route.params
    const [lesson, setLesson] = useState({})
    const [pdfLink, setPdfLink] = useState('')
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

    const downloadPDF = async () => {
        const url = `${pdfLink}`; // Substitua pela URL real do arquivo PDF que você deseja baixar
      
        const downloadDest = `${FileSystem.documentDirectory}myFile.pdf`;
      
        try {
          const { uri } = await FileSystem.downloadAsync(url, downloadDest);
          
          console.log('Arquivo PDF baixado para:', uri);
          
          // Faça algo com o arquivo PDF baixado, como exibi-lo ou salvá-lo no armazenamento do dispositivo.
        } catch (error) {
          console.log('Erro ao baixar o arquivo PDF:', error);
        }
      };
      const getPdf = () => {
        Linking.openURL(pdfLink)
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
