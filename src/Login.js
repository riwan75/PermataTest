import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon, Input, Dialog} from 'react-native-elements';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState({
    username: null,
    password: null,
  });
  const [valid, setValid] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  // VALIDATION //
  useEffect(() => {
    if (errMessage.username === '' && errMessage.password === '') {
      setValid(true);
      return;
    }
    setValid(false);
    return;
  }, [errMessage]);

  const handleForm = (key, value) => {
    if (key === 'username') {
      setUsername(value.replace(/\s/g, ''));
      if (value.length < 6) {
        setErrMessage(prev => ({
          ...prev,
          username: 'Your Username Is Not Valid',
        }));
        return;
      }
      setErrMessage(prev => ({...prev, username: ''}));
      return;
    } else if (key === 'password') {
      setPassword(value.replace(/\s/g, ''));
      if (value.length < 6) {
        setErrMessage(prev => ({
          ...prev,
          password: 'Minimum 6 Characters Required',
        }));
        return;
      }
      setErrMessage(prev => ({...prev, password: ''}));
      return;
    }
  };

  //Fetching //
  const handleLogin = () => {
    setisLoading(true);
    const body = {
      username: username,
      password: password,
    };
    axios({
      method: 'post',
      url: 'https://tasklogin.herokuapp.com/api/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    })
      .then(async response => {
        await AsyncStorage.setItem('access_token', response.data.access_token);
        setisLoading(false);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
        setisLoading(false);
        alert(error);
      });
  };

  // Handling Back Button //
  useEffect(() => {
    const backButtonAction = () => {
      Alert.alert('Alert', 'Exit App', [
        {text: 'Cancel', onPress: () => null, style: 'cancel'},
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const handlerBackButton = BackHandler.addEventListener(
      'hardwareBackPress',
      backButtonAction,
    );
    return () => handlerBackButton.remove();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Dialog isVisible={isLoading}>
          <Dialog.Loading />
        </Dialog>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
            <View style={styles.logoBox}>
              <Icon
                color="#fff"
                type="font-awesome"
                name="keyboard-o"
                size={50}
              />
            </View>
            <Text style={styles.loginTitleText}>Login</Text>
            <View style={styles.hr}></View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Username</Text>
              <Input
                value={username}
                onChangeText={event => handleForm('username', event)}
                errorMessage={errMessage.username}
                autoCapitalize={'none'}
                style={styles.input}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Password</Text>
              <Input
                value={password}
                onChangeText={event => handleForm('password', event)}
                errorMessage={errMessage.password}
                style={styles.input}
                autoCapitalize={'none'}
                secureTextEntry={true}
                textContentType="password"
              />
            </View>
            <TouchableOpacity
              onPress={handleLogin}
              disabled={!valid}
              style={valid ? styles.loginButton : styles.loginButtonDisabled}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.registerText}>
                Don't have an account? Register Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#ff6b81',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#ff7979',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
  centerizedView: {
    width: '100%',
    top: '15%',
  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: '#eb4d4b',
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#ff4757',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonDisabled: {
    backgroundColor: '#b0bec5',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
});

export default LoginScreen;
