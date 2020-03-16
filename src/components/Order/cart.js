/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {AsyncStorage, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Badge,
  Icon,
  View,
  Item,
  Input,
} from 'native-base';

import {Col, Row, Grid} from 'react-native-easy-grid';

import {FlatList} from 'react-native-gesture-handler';
import {manipulateItem, deleteCart} from '../redux/actions/cart';
class Cart extends React.Component {

  addQuantity = data => {
    if (data.quantity < data.stock) {
      data.quantity += 1;
      this.props.dispatch(manipulateItem(data));
    }
  };
  removeQuantity = data => {
    if (data.quantity > 1) {
      data.quantity -= 1;
      this.props.dispatch(manipulateItem(data));
    }
  };
  deleteCart = id => {
    this.props.dispatch(deleteCart(id));
  };

  render() {
    const ViewCart = () => {
      if (this.props.productsInCart.length < 1) {
        return (
          <Content>
            {/* <Image source={Bg} style={{flex: 1, width: 360}} /> */}
          </Content>
        );
      } else {
        return (
          <Content>
            <FlatList
              data={this.props.productsInCart}
              renderItem={({item}) => (
                <Card style={{marginBottom: -2, marginTop: -2}}>
                  <CardItem>
                    <Left>
                      <Thumbnail
                        source={{uri: item.image, width: 200, height: 200}}
                      />
                      <Body>
                        <Text>{item.name}</Text>
                        <Text note>Rp. {item.price}</Text>
                      </Body>
                    </Left>
                    <Right>
                      <View style={{flexDirection: 'row'}}>
                        <Icon
                          name="trash"
                          style={{
                            color: 'grey',
                            marginRight: 20,
                            marginTop: 5,
                          }}
                          onPress={() => this.deleteCart(item.productId)}
                        />
                        <Button
                          small
                        
                          info
                          onPress={() => this.removeQuantity(item)}>
                          <Text>-</Text>
                        </Button>
                        <Button transparent small>
                          <Text
                            style={{
                              borderBottomColor: 'black',
                              paddingHorizontal: 10,
                            }}>
                            {item.quantity}
                          </Text>
                        </Button>
                        <Button
                          small
                      
                          info
                          onPress={() => this.addQuantity(item)}>
                          <Text>+</Text>
                        </Button>
                      </View>
                    </Right>
                  </CardItem>
                </Card>
              )}
              keyExtractor={item => item.productId.toString()}
            />
            <Button small info
              onPress={() =>
                this.props.navigation.navigate('Checkout', {
                  products: this.props.productsInCart,
                })
              }
              info
              style={{
                justifyContent: 'center',
                marginHorizontal: 18,
              }}>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                Amount
              </Text>
            </Button>
          </Content>
        );
      }
    };
    return (
      <Container>
        <Grid>
          <Col>
            <ViewCart />
          
            
          <View
            style={{
              height: 54,
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
          
          <Button
              vertical
              info
              onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name="apps" />
              <Text>Home</Text>
            </Button>

            <Button
              vertical
              info
              onPress={() => this.props.navigation.navigate('Product')}>
              <Icon name="folder" />
              <Text>Products</Text>
            </Button>

            <Button
              vertical
              info
              onPress={() => this.props.navigation.navigate('Category')}>
              <Icon name="document" />
              <Text>Category</Text>
            </Button>
                  
            <Button active badge vertical info
              onPress={() => this.props.navigation.navigate('Cart')}
              >
                 <Badge >
                <Text>{this.props.totalPurchase}</Text>
              </Badge>
                <Icon active name="cart" style={{marginTop: -26}} />
              <Text>Cart</Text>             
            </Button>
          </View>
          
          </Col>
        </Grid>
      </Container>
    );
  }
}

const mapCart = state => {
  return {
    productsInCart: state.cart.cart,
    totalPurchase: state.cart.totalPurchase,
  };
};

export default connect(mapCart)(Cart);
