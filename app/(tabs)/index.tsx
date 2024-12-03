import { Image, StyleSheet, FlatList, TextInput, Button, View, ActivityIndicator, Text } from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';


interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
}



export default function HomeScreen() {

  const [character, setCharacter] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<string>('1');
  
  const fetchCharacter = async(pageNumber: string) => {
    try{
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${pageNumber}`);
      setCharacter(response.data.results);
    } catch(error){
      console.log("Erro ao buscar personagem!\nErro: " + error);

    } finally{
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchCharacter(page)
  }, [character])

  const renderCharacter = ({item}: {item: Character}) => (
    <View style={styles.card}>
      <Image source={{uri: item.image}}/>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </View>
  )

  if(loading){
    return(
      <View style={styles.loader}>
        <ActivityIndicator size={'large'} color={'#d3a7d21'}/>
      </View>
    )
  }
  

  return (
    <><View style={{flex: 1}}>
        <View>
          <Text>1/42</Text>
          <TextInput
            style={styles.input}
            value={page}
            onChangeText={(text) => setPage(text)}
            keyboardType='numeric'
            placeholder='DIgite o número da página'
          />
          <Button title='Buscar' onPress={() => fetchCharacter(page)}/>
        </View>
        <FlatList 
          data={character}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={renderCharacter} 
          contentContainerStyle={styles.list}
        />
    </View>

    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 0,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8
  }
});
