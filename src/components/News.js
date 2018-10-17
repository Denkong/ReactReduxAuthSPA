import React, { Component } from 'react';
import {connect} from 'react-redux';
import { List, Layout } from 'antd';
import {getNews} from '../actions/newsAction';
import {userAuthentication} from '../actions/userAction'
const { Content } = Layout;
var listData=[];

class News extends Component {
  componentDidMount(){
    
    this.props.userAuthentication(); 
    
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('NEWS - shouldComponentUpdate');
   
    
    if (!nextProps.user.authentication) {
      console.log('redirect');
      
     this.props.history.push('/');
      return false;
    } else {
      if (nextProps.news.length===0) {
        this.props.getNews(); 
        return false;
       }
      else if (JSON.stringify(this.props.news)===JSON.stringify(nextProps.news) && listData.length!==0){ return false}
      else{
        console.log("Добавляем новости");
        nextProps.news.articles.forEach(data=>{
          listData.push({
            href: data.url,
            title: data.title,
            avatar: data.urlToImage,
            description: data.description,
            content: data.content,
          });
        })
        return true
      }
    }
    
    
    
  }
  render() {
    
      if (listData.length!==0) {
        return (
          <Content style={{ padding: '0 50px' }}>
            
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                // onChange: (page) => {
                //   console.log(page);
                // },
                pageSize: 3,
              }}
              dataSource={listData}
              footer={<div><b>Димитриев Денис</b> автор сайта</div>}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  extra={<img width={272} alt="logo" src={item.avatar} />}
                >
                  <List.Item.Meta
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </Content>
        )
      }else{
        return null
      }
    
    
  }
}

const mapStatetoProps=state=>({
  news:state.newsReducer.news,
  user:state.userReducer.user
})

export default connect(mapStatetoProps,{getNews,userAuthentication})(News) ;
