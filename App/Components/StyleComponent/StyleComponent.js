import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Image,
    View,
    Text,
    AsyncStorage,
    StyleSheet,
    ImageBackground,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    Modal,
    FlatList
}  from 'react-native';
import {
    clearResponse
} from "./StyleAction";
import {
    getStyleList
} from "../../Action/ActionCreators";
const window = Dimensions.get('window');
import Header from '../Common/Header';
import style from '../SizeAndProportionComponent/SizeAndProportionStyle'
import Colors from '../../Constants/Colors';
import Strings from '../../Constants/Strings';

class StyleComponent extends Component{
    constructor(){
        super();
        this.state ={
            userInfo:{},
            styleRes:{}
        }
    }

    componentWillMount(){
       this.getUserData();
       
    }

    getUserData(){
        AsyncStorage.getItem("UserInfo").then((value) => {
            console.log(value);
    
          if (value) {
              var userData = JSON.parse(value);
              this.setState({userInfo:userData});
              this.getStyleListChild();
          }
      }).done();
    }

    getStyleListChild(){
        postData = {
                 userId:this.state.userInfo._id,
                 kid_no:0
        }
        this.props.getStyleList(postData)
    }

    _renderItem(item,index){
        
        return (
            <TouchableWithoutFeedback onPress={() => this.selectSize(item,index)} >
            <View style={[style.itemContainer,(this.state.onPressedBrand && this.state.selectedIndexes.indexOf(index)!=-1)?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>
            <Image style={style.image} source={{uri:BASE_URL + item.image_path}} />
            </View>
            </TouchableWithoutFeedback>
        )
    }

    componentDidUpdate(){
        if(this.props.styleReducer.styleListRes!=''){
            if(this.props.styleReducer.styleListRes.status==="success"){
                this.setState({styleRes:this.props.styleReducer.styleListRes.data})
            }
            this.props.clearResponse()
        }
    }

    selectSize(item, index){
     
    }

    render(){
        
        
        return(
            <View style={style.mainContainer}>
            <Header headerText={Strings.STYLE_INFORMATION} screenCount="03" />
            <View style={style.subContainer}>
            <Text style={style.titleStyle}>{Strings.STYLE_INFO_TITLE}</Text>
            </View>    
            <View style={{flex:0.7}}>
            {
                getStyleImages()
            }
             <FlatList
                style ={{marginTop:20}} 
                data={this.props.styleReducer.styleListRes.data.info}
                numColumns={3}
                contentContainerStyle={style.list}
                renderItem={({item,index}) => this._renderItem(item,index)}/>
            </View>
            </View>    

        );
    }

}

function mapStateToProps(state) {
    console.log('mapStateToProps= ', JSON.stringify(state));
    return {
        styleReducer: state.styleReducer
    }
}


export default connect(
    mapStateToProps,
    {
    getStyleList,
    clearResponse,
    }

)(StyleComponent)