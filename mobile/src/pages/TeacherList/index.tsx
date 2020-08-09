import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput, AsyncStorage } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

import api from '../../services/api'

import styles from './styles'

function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [favorites, setFavorites] = useState<number[]>([])

  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  const weekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ]

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoriteTeachers = JSON.parse(response)

        setFavorites(favoriteTeachers.map((teacher: Teacher) => teacher.id))
      }
    })
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible)
  }

  function handleFiltersSubmit() {
    loadFavorites()

    api.get('classes', {
      params: {
        subject,
        week_day: weekDays.indexOf(week_day),
        time,
      }
    }).then(response => {
      setIsFiltersVisible(false)
      setTeachers(response.data)
    })
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Qual a hora?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        { 
          teachers.length ? (
            teachers.map((teacher: Teacher) => (
              <TeacherItem
                key={teacher.id}
                teacher={teacher}
                favorite={favorites.includes(teacher.id)}
              />
            ))
          ) : (
            <Text style={styles.teacherListEmpty}>
              Nenhum proffy disponível.
            </Text>
          )
        }
      </ScrollView>
    </View>
  )
}

export default TeacherList
