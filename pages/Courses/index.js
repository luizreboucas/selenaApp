import axios from 'axios'
import React,{ useState, useEffect } from 'react'
import { View,Text, FlatList, Pressable, StyleSheet } from 'react-native'
import { WindowHeight, WindowWidth } from '../../globals/Dimensions'

const Courses = ({route, navigation}) => {
    const {token,URI,user} = route.params
    const [courses, setCourses] = useState({})
    const [page, setPage] = useState(1)
    useEffect(()=>{
      const getCourses = async() => {
        try {
          const coursesResponse = (await axios.get(`${URI}/wp-json/learnpress/v1/courses`,{
            page,
            headers:{
              Authorization: `Bearer ${token}`
            }
          })).data
          setCourses(coursesResponse)
          console.log(coursesResponse)
        } catch (error) {
          console.log(error)
        }
      }

      getCourses()
    },[])
  const getLessons = async(course) => {
    try {
      const id = course.id
      navigation.navigate('Lessons',{id,URI,token,user})
    } catch (error) {
      console.log(error)
    }
  }  
    
  return (
    <View style={styles.container}>
        <FlatList
        
          data={courses}
          renderItem={({item}) => {
            return(
              <Pressable onPress={() =>getLessons(item)} style={styles.border}>
                  <Text style={styles.input}>{item.name}</Text>
              </Pressable>
            )
          }}
          keyExtractor={(item) => item.id}
        />
    </View>
  )
}

export default Courses

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
    backgroundColor: '#67aaf9',
    fontWeight: 'bold',
    color: '#fdf7fa',
    marginBottom: 8
  },
  border: {
    borderRadius: 30
  }
})
