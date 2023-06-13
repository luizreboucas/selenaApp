import react,{ useState } from 'react'
import { 
    View,
    TextInput,
    Pressable,
    Text,
    StyleSheet
} from 'react-native'
import axios from 'axios'
import { WindowHeight, WindowWidth } from '../../globals/Dimensions'



const Login = ({navigation}) => {

  const URI = 'https://myselena.org'
  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const getToken = async() => {
    try {
      
      const response = await axios.post(`${URI}/wp-json/learnpress/v1/token`, user)
      const token = response.data.token
      navigation.navigate('Courses', {token})
    } catch (error) {
      console.warn({message: 'validation error', error})
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.formContainer, styles.shadowProp, styles.elevation]}>
        <TextInput
            placeholder='User'
            value={user.username}
            onChangeText={(input) => setUser({...user, username: input})}
            style={styles.input}
            placeholderTextColor={'#fdf7fa'}
          />
          <TextInput
            placeholder='Password'
            value={user.password}
            onChangeText={(input) => setUser({...user, password: input})}
            style={styles.input}
            placeholderTextColor={'#fdf7fa'}
          />

          <Pressable 
            style={styles.submit}
            onPress={getToken}>
            <Text style={styles.btnText}>Enter</Text>
          </Pressable>

      </View>
    </View>
    
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdf7fa' 
  },
  formContainer: {
    
    borderRadius: 16,
    width: WindowWidth * 0.8,
    height: WindowHeight * 0.5,
    justifyContent: 'space-evenly',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
  input: {
    fontSize: 24,
    padding: 20,
    textAlign: 'center',
    width: "100%",
    backgroundColor: '#67aaf9',
    fontWeight: 'bold',
    color: '#fdf7fa'
  },
  submit: {
    padding: 20,
    width: "100%",
    backgroundColor: '#57cc99'
  },
  btnText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fdf7fa',
    fontWeight: 'bold'
  }

})
