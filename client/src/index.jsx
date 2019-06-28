import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    $.get('/similaritems/46', items => {
      this.setState({
        isLoaded: true,
        items: items.items
      });
    });
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div id="comparisonWidget_feature_div">
          <hr />
          <h2 className="a-color-state">Compare with similar items</h2>
          <br />
          <div className="a-tab-container">
            {/*<h3>Similar Items</h3> another stretch potential */}
            <div className="a-box-inner">
              <table className="a-bordered a-horizontal-stripes a-spacing-none a-size-base comparison_table">
                <tbody>

                  <tr className="comparison_table_image_row">
                    <th className="min-width-120">&nbsp; </th>
                    {items.map(item => (
                      <th id={'itemBox-' + items.indexOf(item)} key={'itemBox-' + item._id}>
                        <div className="sim-link">
                          <img src={item.imageSrc} />
                          <div id={'itemTitle-' + items.indexOf(item)} className="comparison_title">
                            {item.product}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>

                  <tr className="comparison_add_to_cart_buttons">
                    <th className="min-width-120">&nbsp; </th>
                    {items.map(item => (
                      <td id={'itemButton-' + items.indexOf(item)} key={'itemButton-' + item._id}>
                        <button>Add to Cart</button>
                      </td>
                    ))}
                  </tr>

                  <tr id="comparison_customer_rating_row">
                    <th className="comparison_attribute_name_column comparison_table_first_col" role="rowheader">
                      Customer Rating
                    </th>
                    {items.map(item => (
                      <td id={'itemRatings-' + items.indexOf(item)} key={'itemRatings-' + item._id}>
                        <i className={'a-icon a-icon-star a-star-' + item.stars + ' a-spacing-none'}><span className="a-icon-alt">{item.stars + ' out of 5 stars '}</span><span className="reviews blue">{'(' + item.reviews + ')'}</span></i>
                      </td>
                    ))}
                  </tr>

                  <tr id="comparison_price_row">
                    <th className="comparison_attribute_name_column comparison_table_first_col" role="rowheader">
                      Price
                    </th>
                    {items.map(item => (
                      <td id={'itemPrice-' + items.indexOf(item)} key={'itemPrice-' + item._id}>
                        <span className="a-price a-price-symbol">$</span><span className="a-price-whole">{item.price}</span><span className="a-price-fraction">99</span>
                      </td>
                    ))}
                  </tr>

                  <tr id="comparison_shipping_info_row">
                    <th className="comparison_attribute_name_column comparison_table_first_col" role="rowheader">
                      Shipping
                    </th>
                    {items.map(item => (
                      <td id={'itemShipping-' + items.indexOf(item)} key={'itemShipping-' + item._id}>
                        {/* item.shipping */}FREE Shipping on orders over $25
                      </td>
                    ))}
                  </tr>

                  <tr id="comparison_sold_by_row">
                    <th className="comparison_attribute_name_column comparison_table_first_col" role="rowheader">
                      Sold By
                    </th>
                    {items.map(item => (
                      <td id={'itemSeller-' + items.indexOf(item)} key={'itemSeller-' + item._id}>
                        <span className="blue">{item.seller}</span>
                      </td>
                    ))}
                  </tr>

                  <tr id="camera_description_row">
                    <th className="a-span3 comparison_attribute_name_column comparison_table_first_col" role="rowheader">
                      Camera Description
                    </th>
                    {items.map(item => (
                      <td id={'cameraDescription-' + items.indexOf(item)} key={'cameraDescription-' + item._id}>
                        {item.cameraDescription}
                      </td>
                    ))}
                  </tr>

                  <tr id="screen_size_row">
                    <th className="a-span3 comparison_attribute_name_column comparison_table_first_col" role="rowheader">
                      Screen Size
                    </th>
                    {items.map(item => (
                      <td id={'screenSize-' + items.indexOf(item)} key={'screenSize-' + item._id}>
                        {item.screenSize}
                      </td>
                    ))}
                  </tr>

                  <tr id="item_dimensions_row">
                    <th className="a-span3 comparison_attribute_name_column comparison_table_first_col" role="rowheader">
                      Item Dimensions
                    </th>
                    {items.map(item => (
                      <td id={'dimensions-' + items.indexOf(item)} key={'dimensions-' + item._id}>
                        {item.dimensions}
                      </td>
                    ))}
                  </tr>

                  <tr id="item_weight_row">
                    <th className="a-span3 comparison_attribute_name_column comparison_table_first_col" role="rowheader">
                      Item Weight
                    </th>
                    {items.map(item => (
                      <td id={'weight-' + items.indexOf(item)} key={'weight-' + item._id}>
                        {item.weight}
                      </td>
                    ))}
                  </tr>

                  <tr id="item_operating_system_row">
                    <th className="a-span3 comparison_attribute_name_column comparison_table_first_col" role="rowheader">
                      Operating System
                    </th>
                    {items.map(item => (
                      <td id={'operatingSystem-' + items.indexOf(item)} key={'operatingSystem-' + item._id}>
                        {item.operatingSystem}
                      </td>
                    ))}
                  </tr>

                </tbody>

              </table>
            </div>
            <div className="a-row a-spacing-extra-large"></div>
          </div>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
