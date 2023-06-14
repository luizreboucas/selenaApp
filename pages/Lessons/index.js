

import axios from 'axios'
import React,{ useState, useEffect } from 'react'
import { View, FlatList,Text, Pressable, StyleSheet } from 'react-native'
import { WindowHeight, WindowWidth } from '../../globals/Dimensions'

const Lessons = ({navigation, route}) => {
    const {id,user,URI, token} = route.params
    const [lessons, setLessons] = useState({})
    useEffect(()=>{
        const getLessons = async() => {
            try {
                const response = await axios.get(`${URI}/wp-json/learnpress/v1/courses/${id}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                const lessonsResponse = response.data.sections[0].items
                setLessons(lessonsResponse)
                console.log(lessonsResponse)
            } catch (error) {
                console.log(error)
            }
        }

        getLessons()
    },[])

    const goToLesson = (lesson) =>{
        navigation.navigate('Lesson', {lessonId: lesson.id, token, URI, user})
    }
    

  return (
    <View style={styles.container}>
        
        <FlatList
            data={lessons}
            renderItem={({item}) => {
                return(
                    <Pressable
                        onPress={() => goToLesson(item)}
                    ><Text style={styles.input}>{item.title}</Text></Pressable>
                )
            }}

        />
    </View>

  )
}

export default Lessons

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fdf7fa' 
    },
    input: {
      fontSize: 24,
      padding: 20,
      textAlign: 'center',
      width: WindowWidth * 0.9,
      backgroundColor: '#57cc99',
      fontWeight: 'bold',
      color: '#fdf7fa',
      marginBottom: 8
    },
    border: {
      borderRadius: 30
    }
  })
