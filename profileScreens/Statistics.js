import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../appSettings';
const fontFamily = settings.fontFamily
const width = Dimensions.get('screen').width
const height = Dimensions.get("window").height
const screenHeight = Dimensions.get("screen").height
const lightTheme = settings.lightTheme
const darkTheme = settings.darkTheme
import { VictoryBar, VictoryChart, VictoryTheme, VictoryZoomContainer} from "victory-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
const data = [
    { subject: "Tamil", marks: 80,fill:"red"},
    { subject: "English", marks: 90,fill:'orange'},
    { subject: "Maths", marks: 10, fill: 'green' },
    { subject: "Science", marks: 50, fill: 'gray' },
    { subject: "Social", marks: 50, fill: '#fafa' },
    { subject: "Geology", marks: 50, fill: '#ede' },
    { subject: "chemistry", marks: 80, fill: "#F4F" },
    { subject: "bio", marks: 90, fill: "#F4F" },
];
const data2 = {
    labels: ["January", "February", "March", "April", "May", "June","july","aug","sep","oct","nov","dec","iii"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43,90,65,78,90,20,70,90]
        }
    ]
};
const chartConfig = {
    backgroundGradientFrom: "#000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#f1f1ff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    
};
class Statistics extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let theme;
        if (this.props.theme == "dark") {
            theme = darkTheme
        } else {
            theme = lightTheme
        }
        return (
            <>
                <StatusBar backgroundColor={theme.backgroundColor} barStyle={this.props.theme == "dark" ? "light-content" : "dark-content"} />
                <SafeAreaView style={[styles.topSafeArea, { backgroundColor: theme.backgroundColor }]} />
                <SafeAreaView style={[styles.bottomSafeArea, { backgroundColor: theme.backgroundColor }]}>
                    <View style={{ backgroundColor: theme.backgroundColor,alignItems:"center",justifyContent:"center",flex:1}}>
                        {/* <ScrollView 
                         horizontal ={true}
                        >
                            <VictoryChart

                                width={width*1}
                                theme={VictoryTheme.material}
                                height={height * 0.6}
                                domainPadding={40}
                                domainPadding={{ x: 0}}
                            >

                                <VictoryBar
                                    style={{
                                        data: {
                                            fill: ({ datum }) => datum.fill,
                                        }
                                    }}
                                    barWidth={({ index }) => index * 2 + 8}
                                    labels={({ datum }) => `${datum.marks}`}
                                    data={data}
                                    x="subject"
                                    y="marks"
                                    
                                    animate={{
                                        duration: 2000,
                                        onLoad: { duration: 1000 }
                                    }}
                                />
                            </VictoryChart>
                        </ScrollView> */}
                    
                            <ScrollView 
                             contentContainerStyle={{alignItems:'center',justifyContent:"center"}}
                             horizontal={true}
                       
                            >
                            <BarChart
                                
                                showValuesOnTopOfBars={true}
                                style={{}}
                                data={data2}
                                width={width*1.5}
                                chartConfig={{
                                    backgroundColor: "#000000",
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: { borderRadius: 0, borderWidth: 1, borderColor: '#fff' },
                                    propsForDots: { r: "2", strokeWidth: "2", stroke:"#fff", },
                                    propsForBackgroundLines: { color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, },
                                    fillShadowGradient: "#0090F8",
                                    fillShadowGradientOpacity: 1,
                                }}
                                height={height * 0.6}
                                
                               
                                verticalLabelRotation={90}
                            />
                            </ScrollView>
                        
                
                     
                    </View>
                </SafeAreaView>
            </>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    },
    topSafeArea: {
        flex: 0,
    },
    bottomSafeArea: {
        flex: 1,

    },
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
export default connect(mapStateToProps, { selectTheme })(Statistics)