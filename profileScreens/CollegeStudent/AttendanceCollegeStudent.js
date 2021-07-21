import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, StatusBar, ScrollView, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { selectTheme } from '../../actions';
import settings from '../../appSettings';
import Header from '../../components/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { Ionicons, Entypo, AntDesign, Feather, MaterialCommunityIcons, FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
const fontFamily = settings.fontFamily
const width = Dimensions.get('screen').width
const height = Dimensions.get("window").height
const screenHeight = Dimensions.get("screen").height
const lightTheme = settings.lightTheme
const darkTheme = settings.darkTheme
const data =[
    {
        subject:"HINDI",
        facultyHandled:{
            name:"Mr.kamaraj",
            id:"A906"
        }
    },
    {
        subject: "ENGLISH",
        facultyHandled: {
            name: "Mr.kamaraj",
            id: "A906"
        }
    },
    {
        subject: "MATHS",
        facultyHandled: {
            name: "Mr.kamaraj",
            id: "A906"
        }
    },
    {
        subject: "SCIENCE",
        facultyHandled: {
            name: "Mr.kamaraj",
            id: "A906"
        }
    },
    {
        subject: "SOCIAL",
        facultyHandled: {
            name: "Mr.kamaraj",
            id: "A906"
        }
    },
]
const SEMS = [
    { label: 'SEM I', value: 'SEM I' },
    { label: 'SEM II', value: 'SEM II' },
    { label: 'SEM III', value: 'SEM III' },
    { label: 'SEM IV', value: 'SEM IV' },
    { label: 'SEM V', value: 'SEM V' },
    { label: 'SEM VI', value: 'SEM VI' },
    { label: 'SEM VII', value: 'SEM VII' },
    { label: 'SEM VIII', value: 'SEM VIII' },
]
const months = ["January", "February", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const customStylesPresent = {
    container: {
        backgroundColor: 'green'
    },
    text: {
        color: '#fff',
    
        fontFamily,
    }
}
const customStylesAbsent = {
    container: {
        backgroundColor: 'red'
    },
    text: {
        color: '#fff',
        
        fontFamily,
    }
}
const customStylesPartial ={
    container: {
        backgroundColor: 'orange'
    },
    text: {
        fontFamily,
        color: '#fff',
     
    }
}
const customStylesHoliday = {
    container: {
        backgroundColor: '#333333'
    },
    text: {
        fontFamily,
        color: '#fff',

    }
}
const presentDates ={
    '2021-07-28': {
        customStyles: customStylesPresent
    },
    '2021-07-29': {
        customStyles: customStylesPresent

    },
    '2021-07-22': {
        customStyles: customStylesPresent
    },
    '2021-07-23': {
        customStyles: customStylesPresent
    },
    '2021-07-24': {
        customStyles: customStylesPresent
    },
    '2021-07-25': {
        customStyles: customStylesPresent
    }
}
const absentDates = {
    '2021-07-20': {
        customStyles: customStylesAbsent
    },
    '2021-07-19': {
        customStyles: customStylesAbsent

    },
    '2021-07-18': {
        customStyles: customStylesAbsent
    }
}
const partailDates = {
    '2021-07-01': {
        customStyles: customStylesPartial
    },
    '2021-07-02': {
        customStyles: customStylesPartial

    },
    '2021-07-03': {
        customStyles: customStylesPartial
    }
}
const holidayDates = {
    '2021-07-04': {
        customStyles: customStylesHoliday
    },
    '2021-07-05': {
        customStyles: customStylesHoliday

    },
    '2021-07-06': {
        customStyles: customStylesHoliday
    }
}
const MarkedDates = {
    ...presentDates,
    ...absentDates,
    ...partailDates,
    ...holidayDates
}
class AttendanceCollegeStudent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            SEMS,
            value:"SEM I",
            currentMonth:null,
            selectedDate:null,
            showModal:false,
        };
    }
    setOpen = (open) => {
        this.setState({
            open
        });
    }

    setValue = (callback) => {
        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    setItems = (callback) => {
        this.setState(state => ({
            items: callback(state.items)
        }));
    }
    renderArrow = (direction,theme) =>{
      if(direction=="left"){
          return(
              <MaterialIcons name="keyboard-arrow-left" size={24} color={theme.TextColor} />
          )
      }
        return (
            <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.TextColor}  />
        )
    }
    renderDateHeader = (date,theme)=>{
    
        return(
            <View>
                <Text style={[styles.text, { color: theme.TextColor }]}>{this.state.currentMonth || `${months[date.getMonth()]} , ${date.getFullYear()}`}</Text>
            </View>
        )
   
    }
    onMonthChange =(month)=>{
       
        this.setState({ currentMonth:`${months[month.month-1]} , ${month.year}` })
    }
    marksHeader = (theme)=>{
        return(
            <View style={{ flexDirection: "row", flex: 1 }}>
                <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color:theme.TextColor ,fontWeight:"bold"}]}>Subject</Text>
                </View>
                <View style={{ flex: 0.4, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: theme.TextColor, fontWeight: "bold"}]}>Classes Attended</Text>
                </View>
                <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: theme.TextColor, fontWeight: "bold"}]}>Attendance</Text>
                </View>
            </View>
        )
  
    }
    bottomModal = (theme) => {
        return (
            <Modal
                swipeThreshold={100}
                onSwipeComplete={() => { this.setState({ showModal: false }) }}
                swipeDirection="down"
                animationOutTiming={50}
                animationOut={"slideOutDown"}
                onBackdropPress={() => { this.setState({ showModal: false }) }}
                style={{ alignItems: "flex-end", marginHorizontal: 0, flexDirection: "row", marginVertical: 0 }}
                statusBarTranslucent={true}
                deviceHeight={screenHeight}
                isVisible={this.state.showModal}
            >
                <View style={{ height: height * 0.5, backgroundColor: theme.backgroundColor, width, elevation: 5, borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>
                    <View style={{ height: 5, width: width * 0.1, alignSelf: "center", backgroundColor: "gray", marginVertical: 10, borderRadius: 5 }}>

                    </View>
                     <FlatList 
                       ListHeaderComponent ={this.marksHeader(theme)}
                       data={data}
                       keyExtractor ={(item,index)=>index.toString()}
                       renderItem ={({item,index})=>{
                           return(
                               <View style={{ flexDirection: "row", flex: 1 ,marginTop:10}}>
                                   <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                                       <Text style={[styles.text, { color: theme.TextColor }]}>{item.subject}</Text>
                                   </View>
                                   <View style={{ flex: 0.4, alignItems: "center", justifyContent: "center" }}>
                                       <Text style={[styles.text, { color: theme.TextColor }]}>25/100</Text>
                                   </View>
                                   <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                                       <Text style={[styles.text, { color: theme.TextColor }]}>50%</Text>
                                   </View>
                               </View>
                           )
                       }}
                     
                     />

                </View>
            </Modal>
        )

    }
    render() {
        let theme;
        if (this.props.theme == "dark") {
            theme = darkTheme
        } else {
            theme = lightTheme
        }
        const { open, value, SEMS } = this.state;
        return (
            <>
                <StatusBar backgroundColor={theme.backgroundColor} barStyle={this.props.theme == "dark" ? "light-content" : "dark-content"} />
                <SafeAreaView style={[styles.topSafeArea, { backgroundColor: theme.backgroundColor }]} />
                <SafeAreaView style={[styles.bottomSafeArea, { backgroundColor: theme.backgroundColor }]}>

                    {/* HEADERS */}

                    <View style={[styles.elevation, { height: height * 0.08, backgroundColor: theme.backgroundColor, flexDirection: "row" }]}>
                        <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Ionicons name="arrow-back-outline" size={24} color={theme.TextColor} />
                        </TouchableOpacity>
                        <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text, { color: theme.TextColor, fontSize: 20 }]}>ATTENDANCE</Text>
                        </View>
                        <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
                          onPress={()=>{this.setState({showModal:true})}}
                        >
                            <Octicons name="three-bars" size={20} color={theme.TextColor} />
                        </TouchableOpacity>
                    </View>
                                                {/* CONTENTS */}

                                           

                    <ScrollView 
                     showsVerticalScrollIndicator={false}
                    style={{  backgroundColor: theme.backgroundColor ,marginTop:height*0.1}}>
                                      {/* Toaday */}

                            <View style={{marginVertical:10,alignItems:'center',justifyContent:'center'}}>
                                <Text style={[styles.text,{color:theme.TextColor,fontSize:22}]}>{`Today , ${moment(new Date()).format('LL')}`}</Text>
                            </View>
                                           {/* CALENDER */}
                        <Calendar
                            // Initially visible month. Default = Date()
                            // current={'2012-03-01'}
                            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                            
                            minDate={'2016-05-10'}
                            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                            maxDate={'2045-05-30'}
                            // Handler which gets executed on day press. Default = undefined
                            onDayPress={(day) => {this.setState({selectedDate:day})}}
                            // Handler which gets executed on day long press. Default = undefined
                            onDayLongPress={(day) => { console.log('selected day', day) }}
                            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                            monthFormat={'yyyy MM'}
                            // Handler which gets executed when visible month changes in calendar. Default = undefined
                            onMonthChange={(month) => { this.onMonthChange(month) }}
                            // Hide month navigation arrows. Default = false
                            // hideArrows={false}
                            // Replace default arrows with custom ones (direction can be 'left' or 'right')
                            renderArrow={(direction) => (this.renderArrow(direction,theme))}
                            // Do not show days of other months in month page. Default = false
                            hideExtraDays={true}
                            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                            // day from another month that is visible in calendar page. Default = false
                            disableMonthChange={true}
                            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                            firstDay={1}
                            // Hide day names. Default = false
                            hideDayNames={false}
                            // Show week numbers to the left. Default = false
                            showWeekNumbers={true}
                            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                            onPressArrowLeft={subtractMonth => subtractMonth()}
                            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                            onPressArrowRight={addMonth => addMonth()}
                            // Disable left arrow. Default = false
                            disableArrowLeft={false}
                            // Disable right arrow. Default = false
                            disableArrowRight={false}
                            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                            disableAllTouchEventsForDisabledDays={true}
                            // Replace default month and year title with custom one. the function receive a date as parameter
                            renderHeader={(date) =>{
                               return this.renderDateHeader(date,theme)
                            } }
                            // Enable the option to swipe between months. Default = false
                            enableSwipeMonths={true}
                            markingType={'custom'}
                            markedDates={MarkedDates}
                         
                            theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: theme.backgroundColor,
                                textSectionTitleColor:theme.TextColor,
                                textSectionTitleDisabledColor: '#d9e1e8',
                                selectedDayBackgroundColor: '#00adf5',
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: '#00adf5',
                                dayTextColor: '#2d4150',
                                textDisabledColor: '#d9e1e8',
                                dotColor: '#00adf5',
                                selectedDotColor: '#ffffff',
                                arrowColor: 'orange',
                                disabledArrowColor: '#d9e1e8',
                                monthTextColor: 'blue',
                                indicatorColor: 'blue',
                                textDayFontFamily:fontFamily,
                                textMonthFontFamily: fontFamily,
                                textDayHeaderFontFamily: fontFamily,
                                textDayFontWeight: '300',
                                textMonthFontWeight: 'bold',
                                textDayHeaderFontWeight: '300',
                                textDayFontSize: 16,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 16
                            }}
                         
                        />
                        {/* COLOR DIFFERENTIAN */}
                        <View style={{marginVertical:20,alignItems:"center",justifyContent:"center"}}>
                            <View style={{ flexDirection: "row" ,}}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ height: 25, width: 25, backgroundColor: "green" }}>
                                    </View>
                                    <View style={{alignItems:"center",justifyContent:"center",marginLeft:10}}>
                                        <Text style={[styles.text, { color: theme.TextColor }]}>PRESENT</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row",marginLeft:20 }}>
                                    <View style={{ height: 25, width: 25, backgroundColor: "red" }}>
                                    </View>
                                    <View style ={{alignItems:"center",justifyContent:"center",marginLeft:10}}>
                                        <Text style={[styles.text, { color: theme.TextColor }]}>ABSENT</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginTop:20}}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ height: 25, width: 25, backgroundColor: "#333333" }}>
                                    </View>
                                    <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 10 }}>
                                        <Text style={[styles.text, { color: theme.TextColor }]}>HOLIDAY</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginLeft: 20 }}>
                                    <View style={{ height: 25, width: 25, backgroundColor: "orange" }}>
                                    </View>
                                    <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 10 }}>
                                        <Text style={[styles.text, { color: theme.TextColor }]}>PARTIAL</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                                                    {/* DAY DETAILS */}
                            <View style={{alignItems:"center",justifyContent:"center",marginVertical:20,paddingHorizontal:5}}>
                                     <Text style={[styles.text, { color: theme.TextColor, fontSize: 20 }]}>{moment(this.state?.selectedDate?.timestamp).format('dddd')} , {this.state?.selectedDate?.dateString}</Text>
                            </View>
                            <View style={{flexDirection:"row",flex:1}}>
                                    <View style={{flex:0.3,alignItems:"center",justifyContent:"center"}}>
                                <Text style={[styles.text, { color: theme.TextColor, fontWeight: "bold", fontSize: 16}]}>PERIOD</Text>
                                    </View>
                                    <View style={{flex:0.3,alignItems:"center",justifyContent:"center"}}>
                                <Text style={[styles.text, { color: theme.TextColor, fontWeight: "bold", fontSize: 16}]}>SUBJECT</Text>
                                    </View>
                                    <View style={{flex:0.4,alignItems:"center",justifyContent:"center"}}>
                                        <Text style={[styles.text, { color: theme.TextColor,fontWeight:"bold" ,fontSize:14}]}>FACULTY HANDLED</Text>
                                    </View>
                            </View>
                            {
                                data.map((item,index)=>{
                                        return(
                                            <View style={{ flexDirection: "row", flex: 1, paddingVertical: 20, borderColor: theme.borderColor,borderBottomWidth:1,marginHorizontal:10}}>
                                                <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                                                    <Text style={[styles.text, { color: "red",   }]}>{index+1}</Text>
                                                </View>
                                                <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                                                    <Text style={[styles.text, { color:"red",  }]}>{item.subject}</Text>
                                                </View>
                                                <View style={{ flex: 0.4 ,alignItems:"center",justifyContent:"center"}}>
                                                    <Text style={[styles.text, {color: "red", }]}>{item.facultyHandled.name}</Text>
                                                    <Text style={[styles.text, { color: "red", }]}>{item.facultyHandled.id}</Text>
                                                </View>
                                            </View>
                                        )
                                })
                            }
                    </ScrollView>
          
                                         {/* FILTER */}
                    <View style={{ position: "absolute", top: height * 0.1, right: 20 }}>
                        <DropDownPicker
                            style={{ width: width * 0.4, height: 40 }}
                            open={open}
                            value={value}
                            items={SEMS}
                            setOpen={this.setOpen}
                            setValue={this.setValue}
                            setItems={this.setItems}

                        />
                    </View>
                  {this.bottomModal(theme)}
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
    modalView1: {
        backgroundColor: '#fff',
        marginHorizontal: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        justifyContent: 'flex-end',
        width: width
    },
    elevation: {
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 60,
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
const mapActionToProps = {

    selectTheme

}
export default connect(mapStateToProps, mapActionToProps)(AttendanceCollegeStudent)