import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, Switch, Image, ScrollView, StyleSheet, Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const posters = [
  { uri: 'https://a.ltrbxd.com/resized/film-poster/8/7/9/2/2/9/879229-perfect-days-0-1000-0-1500-crop.jpg?v=4ea80661fd' },
  { uri: 'https://a.ltrbxd.com/resized/film-poster/3/1/7/1/8/7/317187-a-bride-for-rip-van-winkle-0-1000-0-1500-crop.jpg?v=28ce59e5ae' },
  { uri: 'https://a.ltrbxd.com/resized/film-poster/1/7/4/9/2/8/174928-creep-0-1000-0-1500-crop.jpg?v=d01c2ba3a8' },
  { uri: 'https://a.ltrbxd.com/resized/film-poster/7/3/3/5/9/73359-amour-0-1000-0-1500-crop.jpg?v=2a2710b0aa' },
  { uri: 'https://a.ltrbxd.com/resized/sm/upload/eo/sj/w9/xl/taVFuUhUWoX9YE7bb2bWkSPjC9P-0-1000-0-1500-crop.jpg?v=94ae22e6f8' },
];

const classificacoes = [
  { key: 1, nome: 'Livre' },
  { key: 2, nome: '10 anos' },
  { key: 3, nome: '12 anos' },
  { key: 4, nome: '14 anos' },
  { key: 5, nome: '16 anos' },
  { key: 6, nome: '18 anos' },
];

const plataformas = [
  { key: 1, nome: 'Netflix' },
  { key: 2, nome: 'Amazon Prime Video' },
  { key: 3, nome: 'Globoplay' },
  { key: 4, nome: 'Disney+' },
  { key: 5, nome: 'Star+' },
  { key: 6, nome: 'Max' },
  { key: 7, nome: 'Outro' },
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      ano: '',
      diretor: '',
      genero: '',
      sinopse: '',
      classificacao: 'Livre',
      plataforma: '',
      nota: 5,
      duracao: 90,
      queroAssistir: false,
      favoritos: false,
      posterSelecionado: posters[0].uri,
    };
  }

  salvarFilme = () => {
    Alert.alert('Filme Salvo', `Filme "${this.state.titulo}" salvo com sucesso!`);
  };

  limparCampos = () => {
    this.setState({
      titulo: '',
      ano: '',
      diretor: '',
      genero: '',
      sinopse: '',
      classificacao: 'Livre',
      plataforma: '',
      nota: 5,
      duracao: 90,
      queroAssistir: false,
      favoritos: false,
      posterSelecionado: posters[0].uri,
    });
  };

  render() {
    const classificacoesOpcoes = classificacoes.map((item) => (
      <Picker.Item key={item.key} label={item.nome} value={item.nome} />
    ));

    const plataformaOpcoes = plataformas.map((item) => (
      <Picker.Item key={item.key} label={item.nome} value={item.nome} />
    ));

    const postersOpcoes = posters.map((item, index) => (
      <TouchableOpacity key={index} onPress={() => this.setState({ posterSelecionado: item.uri })}>
        <Image
          source={{ uri: item.uri }}
          style={[
            styles.imagem,
            this.state.posterSelecionado === item.uri && styles.imagemSelecionada,
          ]}
        />
      </TouchableOpacity>
    ));

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Cadastro de Filme</Text>

        <Text style={styles.texto}>Escolha o pôster do filme:</Text>
        <View style={styles.imagemContainer}>{postersOpcoes}</View>

        <TextInput
          style={styles.input}
          placeholder="Título"
          placeholderTextColor="#ccc"
          value={this.state.titulo}
          onChangeText={(text) => this.setState({ titulo: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Ano"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={this.state.ano}
          onChangeText={(text) => this.setState({ ano: text })}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Diretor"
          placeholderTextColor="#ccc"
          value={this.state.diretor}
          onChangeText={(text) => this.setState({ diretor: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Gênero"
          placeholderTextColor="#ccc"
          value={this.state.genero}
          onChangeText={(text) => this.setState({ genero: text })}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Sinopse"
          placeholderTextColor="#ccc"
          multiline
          value={this.state.sinopse}
          onChangeText={(text) => this.setState({ sinopse: text })}
        />

        <Text style={styles.texto}>Classificação:</Text>
        <Picker
          selectedValue={this.state.classificacao}
          onValueChange={(value) => this.setState({ classificacao: value })}
          style={styles.picker}
        >
          {classificacoesOpcoes}
        </Picker>

        <Text style={styles.texto}>Plataforma:</Text>
        <Picker
          selectedValue={this.state.plataforma}
          onValueChange={(value) => this.setState({ plataforma: value })}
          style={styles.picker}
        >
          {plataformaOpcoes}
        </Picker>

        <Text style={styles.texto}>Nota: {this.state.nota}</Text>
        <Slider
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={this.state.nota}
          onValueChange={(value) => this.setState({ nota: value })}
          minimumTrackTintColor="#405725"
          thumbTintColor="#405725"
        />

        <Text style={styles.texto}>Duração: {this.state.duracao} min</Text>
        <Slider
          minimumValue={30}
          maximumValue={500}
          step={10}
          value={this.state.duracao}
          onValueChange={(value) => this.setState({ duracao: value })}
          minimumTrackTintColor="#405725"
          thumbTintColor="#405725"
        />

        <View style={styles.switchContainer}>
          <Text style={styles.texto}>Adicionar a lista de Quero Assistir:</Text>
          <Switch
            value={this.state.queroAssistir}
            onValueChange={(value) => this.setState({ queroAssistir: value })}
            thumbColor={this.state.queroAssistir ? '#405725' : '#ccc'}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.texto}>Adicionar a lista de Favoritos:</Text>
          <Switch
            value={this.state.favoritos}
            onValueChange={(value) => this.setState({ favoritos: value })}
            thumbColor={this.state.favoritos ? '#405725' : '#ccc'}
          />
        </View>

        <View style={styles.botoes}>
          <Button title="Salvar Cadastro" onPress={this.salvarFilme} color="#405725" />
          <Button title="Limpar Cadastro" onPress={this.limparCampos} color="#888" />
        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#677B5B',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    fontFamily: 'NotoSerif_400Regular',
  },

  texto: {
    color: 'white',
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'NotoSerif_400Regular',
  },

  input: {
    backgroundColor: '#2F1D14',
    color: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    fontFamily: 'NotoSerif_400Regular',
  },

  picker: {
    backgroundColor: '#2F1D14',
    color: 'white',
    borderRadius: 8,
    fontFamily: 'NotoSerif_400Regular',
  },

  imagemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    justifyContent: 'center',
  },

  imagem: {
    width: 100,
    height: 150,
    margin: 5,
    borderRadius: 8,
    opacity: 0.6,
  },

  imagemSelecionada: {
    borderWidth: 2,
    borderColor: '#405725',
    opacity: 1,
  },

  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    fontFamily: 'NotoSerif_400Regular',
  },

  botoes: {
    marginTop: 20,
    gap: 10,
    fontFamily: 'NotoSerif_400Regular',
  },
});