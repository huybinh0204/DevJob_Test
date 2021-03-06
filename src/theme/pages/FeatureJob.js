import React, {Component} from 'react';

//This is an example code for React Native Swipe Down  to Refresh ListView Using RefreshControl//
//import react in our code.
import {
    Image,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Text,
    View,
    Alert,
    RefreshControl,
} from 'react-native';
import {concat} from 'react-native-reanimated';
import {mini, small_bold} from '../../asset/styles/styleText';
//import all the components we are going to use.
export default class FeatureJob extends Component {
    constructor(props) {
        super(props);
        //True to show the loader
        this.state = {
            refreshing: true,
        };
        //Running the getData Service for the first time

        this.componentDidMount();
    }

    componentDidMount() {

        return fetch(
            'https://devjob.co/api/home?token=0F405C9DD1DE1021140B07B8CE534693',
        )
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    refreshing: false,
                    dataSource: responseJson.jobs_feature.map(e => {
                        responseJson.locations.forEach(item => {
                            if (e.location_id == item.id) {
                                e['location_name'] = item.name;
                            }

                        });
                        return e;
                    }),

                });


            })
            .catch(error => {
                console.error(error);
            });
    }

    ListViewItemSeparator = () => {
        return (
            //returning the listview item saparator view
            <View
                style={{
                    height: 0.2,
                    width: '90%',
                    backgroundColor: '#808080',
                }}
            />
        );
    };

    onRefresh() {
        //Clear old data of the list
        this.setState({dataSource: []});
        //Call the Service to get the latest data
        this.componentDidMount();
    }

    render() {
        if (this.state.refreshing) {
            return (
                //loading view while data is loading
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        return (
            //Returning the ListView

            <View style={styles.MainContainer}>

                <FlatList
                    data={this.state.dataSource}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    enableEmptySections={true}
                    renderItem={({item}) => (
                        <View
                            style={styles.rowViewContainer}
                            onPress={() => alert(item.id)}>
                            <Image style={styles.logoimage} source={{uri: item.logo}}></Image>

                            <View style={styles.body}>
                                <Text style={styles.title}>
                                    {item.title}
                                </Text>
                                <View style={styles.styleicon}>
                                    <Image source={require('../../asset/image/companyitem.png')}
                                           style={styles.imageitem}/>
                                    <Text style={styles.textname}>

                                        {item.name}
                                    </Text>
                                </View>
                                <View style={styles.styleicon}>
                                    <Image source={require('../../asset/image/location.png')} style={styles.imageitem}/>
                                    <Text>{item.location_name}
                                    </Text>

                                </View>

                                <View style={styles.styleicon}>
                                    {item.skills.map(e => <Text style={styles.skill} key={e.name}>{e.name}</Text>)}
                                </View>
                            </View>
                        </View>

                    )}

                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
    },
    rowViewContainer: {
        fontSize: 20,
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        marginBottom: 3,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoimage: {
        width: 100, height: 100, alignItems: 'center',
    },
    body: {
        flex: 1, justifyContent: 'center', marginLeft: '8%',
    },
    title: {
        fontSize: 16,
        ...small_bold,
    },
    styleicon: {
        marginTop: 6,
        flexDirection: 'row',
        alignItems: 'center',

    },
    imageitem: {
        width: 16,
        height: 16,
        padding: 8,
    },
    textname: {
        width: '88%',
        writingDirection: 'auto',
        ...mini,
    },
    skill: {
        width: '22%',
        writingDirection: 'auto',
        ...mini,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#3e79ff',
        textAlign: 'center',
        color: '#3e79ff',


    },
});

