import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage';


import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../Services/api';

import styles from './styles';

function TeacherList(){
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    

    const[subject, setSubject] = useState('');
    const[week_day, setWeekDay] = useState('');      
    const[time, setTime] = useState('');

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if (response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) =>{
                    return teacher.id;
                })
    
                setFavorites(favoritedTeachersIds);
            }
        });
    }

   useEffect(() => {
    loadFavorites();
   }, []);



    function handleToggleFiltersVisible(){
        setIsFilterVisible(!isFilterVisible);
    }

    async function handleFiltersSubmit(){
        loadFavorites();

        const response = await api.get('classes', {
            params: {
              subject, week_day, time,
            },
          });
          setIsFilterVisible(false);
          setTeachers(response.data);
        }
    

    

    return (
        <View style={styles.container}>
            <PageHeader
             title="Proffys Disponíveis" 
             headerRight={
                <BorderlessButton onPress={handleToggleFiltersVisible}>
                    <Feather name="filter" size={25} color="#fff"/>
                </BorderlessButton>
                }>
                
                    { isFilterVisible && (
                        <View style={styles.serchForm}>
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
                                    <Text style={styles.label}>Dia da Semana</Text>
                                        <TextInput 
                                        style={styles.input}
                                        value={week_day}
                                        onChangeText={text => setWeekDay(text)}
                                        placeholderTextColor="#c1bccc"
                                        placeholder="Qual o Dia?" 
                                        />
                                    </View>
                                    <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Horário</Text>
                                        <TextInput       
                                        style={styles.input}
                                        value={time}
                                        onChangeText={text => setTime(text)}            
                                        placeholder="Qual Horário?"
                                        placeholderTextColor="#c1bccc"
                                        />    
                                </View>
                            
                                <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                                <Feather name="search" size={18} color="#fff"/>
                                </RectButton>

                            </View>
                    </View>
                )} 
            </PageHeader>
            
        <ScrollView 
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 22,
            }}
        >    
            {teachers.map((teacher:Teacher) => 
            <TeacherItem 
                key={teacher.id} 
                teacher={teacher}
                favorited={favorites.includes(teacher.id)}
            />)}
        </ScrollView>
        </View>
    );
  }

export default TeacherList;