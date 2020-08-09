import React from 'react'
import { View, ImageBackground, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import giveClassesBgImg from '../../assets/images/give-classes-background.png'

import styles from './styles'

const GiveClasses: React.FC = () => {
  const { goBack } = useNavigation()

  return (
    <View style={styles.container}>
      <ImageBackground
        source={giveClassesBgImg}
        style={styles.content}
        resizeMode="contain"
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>

        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor(a) na nossa
          plataforma web.
        </Text>
      </ImageBackground>

      <RectButton onPress={() => goBack()} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  )
}

export default GiveClasses
